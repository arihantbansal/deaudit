import { Button, Flex, Heading, Image } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import Link from "next/link";

const NavBar = () => {
  return (
    <>
      <Head>
        <title>Deaudit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        bg="transparent"
        w="100%"
        height="12vh"
        backdropFilter="blur(5px)"
        zIndex="1000"
        backdropContrast="10%"
        position="fixed"
        top="0"
        left="0"
        alignItems="center"
        justifyContent="space-between"
        flexDir="row"
        fontSize="1.2em"
      >
        <Link href="/" passHref color="white">
          <a>
            <Heading
              fontSize="2.2em"
              p="3"
              ml="10"
              fontFamily="Geostar Fill"
              letterSpacing="2px"
              color="white"
            >
              DEAUDIT
            </Heading>
          </a>
        </Link>

        <Flex m="20" justifyContent="space-around" flexDir="row" gap="2">
          <Link href="/audits">
            <Button
              variant="solid"
              bg="transparent"
              fontFamily="Space Grotesk"
              size="md"
              fontSize="lg"
              _hover={{
                transform: "scale(1.05)",
              }}
            >
              Listed Audits
            </Button>
          </Link>
          <Link href="/new-audit">
            <Button
              variant="solid"
              bg="transparent"
              fontSize="lg"
              fontFamily="Space Grotesk"
              size="md"
              _hover={{
                transform: "scale(1.05)",
              }}
            >
              Create Audit
            </Button>
          </Link>
          <ConnectButton chainStatus={"icon"} />
        </Flex>
      </Flex>
    </>
  );
};

export default NavBar;
