import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Text,
  VStack,
  useDisclosure,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Textarea,
} from "@chakra-ui/react";
import { Link as Linker } from "@chakra-ui/react";
import { ellipseAddress } from "@lib/utilities";
import Head from "next/head";
import React from "react";
import { GoUnverified } from "react-icons/go";
import { MdVerified } from "react-icons/md";
import { BsBug } from "react-icons/bs";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { GiInjustice } from "react-icons/gi";
import Link from "next/link";

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
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex flexDir="column">
      <Head>
        <title>{title}</title>
      </Head>
      <Flex className="container">
        {[...Array(350)].map((e, i) => (
          <Box className="line" key={i}></Box>
        ))}
      </Flex>
      <Flex
        flexDir="column"
        position="absolute"
        top="20vh"
        w="100vw"
        m="auto"
        textAlign="center"
      >
        <Heading
          color="white"
          my="4"
          flexDir="row"
          fontSize="1.5em"
          className="head"
          display="inline-block"
          _selection={{
            color: "red.800",
            background: "white",
          }}
        >
          Contract :
          <Linker
            color="red.200"
            display="inline-flex"
            fontSize="1.1em"
            mx="4"
            className="audit"
            letterSpacing="1px"
            target="_blank"
            href={`https://mumbai.polygonscan.com/address/${contractAddress}`}
            _hover={{
              color: "red.50",
            }}
            _selection={{
              color: "red.800",
              background: "white",
            }}
          >
            {contractAddress}
          </Linker>
        </Heading>

        <Heading
          color="white"
          my="4"
          fontSize="1.5em"
          className="head"
          _selection={{
            color: "red.800",
            background: "white",
          }}
        >
          Requestor :
          <Link href={`/user/${creator}`} passHref>
            <a>
              <Text
                color="red.200"
                display="inline-flex"
                mx="4"
                className="audit"
                _hover={{
                  color: "red.50",
                }}
                _selection={{
                  color: "red.800",
                  background: "white",
                }}
              >
                {creator}
              </Text>
            </a>
          </Link>
        </Heading>
        <Button
          size="lg"
          mx="auto"
          my="6"
          fontFamily="Space Grotesk"
          border="1px"
          borderColor="red.200"
          borderRadius="10px"
          fontSize="1.3em"
          bg="red.100"
          color="red.800"
          onClick={onOpen}
          _hover={{
            bg: "transparent",
            color: "red.100",
          }}
          leftIcon={<BsBug />}
        >
          Report a Bug
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent bgColor="#0F0301">
            <ModalCloseButton />
            <ModalHeader className="modal-head">Report Bug</ModalHeader>
            <ModalBody>
              <Textarea
                required
                spellCheck="false"
                placeholder="Description"
                size="lg"
                border="1px"
                borderColor="red.200"
                borderRadius="10px"
                fontFamily="Space Grotesk"
                rows="6"
                cols="50"
                fontSize="1.2em"
                color="red.100"
                boxShadow="none"
                _focus={{
                  borderColor: "red.200",
                  boxShadow: "none",
                }}
              />
            </ModalBody>

            <ModalFooter>
              <Button
                size="md"
                fontFamily="Eirian"
                border="1px"
                borderColor="red.200"
                borderRadius="10px"
                fontSize="1.2em"
                bg="transparent"
                color="gray.200"
                onClick={onClose}
                _hover={{
                  bg: "gray.200",
                  color: "red.800",
                }}
                colorScheme="red"
                mr={3}
              >
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Flex
          m="2"
          p="4"
          w="100%"
          h="fit-content"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
        >
          <Heading
            color="white"
            my="4"
            fontSize="4xl"
            className="head"
            display="inline-flex"
            _selection={{
              color: "red.800",
              background: "white",
            }}
          >
            <GiInjustice
              size="1.4em"
              style={{
                marginRight: "0.5em",
              }}
            />
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
                  <Box key={index} py="2" mx="4">
                    <Link href={`/user/${juryMember}`} passHref>
                      <Linker>
                        <Text
                          fontSize="1.1em"
                          color="red.200"
                          className="address"
                          display="inline-flex"
                          _selection={{
                            color: "red.800",
                            background: "white",
                          }}
                          _hover={{
                            color: "red.50",
                          }}
                        >
                          {juryMember}
                        </Text>
                      </Linker>
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
          <Heading
            color="white"
            my="6"
            fontSize="4xl"
            className="head"
            display="inline-flex"
            _selection={{
              color: "red.800",
              background: "white",
            }}
          >
            <RiMoneyDollarCircleLine
              size="1.3em"
              style={{
                marginRight: "0.5em",
              }}
            />
            Current pool Sizes :
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
                  <Heading
                    color="white"
                    fontSize="4xl"
                    fontFamily="Azeret Thin"
                    _selection={{
                      color: "red.800",
                      background: "white",
                    }}
                  >
                    {poolSize}
                  </Heading>
                  <Heading
                    color="white"
                    fontSize="xl"
                    fontFamily="Major Mono Display"
                    _selection={{
                      color: "red.800",
                      background: "white",
                    }}
                  >
                    {poolSizes[poolSize]}
                  </Heading>
                  <Button
                    fontFamily="Space Grotesk"
                    bg="gray.200"
                    variant="solid"
                    borderRadius="10px"
                    borderWidth="1px"
                    borderStyle="solid"
                    borderColor="#fecaca"
                    color="red.800"
                    size="lg"
                    fontSize="xl"
                    h="fit-content"
                    paddingX="6"
                    paddingY="2"
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
          <Heading
            color="white"
            my="4"
            mx="3"
            fontSize="4xl"
            className="head"
            display="inline-flex"
            _selected={true}
            _selection={{
              backgroundColor: "red.50",
              color: "black",
            }}
          >
            <BsBug
              size="1.3em"
              style={{
                marginRight: "0.5em",
              }}
            />
            Bugs reported :
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
                  borderColor="red.50"
                  borderStart="solid"
                  p="6"
                  borderRadius="15px"
                >
                  <Link href={`/user/${bug.userAddress}`} passHref>
                    <Linker
                      fontSize="2xl"
                      color="red.200"
                      display="inline-flex"
                      className="address"
                      _hover={{
                        color: "red.50",
                      }}
                      _selected={true}
                      _selection={{
                        backgroundColor: "purple.700",
                        color: "black",
                      }}
                    >
                      {bug.userAddress}
                    </Linker>
                  </Link>
                  <Text
                    fontSize="xl"
                    color="red.50"
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
                      <MdVerified size="1.4em" color="green" />
                    ) : (
                      <GoUnverified size="1.4em" color="red" />
                    )}
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
