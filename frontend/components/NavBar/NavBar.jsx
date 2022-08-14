import { Button, Flex, Heading, Image } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link as Linker } from "@chakra-ui/react";
import Link from "next/link";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { config } from "@lib/utilities";

const NavBar = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const [exists, setExists] = useState(false);

  const fetchUser = () => {
    address &&
      fetch(`${config}/users/${address}`)
        .then((res) => {
          if (res.status === 200) setExists(true);
          else setExists(false);
        })
        .catch((err) => {
          setExists(false);
        });
  };

  useEffect(() => {
    fetchUser();
  }, [address]);

  return (
    <>
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

        <Flex m="20" justifyContent="space-around" flexDir="row" gap="6">
          <Link href="/audits" passHref>
            <Linker>
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
                Audits
              </Button>
            </Linker>
          </Link>
          <Link href="/new-audit" passHref>
            <Linker>
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
                New Audit
              </Button>
            </Linker>
          </Link>
          {!isDisconnected && exists && (
            <Link href={`/users/${address}`} passHref>
              <Linker>
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
                  Profile
                </Button>
              </Linker>
            </Link>
          )}
          <ConnectButton chainStatus={"icon"} showBalance={false} />
        </Flex>
      </Flex>
    </>
  );
};

export default NavBar;
