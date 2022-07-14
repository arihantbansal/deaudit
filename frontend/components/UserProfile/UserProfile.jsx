import {
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ellipseAddress } from "@lib/utilities";
import Head from "next/head";
import styles from "../../styles/UserLines.module.scss";
import React from "react";
import { FiTwitter, FiGithub } from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import { GoUnverified } from "react-icons/go";
import { TbExternalLink } from "react-icons/tb";

const UserProfile = ({ userAddress }) => {
  let juryForAudit = [
    "0xA0C6dFF0CD9d034Ddb9fE46F9B9AeFbeC9EA4358F",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0xaC6dFF0CD9d034Ddb9fE46F9B9AeFbeC9EA4358F",
    "0xA0C6dFF0CD9d034Ddb9fE46F9B9AeFbeC9EA4358F",
    "0xaC6dFF0CD9d034Ddb9fE46F9B9AeFbeC9EA4358F",
  ];

  let requestedAudits = [
    "0x95Fce0ECfc530cfbfaA70D8644a8De8E12De723e",
    "0xA0C6dFF0CD9d034Ddb9fE46F9B9AeFbeC9EA4358F",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x95Fce0ECfc530cfbfaA70D8644a8De8E12De723e",
    "0xA0C6dFF0CD9d034Ddb9fE46F9B9AeFbeC9EA4358F",
  ];

  let bugsReported = [
    {
      contractAddress: "0xA0C6dFF0CD9d034Ddb9fE46F9B9AeFbeC9EA4358F",
      description: "Not ownable",
      verified: true,
    },
    {
      contractAddress: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
      description: "Can use OpenZeppelin to ensure reusability",
      verified: false,
    },
    {
      contractAddress: "0xaC6dFF0CD9d034Ddb9fE46F9B9AeFbeC9EA4358F",
      description: "Would be better to implement ERC1155 instead of 721",
      verified: true,
    },
  ];

  const title = `User ${ellipseAddress(userAddress)}`;

  return (
    <Flex>
      <Flex className={styles.container}>
        {[...Array(350)].map((e, i) => (
          <Box className={styles.line} key={i}></Box>
        ))}
      </Flex>
      <Flex
        flexDir="column"
        justify="center"
        alignItems="center"
        pos="absolute"
        top="0"
      >
        <Head>
          <title>{title}</title>
        </Head>
        <Flex
          w="100%"
          h="75vh"
          bgImage="https://images.pexels.com/photos/1342460/pexels-photo-1342460.jpeg?cs=srgb&dl=pexels-vitaly-vlasov-1342460.jpg&fm=jpg"
          bgSize="cover"
          bgPos="center"
          bgRepeat="no-repeat"
          alignItems="center"
          justifyContent="center"
          flexDir="column"
        ></Flex>
        <Image
          positon="relative"
          mt="-24"
          alt="Audit"
          w="48"
          h="48"
          src="https://images.unsplash.com/photo-1582266255765-fa5cf1a1d501?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8"
          borderRadius="full"
          objectFit="cover"
          borderWidth="2px"
          borderColor="white"
          borderStyle="solid"
          mb="4"
        />
        <Heading
          color="teal.100"
          my="6"
          fontSize="1.8em"
          fontFamily="Geostar"
        >
          {userAddress}
        </Heading>
        <HStack gap="5" mt="2" mb="6">
          <Link href="https://www.google.com">
            <FiTwitter size="3em" />
          </Link>
          <Link href="https://www.google.com">
            <FiGithub size="3em" />
          </Link>
        </HStack>
        <Flex
          m="4"
          p="4"
          w="50vw"
          h="fit-content"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          className="judged"
        >
          <Heading color="white" my="4" fontSize="3xl" className="head">
            Judged Audits :
          </Heading>
          <Flex
            h="fit-content"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            py="2"
          >
            <Heading my="4" fontSize="2xl">
              {juryForAudit.map((audit, index) => {
                return (
                  <Box key={index} mt="2" mx="4">
                    <Link
                      fontSize="xl"
                      className="address"
                      color="teal.50"
                      display="inline-flex"
                      href={`/audit/${audit}`}
                      _hover={{
                        color: "teal.100",
                      }}
                    >
                      {audit}
                    </Link>
                  </Box>
                );
              })}
            </Heading>
          </Flex>
        </Flex>
        <Flex
          m="4"
          p="4"
          w="50vw"
          h="fit-content"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
        >
          <Heading color="white" my="4" fontSize="3xl" className="head">
            Audits requested :
          </Heading>
          <Flex
            w="100%"
            h="fit-content"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            py="2"
          >
            <Heading
              color="white"
              my="4"
              fontSize="2xl"
              fontFamily="Cutive Mono"
            >
              {requestedAudits.map((audit, index) => {
                return (
                  <VStack key={index} mt="4" mx="4">
                    <Link
                      fontSize="xl"
                      color="teal.100"
                      display="inline-flex"
                      className="address"
                      href={`/audit/${audit}`}
                      _hover={{
                        color: "teal.50",
                      }}
                    >
                      {audit}
                    </Link>
                  </VStack>
                );
              })}
            </Heading>
          </Flex>
        </Flex>

        <Flex
          m="6"
          w="100%"
          h="fit-content"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          filter="brightness(900%)"
          blendMode="color-dodge"
        >
          <Heading color="white" my="4" fontSize="4xl" className="head">
            Bugs reported In :
          </Heading>
          <Flex
            w="100%"
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
                  borderWidth="0.5px"
                  borderColor="teal.50"
                  borderStart="solid"
                  p="6"
                  borderRadius="15px"
                >
                  <Text
                    fontSize="xl"
                    color="teal.100"
                    display="inline-flex"
                    className="address"
                    _hover={{
                      color: "teal.50",
                    }}
                    blendMode="unset"
                    _selected={true}
                    _selection={{
                      backgroundColor: "teal.700",
                      color: "black",
                    }}
                  >
                    {bug.contractAddress}
                  </Text>
                  <Text
                    fontSize="lg"
                    color="teal.50"
                    mt="2"
                    textAlign="center"
                    m="auto"
                    _selected={true}
                    _selection={{
                      backgroundColor: "teal.700",
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
                      <GoUnverified size="1.3em" color="teal" />
                    )}

                    <Link
                      href={`/audit/${bug.contractAddress}`}
                      color="teal.100"
                    >
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

export default UserProfile;
