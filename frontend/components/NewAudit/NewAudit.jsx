import {
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
import React from "react";

const NewAudit = () => {
  return (
    <Flex flexDir="column" mt="20vh" w="50vw" mx="auto">
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
            color="red.50"
            textAlign="left"
          >
            Contract Address
          </FormLabel>
          <Input
            placeholder="Contract Address"
            id="contractAddress"
            size="lg"
            variant="outline"
            borderColor="red.200"
            borderWidth="1px"
            borderRadius="5px"
            mb="10"
            boxShadow="nonw"
            _focus={{
              borderColor: "red.200",
              boxShadow: "none",
            }}
            _hover={{
              borderColor: "red.200",
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
          borderColor="red.200"
          borderRadius="10px"
          fontFamily="Space Grotesk"
          rows="6"
          cols="50"
          mb="10"
          fontSize="1.2em"
          color="red.100"
          boxShadow="none"
          _focus={{
            borderColor: "red.200",
            boxShadow: "none",
          }}
          _hover={{
            borderColor: "red.200",
            boxShadow: "none",
          }}
        />

        <Button
          size="lg"
          fontFamily="Eirian"
          border="1px"
          w="fit-content"
          mx="auto"
          borderColor="red.200"
          borderRadius="10px"
          fontSize="1.3em"
          bg="transparent"
          color="gray.200"
          _hover={{
            bg: "gray.200",
            color: "red.800",
          }}
          colorScheme="red"
          mr={3}
        >
          Submit
        </Button>
      </Flex>
    </Flex>
  );
};

export default NewAudit;
