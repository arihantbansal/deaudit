import {
  Box,
  Heading,
  Flex,
  Text,
  HStack,
  Image,
  Divider,
  Center,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "@styles/Landing.module.scss";
import Head from "next/head";

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
        <Box className={styles.wrapper}>
          <Heading fontSize="7xl" className={styles.heading}>
            The Decentralized Audit Marketplace.
          </Heading>
        </Box>

        <HStack spacing={10}>
          <Text
            fontSize="2xl"
            fontFamily="Space Grotesk"
            color="gray.200"
            lineHeight="1.7"
            m="16"
            textAlign="right"
            mr="32"
            w="38vw"
            _selection={{
              color: "gray.900",
              bg: "gray.100",
            }}
          >
            A digital marketplace for requesting, betting on and judging smart
            contract audits.
          </Text>
          <Image src="/assets/wrench.png" w="14vw" alt="Wrench" />
        </HStack>

        <Box my="3" ml="32" w="50%" transform="scale(1.4)">
          <ConnectButton chainStatus="icon" showBalance={true} />
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
          Bugs? Scary.
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
          Say no more.
        </Heading>
        <Flex className={styles.heroSub}>
          <Heading fontSize="6xl" className={styles.network} textAlign="left">
            Rapid and decentralized auditing.
          </Heading>
          <Image src="/assets/globe.svg" alt="bug" w="55%" userSelect="none" />
        </Flex>
      </Flex>

      <Flex className={styles.hero}>
        <Heading fontSize="7xl" mt="5vh" className={styles.heading}>
          THINK YOU&apos;RE GOOD?
        </Heading>
        <Flex className={styles.heroSub}>
          <Image
            src="/assets/problem.svg"
            alt="bug"
            w="48%"
            userSelect="none"
          />
          <Heading
            fontSize="6xl"
            className={styles.fixheader}
            textAlign="right"
            ml="20"
          >
            Level yourself up as a security auditor.
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
