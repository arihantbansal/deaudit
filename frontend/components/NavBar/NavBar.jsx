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
        backdropBlur="3xl"
        backdropFilter="auto"
        zIndex="1000"
        backdropContrast="90%"
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
              fontSize="5xl"
              p="3"
              ml="10"
              fontFamily="Geostar Fill"
              letterSpacing="2px"
              color="white"
            >
              DeAudit
            </Heading>
          </a>
        </Link>

        <Flex m="20" justifyContent="space-around" flexDir="row" gap="10">
          <Link href="/new-audit">
            <Button
              variant="solid"
              bg="transparent"
              fontFamily="Space Grotesk"
              size="md"
              fontSize="1em"
              _hover={{
                transform: "scale(1.05)",
              }}
            >
              New Audit
            </Button>
          </Link>
          <ConnectButton chainStatus={"icon"} />
        </Flex>
      </Flex>
    </>
  );
};

export default NavBar;
