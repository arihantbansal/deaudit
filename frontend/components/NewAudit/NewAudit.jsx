import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Select,
  Tag,
  TagCloseButton,
  TagLabel,
} from "@chakra-ui/react";
import Router from "next/router";
import React, { useState } from "react";
import styles from "@styles/NewAudit.module.scss";
import { config, CONTRACT_ADDRESS, pascalCase } from "@lib/utilities";
import {
  useAccount,
  allChains,
  usePrepareContractWrite,
  useContractWrite,
  useContractEvent,
} from "wagmi";
import Head from "next/head";
import contractAbi from "@lib/contractAbi.json";
import { ethers } from "ethers";

const NewAudit = () => {
  const chains = allChains.filter(
    c =>
      c?.rpcUrls?.alchemy?.includes("eth") ||
      c?.rpcUrls?.alchemy?.includes("polygon")
  );
  const [contractAddress, setContractAddress] = useState("");
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");
  const [chain, setChain] = useState(chains[0].name);

  const [poolSize, setPoolSize] = useState("0");
  const { address, _, isDisconnected } = useAccount();

  const handleDelete = id => {
    setTags(prev => {
      return prev.filter((_, index) => {
        return id !== index;
      });
    });
  };

  const handleKeyDown = e => {
    if (tag.length > 0 && !tags.includes(tag) && e.key === "Enter") {
      setTags([...tags, pascalCase(tag.substring(0, 15).toLowerCase())]);
      setTag("");
    }
  };

  /* 
  @desc : creating a new audit, receiving the emitted event AuditRequested
  */
  // const { config : configForAuditPost } = usePrepareContractWrite({
  //   addressOrName: CONTRACT_ADDRESS,
  //   contractInterface: contractAbi,
  //   functionName: "register",
  //   args: [contractAddress],
  //   overrides: {
  //     value: ethers.utils.parseEther(poolSize.toString())
  //   },
  // });

  // const { write : auditSubmit } = useContractWrite(configForAuditPost);

  // useContractEvent({
  //   addressOrName: CONTRACT_ADDRESS,
  //   contractInterface: contractAbi,
  //   eventName: 'createAudit',
  //   listener: (event) => {
  //       console.log(event)
  //       Router.push(`/audits/${event[1]}`);
  //       setContractAddress("");
  //       setTags([]);
  //       setPoolSize(0);
  //   }
  // })

  const handleSubmit = e => {
    fetch(`${config}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: address,
      }),
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });

    fetch(`${config}/audits`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        created_by: address,
        contract_address: contractAddress,
        tags: tags,
        initial_pool_size: poolSize,
        chain: chain,
      }),
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });

    fetch(`${config}/users/${address}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        audits_requested: [contractAddress],
      }),
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });

    // auditSubmit?.();
  };

  return (
    <Flex flexDir="column">
      <Head>
        <title>New Audit</title>
      </Head>
      <Flex className="container">
        {[...Array(350)].map((e, i) => (
          <Box className="line" key={i}></Box>
        ))}
      </Flex>
      <Flex flexDir="column" mt="20vh" w="50vw" mx="auto" zIndex="10">
        <Heading
          as="h1"
          size="xl"
          fontFamily="Laser"
          textAlign="center"
          letterSpacing="1px"
        >
          New Audit
        </Heading>
        <Flex flexDir="column" mt="8" fontFamily="Space Grotesk">
          <form>
            <Flex flexDir="row" mt="8" justifyContent="space-evenly" gap="6">
              <FormControl my="2" isRequired>
                <FormLabel htmlFor="contractAddress" fontSize="lg">
                  Contract Address
                </FormLabel>
                <Input
                  required
                  placeholder="Contract Address"
                  id="contractAddress"
                  w="36vw"
                  size="lg"
                  value={contractAddress}
                  onChange={e => setContractAddress(e.target.value)}
                  variant="outline"
                  spellCheck="false"
                  className={styles.input}
                />
              </FormControl>
              <FormControl my="2" isRequired>
                <FormLabel htmlFor="pool" fontSize="lg">
                  Pool Size (MATIC)
                </FormLabel>
                <Input
                  required
                  placeholder="Pool"
                  id="pool"
                  size="lg"
                  w="12vw"
                  value={poolSize}
                  onChange={e => setPoolSize(e.target.value)}
                  variant="outline"
                  type="number"
                  className={styles.input}
                />
              </FormControl>
            </Flex>

            <Flex flexDir="row" mt="8" justifyContent="space-evenly" gap="6">
              <FormControl>
                <FormLabel htmlFor="tags" fontSize="lg" className={styles.text}>
                  Add relevant tags
                </FormLabel>
                <Input
                  required
                  placeholder="Tags (Press enter to append)"
                  id="tags"
                  size="lg"
                  mb="6"
                  w="30vw"
                  value={tag}
                  onChange={e => setTag(e.target.value)}
                  onKeyDown={e => handleKeyDown(e)}
                  variant="outline"
                  spellCheck="false"
                  className={styles.input}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel
                  htmlFor="chain"
                  fontSize="lg"
                  className={styles.text}
                >
                  Chain
                </FormLabel>
                <Select
                  required
                  id="chain"
                  size="lg"
                  value={chain}
                  onChange={e => setChain(e.target.value)}
                  variant="outline"
                  spellCheck="false"
                  className={styles.input}
                >
                  {chains.map(c => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Flex>
          </form>
        </Flex>

        <HStack spacing={4}>
          {tags.length > 0
            ? tags.map((tag, index) => (
                <Tag
                  size="lg"
                  key={index}
                  variant="outline"
                  cursor="pointer"
                  colorScheme="green"
                  userSelect="none"
                >
                  <TagLabel>{tag}</TagLabel>
                  <TagCloseButton onClick={() => handleDelete(index)} />
                </Tag>
              ))
            : null}
        </HStack>
        <Button
          size="md"
          my="6"
          type="submit"
          disabled={isDisconnected}
          onClick={e => {
            if (poolSize > 0 && contractAddress.length > 0 && chain.name > 0)
              handleSubmit(e);
            else alert("Please fill in all the required fields.");
          }}
          className={styles.button}
          colorScheme="pink"
        >
          Submit
        </Button>
      </Flex>
    </Flex>
  );
};

export default NewAudit;
