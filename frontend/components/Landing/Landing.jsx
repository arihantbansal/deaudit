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
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "@styles/Landing.module.scss";
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
      overflowX="none"
    >
      <Head>
        <title>DeAudit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        flexDirection="column"
        w="80%"
        mt="2vh"
        h="87vh"
        justifyContent="space-evenly"
        overflowX="none"
      >
        <Heading fontSize="7xl" className={styles.heading}>
          The Decentralized Audit Marketplace.
        </Heading>
        <HStack spacing={10}>
          <Text
            fontSize="2xl"
            fontFamily="Space Grotesk"
            color="gray.200"
            lineHeight="1.7"
            m="16"
            mr="32"
            w="40vw"
            _selection={{
              color: "gray.900",
              bg: "gray.100",
            }}
          >
            A digital marketplace for requesting, betting and judging smart
            contract audits.
          </Text>
          <Image src="/assets/wrench-512.png" w="10vw" alt="Wrench" />
        </HStack>

        <Box my="3" ml="32" w="50%" transform="scale(1.5)">
          <ConnectButton chainStatus="name" showBalance={true} />
        </Box>
      </Flex>

      <Flex
        flexDirection="column"
        mt="15vh"
        w="100%"
        h="90vh"
        justifyContent="center"
        alignItems="center"
      >
        <Heading fontSize="7xl" className={styles.heading} fontFamily="Porqge">
          BUGS? SCARY.
        </Heading>
        <Flex className={styles.heroSub}>
          <Image src="/assets/bug.svg" alt="bug" w="60%" userSelect="none" />
          <Heading
            fontSize="6xl"
            className={styles.bugheader}
            w="70%"
            textAlign="right"
          >
            My face when bug in mainnet deployed contract
          </Heading>
        </Flex>
      </Flex>

      <Flex className={styles.hero} mt="4vh">
        <Heading fontSize="7xl" my="5vh" className={styles.heading}>
          AUDITING? SCARIER.
        </Heading>
        <Flex className={styles.heroSub}>
          <Heading fontSize="6xl" w="50%" className={styles.bugheader}>
            My portfolio after applying for audit
          </Heading>
          <Image src="/assets/worth.svg" alt="bug" w="40%" userSelect="none" />
        </Flex>
      </Flex>

      <Flex className={styles.hero} mt="5vh">
        <Heading fontSize="7xl" className={styles.heading}>
          SAY NO MORE.
        </Heading>
        <Flex className={styles.heroSub}>
          <Heading fontSize="6xl" className={styles.network} textAlign="left">
            RAPID AND DECENTRALIZED AUDITING.
          </Heading>
          <Image src="/assets/globe.svg" alt="bug" w="55%" userSelect="none" />
        </Flex>
      </Flex>

      <Flex className={styles.hero}>
        <Heading fontSize="7xl" mt="5vh" className={styles.heading}>
          THINK YOU&apos;RE GOOD?
        </Heading>
        <Flex className={styles.heroSub}>
          <Image src="/assets/chance.svg" alt="bug" w="49%" userSelect="none" />
          <Heading
            fontSize="6xl"
            className={styles.fixheader}
            textAlign="right"
          >
            APPLY AS A SECURITY AUDITOR.
          </Heading>
        </Flex>
        <Box fontFamily="Aeonik Light" mt="6" letterSpacing="1px" w="100%">
          <Divider />
          <Center>
            <Text fontSize="lg" color="gray.100" my="3">
              Copyright &copy; {new Date().getFullYear()} by DeAudit. &nbsp;All
              Rights Reserved.
            </Text>
          </Center>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Landing;
