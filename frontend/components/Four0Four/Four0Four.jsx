import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import Link from "next/link";

const Four0Four = () => {
  return (
    <Flex flexDir="column">
      <Head>
        <title>404</title>
      </Head>
      <Flex className="container">
        {[...Array(300)].map((e, i) => (
          <Box className="line" key={i}></Box>
        ))}
      </Flex>
      <Flex
        flexDir="column"
        position="absolute"
        top="40vh"
        w="100vw"
        m="auto"
        textAlign="center"
      >
        <Heading
          color="white"
          my="4"
          flexDir="row"
          fontSize="1.9em"
          className="head"
          display="inline-block"
          _selection={{
            color: "teal.800",
            background: "white",
          }}
        >
          The page you are looking for does not exist.
        </Heading>
        <Link href="/">
          <a>
            <Button
              size="lg"
              mx="auto"
              my="6"
              fontFamily="Space Grotesk"
              border="1px"
              borderColor="teal.200"
              borderRadius="10px"
              letterSpacing="0.5px"
              fontSize="1.3em"
              bg="transparent"
              color="teal.200"
              _hover={{
                color: "teal.400",
                borderColor: "teal.400",
              }}
            >
              Back Home
            </Button>
          </a>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Four0Four;
