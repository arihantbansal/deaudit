import {
  Box,
  Heading,
  Flex,
  Button,
  Link,
  Text,
  HStack,
} from "@chakra-ui/react";
import Lottie from "react-lottie";
import styles from "../../styles/Landing.module.scss";
import blockchain from "../../public/assets/blockchain.json";
import Head from "next/head";
import { BsArrowRight } from "react-icons/bs";

const Landing = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: blockchain,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Flex
      w="100vw"
      h="85vh"
      flexDirection="row"
      alignItems="center"
      className="home"
      mt="20"
    >
      <Head>
        <title>DeAudit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        flexDirection="column"
        w="53vw"
        ml="20"
        justifyContent="space-evenly"
        alignItems="left"
      >
        <Heading
          fontSize="6xl"
          letterSpacing="1px"
          display="flex"
          className={styles.heading}
          my="6"
        >
          The Decentralized Audit Marketplace.
        </Heading>
        <Text
          fontSize="lg"
          fontFamily="Azeret Regular"
          fontWeight="normal"
          lineHeight="1.5"
          my="2"
        >
          Digital marketplace for requesting <br /> betting on and applying for{" "}
          <br />
          auditing proposals.
        </Text>
        <Link href="/users" textDecor="none">
          <HStack my="6" w="30vw">
            <Button
              fontSize="2xl"
              size="lg"
              className={styles.button}
              _active={{
                bg: "transparent",
              }}
            >
              Users
            </Button>
            <BsArrowRight fontSize="3em" className={styles.arrow} />
          </HStack>
        </Link>
      </Flex>
      <Box w="55vw">
        <Lottie options={defaultOptions} width={500} />
      </Box>
    </Flex>
  );
};

export default Landing;
