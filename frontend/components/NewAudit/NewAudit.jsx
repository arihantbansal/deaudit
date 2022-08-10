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
  const { address } = useAccount();


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
    e.preventDefault();
    if(address) {
      fetch(`${config}/audits`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        created_by : address,
        contract_address :contractAddress,
        tags:  tags,
        }),
      })
      .then((res) => {
        if (res.status === 200)
          Router.push(`/audits/${contractAddress}`);
      }).catch((err) => {
        console.log(err);
      }
      );
    }
    else alert("Please connect to a wallet");
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
            <FormControl my="2" isRequired>
              <FormLabel htmlFor="contractAddress" fontSize="lg">
                Contract Address
              </FormLabel>
              <Input
                required
                placeholder="Contract Address"
                id="contractAddress"
                size="lg"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                variant="outline"
                spellCheck="false"
                className={styles.input}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="tags" fontSize="lg" className={styles.text}>
                Add relevant Tags
              </FormLabel>
              <Input
                required
                placeholder="Tags"
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
                      colorScheme="red"
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
            size="lg"
            my="8"
            type="submit"
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
