import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ellipseAddress } from "@lib/utilities";
import Head from "next/head";
import React from "react";
import { GoUnverified } from "react-icons/go";
import { MdVerified } from "react-icons/md";
import { TbExternalLink } from "react-icons/tb";
import styles from "../../styles/AuditLines.module.scss";

const AuditProfile = ({ contractAddress }) => {
  let creator = "0xaC6dFF0CD9d034Ddb9fE46F9B9AeFbeC9EA4358F";

  let juryMembers = [
    "0xA0C6dFF0CD9d034Ddb9fE46F9B9AeFbeC9EA4358F",
    "0x95Fce0ECfc530cfbfaA70D8644a8De8E12De723e",
    "0xA0C6dFF0CD9d034Ddb9fE46F9B9AeFbeC9EA4358F",
    "0x95Fce0ECfc530cfbfaA70D8644a8De8E12De723e",
    "0xaC6dFF0CD9d034Ddb9fE46F9B9AeFbeC9EA4358F",
  ];

  let poolSizes = {
    NoBug: "5.3 MATIC",
    YesBug: "2.1 MATIC",
  };

  let bugsReported = [
    {
      userAddress: "0xA0C6dFF0CD9d034Ddb9fE46F9B9AeFbeC9EA4358F",
      description: "Not ownable",
      verified: true,
    },
    {
      userAddress: "0x95Fce0ECfc530cfbfaA70D8644a8De8E12De723e",
      description: "Can use OpenZeppelin to ensure reusability",
      verified: false,
    },
    {
      userAddress: "0xaC6dFF0CD9d034Ddb9fE46F9B9AeFbeC9EA4358F",
      description: "Would be better to implement ERC1155 instead of 721",
      verified: true,
    },
  ];

  const title = `Audit ${ellipseAddress(contractAddress)}`;

  return (
    <Flex flexDir="column">
        <Head>
          <title>{title}</title>
        </Head>
      <Flex className={styles.container}>
      
        {[...Array(300)].map((e, i) => (
          <Box className={styles.line} key={i}></Box>
        ))}
      </Flex>
      <Flex
        flexDir="column"
        position="absolute"
        top="10"
        w="100vw"
        m="auto"
        textAlign="center"
      >
        <Heading color="white" my="4" fontSize="1.5em" fontFamily="Geostar Fill">
          Contract :
          <Link
            color="red.200"
            display="inline-flex"
            mx="4"
            fontFamily="Geostar"
            letterSpacing="-0.8px"
            href={`https://mumbai.polygonscan.com/address/${contractAddress}`}
            _hover={{
              color: "red.100",
            }}
          >
            {contractAddress}
          </Link>
        </Heading>

        <Heading color="white" my="4" fontSize="1.3em" fontFamily="Geostar Fill">
          Creator :
          <Link
            color="red.200"
            display="inline-flex"
            mx="4"
            fontFamily="Geostar"
            href={`/user/${creator}`}
            _hover={{
              color: "red.100",
            }}
          >
            {creator}
          </Link>
        </Heading>
        <Flex
          m="4"
          p="4"
          w="100%"
          h="fit-content"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
        >
          <Heading color="white" my="4" fontSize="4xl" className="head">
            Jury Members :
          </Heading>
          <Flex
            w="fit-content"
            h="fit-content"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
          >
            <Heading color="white" my="4" fontSize="2xl">
              {juryMembers.map((juryMember, index) => {
                return (
                  <Box key={index} mt="2" mx="4">
                    <Link
                      fontSize="xl"
                      color="red.200"
                      className="address"
                      display="inline-flex"
                      href={`/user/${juryMember}`}
                      _hover={{
                        color: "red.100",
                      }}
                    >
                      {juryMember}
                    </Link>
                  </Box>
                );
              })}
            </Heading>
          </Flex>
        </Flex>
        <Flex
          w="100%"
          h="fit-content"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
        >
          <Heading color="white" my="6" fontSize="4xl" className="head">
            Pool Sizes :
          </Heading>
          <Flex
            w="60%"
            h="fit-content"
            py="4"
            flexDir="row"
            justifyContent="space-around"
            alignItems="center"
            textAlign="center"
          >
            {Object.keys(poolSizes).map((poolSize, index) => {
              return (
                <VStack key={index} my="4" gap="4">
                  <Heading color="white" fontSize="3xl" fontFamily="Geostar">
                    {poolSize}
                  </Heading>
                  <Heading
                    color="white"
                    fontSize="xl"
                    fontFamily="Major Mono Display"
                  >
                    {poolSizes[poolSize]}
                  </Heading>
                  <Button
                    fontFamily="Space Grotesk"
                    bg="transparent"
                    variant="solid"
                    borderRadius="30px"
                    borderWidth="1px"
                    borderStyle="solid"
                    borderColor="#fecaca"
                    color="white"
                    size="lg"
                    padding="2px 20px"
                    fontSize="xl"
                    w="fit-content"
                    _hover={{
                      bg: "transparent",
                      color: "#fecaca",
                      border: "1px solid #fecaca",
                    }}
                  >
                    Bet
                  </Button>
                </VStack>
              );
            })}
          </Flex>
        </Flex>

        <Flex
          m="3"
          w="100vw"
          h="fit-content"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          filter="brightness(900%)"
          blendMode="color-dodge"
        >
          <Heading color="white" my="4" fontSize="4xl" className="head">
            Bugs reported by :
          </Heading>
          <Flex
            w="100vw"
            h="fit-content"
            flexDir="row"
            flexWrap="wrap"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            my="4"
            fontSize="2xl"
            fontFamily="Space Grotesk"
          >
            {bugsReported.map((bug, index) => {
              return (
                <VStack
                  key={index}
                  my="4"
                  mx="4"
                  borderWidth="1px"
                  borderColor="red.100"
                  borderStart="solid"
                  p="6"
                  borderRadius="15px"
                >
                  <Text
                    fontSize="xl"
                    color="red.200"
                    display="inline-flex"
                    className="address"
                    _hover={{
                      color: "red.100",
                    }}
                    _selected={true}
                    _selection={{
                      backgroundColor: "purple.700",
                      color: "black",
                    }}
                  >
                    {bug.userAddress}
                  </Text>
                  <Text
                    fontSize="xl"
                    color="red.100"
                    mt="2"
                    textAlign="center"
                    m="auto"
                    _selected={true}
                    _selection={{
                      backgroundColor: "purple.700",
                      color: "black",
                    }}
                  >
                    Description : {bug.description}
                  </Text>
                  <Flex
                    flexDir="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                    gap="4"
                  >
                    {bug.verified ? (
                      <MdVerified size="1.3em" color="green" />
                    ) : (
                      <GoUnverified size="1.3em" color="red" />
                    )}

                    <Link href={`/user/${bug.userAddress}`} color="purple.200">
                      <TbExternalLink size="1.3em" />
                    </Link>
                  </Flex>
                </VStack>
              );
            })}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AuditProfile;
