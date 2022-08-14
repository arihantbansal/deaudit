import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import Router from "next/router";
import React, { useState } from "react";
import styles from "../../styles/NewAudit.module.scss";
import { config, pascalCase } from "@lib/utilities";
import { useAccount } from "wagmi";

const NewAudit = () => {
  const [contractAddress, setContractAddress] = useState("");
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState("");
  const [poolSize, setPoolSize] = useState(0);
  const { address, isConnecting, isDisconnected } = useAccount();

  const handleDelete = (id) => {
    setTags((prev) => {
      return prev.filter((_, index) => {
        return id !== index;
      });
    });
  };

  const handleKeyDown = (e) => {
    if (tag.length > 0 && !tags.includes(tag) && e.key === "Enter") {
      setTags([...tags, pascalCase(tag.substring(0, 15).toLowerCase())]);
      setTag("");
    }
  };

  const handleSubmit = (e) => {
    fetch;

    fetch(`${config}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: address,
      }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    setContractAddress("");
    setTags([]);
    setPoolSize(0);

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
      }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
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
      .then((res) => {
        if (res.status === 200) Router.push(`/audits/${contractAddress}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Flex flexDir="column">
      <Flex className="container">
        {[...Array(350)].map((e, i) => (
          <Box className="line" key={i}></Box>
        ))}
      </Flex>
      <Flex flexDir="column" mt="20vh" w="50vw" mx="auto" zIndex="10">
        <Heading
          as="h1"
          size="xl"
          fontFamily="Geostar"
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
                  onChange={(e) => setContractAddress(e.target.value)}
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
                  onChange={(e) => setPoolSize(e.target.value)}
                  variant="outline"
                  type="number"
                  className={styles.input}
                />
              </FormControl>
            </Flex>
            <FormControl>
              <FormLabel htmlFor="tags" fontSize="lg" className={styles.text}>
                Add relevant Tags
              </FormLabel>
              <Input
                required
                placeholder="Tags (Press enter to add)"
                id="tags"
                size="lg"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
                variant="outline"
                spellCheck="false"
                className={styles.input}
              />
            </FormControl>
            <HStack spacing={4}>
              {tags.length > 0
                ? tags.map((tag, index) => (
                    <Tag
                      size="lg"
                      key={index}
                      variant="solid"
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
          </form>
          <Button
            size="md"
            my="6"
            type="submit"
            disabled={isDisconnected}
            onClick={(e) => handleSubmit(e)}
            className={styles.button}
            colorScheme="pink"
          >
            Submit
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NewAudit;
