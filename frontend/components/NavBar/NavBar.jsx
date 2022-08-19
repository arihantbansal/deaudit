import { Button, Flex, Heading, Image } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link as Linker } from "@chakra-ui/react";
import Link from "next/link";
import { useAccount } from "wagmi";
import { useCallback, useEffect, useState } from "react";
import { config } from "@lib/utilities";
import styles from "@styles/Landing.module.scss";

const NavBar = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const [exists, setExists] = useState(false);

  const fetchUser = useCallback(() => {
    address &&
      fetch(`${config}/users/${address}`)
        .then((res) => {
          if (res.status === 200) setExists(true);
          else setExists(false);
        })
        .catch((err) => {
          setExists(false);
        });
  }, [address]);

  useEffect(() => {
    fetchUser();
  }, [address, fetchUser]);

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
        boxShadow="1px 1px 20px rgba(150, 150, 150, 0.4)"
      >
        <Link href="/" passHref color="white">
          <a>
            <Heading
              p="3"
              ml="10"
              fontFamily="Porqge"
              letterSpacing="2px"
              className={styles.logo}
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
                size="md"
                className="stack"
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
                className="stack"
                size="md"
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
                  className="stack"
                  size="md"
                >
                  Profile
                </Button>
              </Linker>
            </Link>
          )}
          <ConnectButton chainStatus="icon" showBalance={false} />
        </Flex>
      </Flex>
    </>
  );
};

export default NavBar;
