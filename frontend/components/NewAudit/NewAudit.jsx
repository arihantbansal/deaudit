import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import Router from "next/router";
import React, { useState } from "react";

const NewAudit = () => {
  const [contractAddress, setContractAddress] = useState("");

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
              <FormLabel
                htmlFor="contractAddress"
                fontSize="lg"
                color="pink.50"
                textAlign="left"
              >
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
                borderColor="pink.50"
                spellCheck="false"
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

            <Button
              size="lg"
              fontFamily="Eirian"
              border="1px"
              w="fit-content"
              mx="auto"
              type="submit"
              float="right"
              borderColor="pink.200"
              borderRadius="10px"
              fontSize="1.3em"
              onClick={(e) => {
                e.preventDefault();
                console.log(contractAddress);
                Router.push(`/audit/${contractAddress}`);
              }}
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
          </form>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NewAudit;
