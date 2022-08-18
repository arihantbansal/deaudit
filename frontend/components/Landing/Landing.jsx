import {
  Box,
  Heading,
  Flex,
  Button,
  Link,
  Text,
  HStack,
  Image,
  Divider,
  Center,
} from "@chakra-ui/react";
import styles from "../../styles/Landing.module.scss";
import Head from "next/head";
import { BsArrowRight } from "react-icons/bs";

const Landing = () => {
  return (
    <Flex
      w="100vw"
      flexDirection="column"
      alignItems="center"
      className="home"
      position="absolute"
      top="10vh"
    >
      <Head>
        <title>DEAudit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        flexDirection="column"
        w="80vw"
        mx="20"
        mt="10vh"
        h="80vh"
        justifyContent="space-evenly"
      >
        <Heading
          fontSize="7xl"
          letterSpacing="1px"
          display="flex"
          className={styles.heading}
          my="6"
          fontFamily="Laser"
        >
          The Decentralized Audit Marketplace.
        </Heading>
        <HStack spacing={10}>
          <Text
            fontSize="2xl"
            fontFamily="Space Grotesk"
            color="gray.200"
            my="10"
            w="55vw"
            _selection={{
              color: "gray.900",
              bg: "gray.100",
            }}
          >
            A digital marketplace for requesting of, betting on and judging
            smart contracts&apos; auditing.
            <br />
            Irrespetive of who you are.
          </Text>
          <Image src="/assets/wrench 512.png" w="10vw" alt="" />
        </HStack>

        <Link href="/users" textDecor="none">
          <HStack my="3" w="100vw">
            <Button
              fontSize="2xl"
              size="lg"
              className={styles.button}
              _active={{
                bg: "transparent",
              }}
            >
              See our users
            </Button>
            <BsArrowRight fontSize="3em" className={styles.arrow} />
          </HStack>
        </Link>
      </Flex>
      <Flex
        w="90vw"
        flexDir="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Image src="/assets/bug.svg" alt="bug" w="60%" userSelect="none" />
        <Heading
          fontSize="5xl"
          letterSpacing="1px"
          className={styles.heading}
          fontFamily="Laser"
          w="70%"
        >
          My face when bug in mainnet deployed contract
        </Heading>
      </Flex>
      <Box fontFamily="Aeonik Light" mt="6" letterSpacing="1px" w="100%">
        <Divider />
        <Center>
          <Text fontSize="lg" color="gray.100" my="3">
            Copyright &copy; {new Date().getFullYear()} by DEAudit. &nbsp;All
            Rights Reserved.
          </Text>
        </Center>
      </Box>
    </Flex>
  );
};

export default Landing;
