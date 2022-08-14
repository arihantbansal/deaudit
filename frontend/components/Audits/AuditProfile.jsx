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
  HStack,
  Tag,
  Center,
} from "@chakra-ui/react";
import { Link as Linker } from "@chakra-ui/react";
import { config, ellipseAddress } from "@lib/utilities";
import Head from "next/head";
import React, { useState } from "react";
import { BsBug } from "react-icons/bs";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { GiInjustice } from "react-icons/gi";
import Link from "next/link";
import { allChains, useAccount } from "wagmi";

const AuditProfile = ({ audit, bugs }) => {
  const title = `Audit ${ellipseAddress(audit.contract_address)}`;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bugDescription, setBugDescription] = useState("");
  const auditURL =
    allChains.find((c) => c.name === audit.chain).blockExplorers.default.url +
    "/" +
    audit.contract_address;
  const { address, isConnecting, isDisconnected } = useAccount();
  const bugsArray = bugs.map((bug) => bug.id);

  const handleBugSubmit = async () => {
    const response = await fetch(`${config}/bugs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        audit_id: audit.contract_address,
        reported_by: address,
        description: bugDescription,
      }),
    });
    const data = await response.json();
    const num = data.data;

    fetch(`${config}/audits/${audit.contract_address}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bugs_reported: [...bugsArray, num],
      }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(`${config}/users/${address}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bugs_reported: [num],
      }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    setBugDescription("");
  };

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
        <Heading className="head">{audit.name}</Heading>

        <Heading
          color="white"
          my="6"
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
            href={auditURL}
            _hover={{
              color: "red.50",
            }}
            _selection={{
              color: "red.800",
              background: "white",
            }}
          >
            {audit.contract_address}
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
          <Link href={`/users/${audit.created_by}`} passHref>
            <Linker>
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
                {audit.created_by}
              </Text>
            </Linker>
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
          bg="transparent"
          color="red.100"
          onClick={onOpen}
          _hover={{
            transform: "scale(1.05)",
          }}
          leftIcon={<BsBug />}
        >
          Report a Bug
        </Button>
        <Center m="4">
          <HStack gap="2">
            {audit.tags?.map((tag, index) => (
              <Tag
                key={index}
                size="lg"
                variant="outline"
                border="none"
                fontFamily="Space Grotesk"
                cursor="pointer"
                colorScheme="red"
                userSelect="none"
              >
                {tag}
              </Tag>
            ))}
          </HStack>
        </Center>
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
                value={bugDescription}
                onChange={(e) => setBugDescription(e.target.value)}
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
                fontFamily="Space Grotesk"
                border="1px"
                borderColor="red.200"
                borderRadius="10px"
                fontSize="1em"
                bg="transparent"
                color="gray.200"
                onClick={() => {
                  if (bugDescription.length > 0) {
                    handleBugSubmit();
                    onClose();
                  }
                }}
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
              {audit.jury_members?.map((juryMember, index) => {
                return (
                  <Box key={index} py="2" mx="4">
                    <Link href={`/users/${juryMember}`} passHref>
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
            {/* {Object.keys(audit.poolSizes).map((poolSize, index) => {
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
                    {audit.poolSizes[poolSize]}
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
            })} */}
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
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            my="4"
            fontSize="2xl"
            fontFamily="Space Grotesk"
          >
            {bugs?.map((bug, index) => {
              return (
                <VStack
                  key={index}
                  my="4"
                  mx="4"
                  w="50vw"
                  h="36"
                  borderWidth="1px"
                  borderColor="red.50"
                  borderStart="solid"
                  p="6"
                  borderRadius="15px"
                >
                  <Link href={`/users/${bug.reported_by}`} passHref>
                    <Linker
                      fontSize="xl"
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
                      By : {bug.reported_by}
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
