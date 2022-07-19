import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import React from "react";

const NewAudit = () => {
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
          <FormControl my="2" isRequired>
            <FormLabel
              htmlFor="contractAddress"
              fontSize="lg"
              color="pink.50"
              textAlign="left"
            >
              Contract Address
            </FormLabel>
            <Input
              placeholder="Contract Address"
              id="contractAddress"
              size="lg"
              variant="outline"
              borderColor="pink.50"
              borderWidth="1px"
              borderRadius="5px"
              mb="10"
              boxShadow="none"
              _focus={{
                borderColor: "pink.50",
                boxShadow: "none",
              }}
              _hover={{
                borderColor: "pink.50",
                boxShadow: "none",
              }}
            />
          </FormControl>
          <FormLabel
            htmlFor="description"
            fontSize="lg"
            color="gray.200"
            textAlign="left"
          >
            Description
          </FormLabel>
          <Textarea
            id="description"
            placeholder="Description"
            spellCheck="false"
            size="lg"
            border="1px"
            borderColor="pink.50"
            borderRadius="10px"
            fontFamily="Space Grotesk"
            rows="6"
            cols="50"
            mb="10"
            fontSize="1.2em"
            color="pink.100"
            boxShadow="none"
            _focus={{
              borderColor: "pink.50",
              boxShadow: "none",
            }}
            _hover={{
              borderColor: "pink.50",
              boxShadow: "none",
            }}
          />

          <Button
            size="lg"
            fontFamily="Eirian"
            border="1px"
            w="fit-content"
            mx="auto"
            borderColor="pink.200"
            borderRadius="10px"
            fontSize="1.3em"
            bg="transparent"
            color="pink.200"
            _hover={{
              borderColor: "pink.600",
              color: "pink.600",
            }}
            colorScheme="pink"
            mr={3}
          >
            Submit
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NewAudit;
