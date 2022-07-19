import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import { FiTwitter, FiGithub, FiSettings } from "react-icons/fi";
import { Link as Linker } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { MdVerified } from "react-icons/md";
import { GoUnverified } from "react-icons/go";
import { BsBug } from "react-icons/bs";
import { AiOutlineAudit } from "react-icons/ai";
import { GiInjustice } from "react-icons/gi";
import { useEnsName } from "wagmi";
import { ellipseAddress } from "@lib/utilities";
import Link from "next/link";
import { useStateContext } from "contexts/StateContext";

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
  const { data, isError, isLoading } = useEnsName({
    address: userAddress,
  });
  const [state] = useStateContext();
  const [jury, setJury] = useState(false);
  const [github, setGithub] = useState("");
  const [twitter, setTwitter] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex>
      <Flex className="container">
        {[...Array(350)].map((e, i) => (
          <Box className="line" key={i}></Box>
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
          h="85vh"
          bgImage="https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8"
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
          src="https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8"
          borderRadius="full"
          objectFit="cover"
          borderWidth="2px"
          borderColor="white"
          borderStyle="solid"
          mb="4"
        />

        {!state.address ? null : state.address === userAddress ? (
          <Button
            fontSize="3em"
            mx="auto"
            position="relative"
            top="-16"
            left="20"
            fontFamily="Eirian"
            border="none"
            borderRadius="10px"
            letterSpacing="0.5px"
            bg="transparent"
            color="purple.200"
            onClick={onOpen}
            _hover={{
              color: "purple.300",
            }}
            leftIcon={<FiSettings />}
          />
        ) : null}
        <Heading
          color="purple.100"
          mt="4"
          mb="4"
          fontSize="1.8em"
          className="audit"
          _selection={{
            color: "purple.800",
            background: "white",
          }}
        >
          {userAddress}
        </Heading>

        <Heading
          color="purple.100"
          my="4"
          fontSize="1.8em"
          className="head"
          _selection={{
            color: "purple.800",
            background: "white",
          }}
        >
          <Linker
            href={
              !isLoading && !isError && data
                ? `https://app.ens.domains/name/${data}`
                : "#"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            ENS : &nbsp;
            {isLoading ? (
              <span>Loading...</span>
            ) : isError ? (
              <span>Error</span>
            ) : (
              <span>{data}</span>
            )}
          </Linker>
        </Heading>

        <Modal isOpen={isOpen} onClose={onClose} isCentepurple>
          <ModalOverlay />
          <ModalContent bgColor="#0F0301">
            <ModalCloseButton />
            <ModalHeader className="modal-head">Settings</ModalHeader>
            <ModalBody>
              <Checkbox
                size="lg"
                colorScheme="purple"
                borderColor="purple.100"
                fontFamily="Geostar Fill"
                my="4"
                fontSize="3xl"
                isChecked={jury}
                onChange={() => {
                  setJury(!jury);
                }}
              >
                Apply for Jury
              </Checkbox>

              <FormLabel htmlFor="github" fontFamily="Eirian" my="2">
                Github Username
              </FormLabel>
              <Input
                size="md"
                id="github"
                variant="outline"
                colorScheme="purple"
                borderColor="purple.100"
                fontFamily="Eirian"
                fontSize="xl"
                value={github}
                onChange={(e) => {
                  setGithub(e.target.value);
                }}
              />

              <FormLabel htmlFor="twitter" fontFamily="Eirian" my="2">
                Twitter Username
              </FormLabel>
              <Input
                size="md"
                id="twitter"
                colorScheme="purple"
                borderColor="purple.100"
                fontFamily="Eirian"
                variant="outline"
                mb="4"
                fontSize="xl"
                value={twitter}
                boxShadow="none"
                onChange={(e) => {
                  setTwitter(e.target.value);
                }}
                _focus={{
                  borderColor: "purple.50",
                  boxShadow: "none",
                }}
                _hover={{
                  borderColor: "purple.50",
                  boxShadow: "none",
                }}
              />

              <FormLabel
                htmlFor="profile"
                fontFamily="Eirian"
                my="4"
                fontWeight="bold"
              >
                Profile Image
              </FormLabel>
              <Input
                placeHolder="Select profile picture"
                size="lg"
                fontFamily="Eirian"
                backgroundColor="transparent"
                id="profile"
                type="file"
                border="none"
                boxShadow="none"
                color="purple.200"
                _focus={{
                  borderColor: "purple.50",
                  boxShadow: "none",
                }}
                _hover={{
                  borderColor: "purple.50",
                  boxShadow: "none",
                }}
              />
              <FormLabel
                htmlFor="cover"
                fontFamily="Eirian"
                my="4"
                fontWeight="bold"
              >
                Cover Image
              </FormLabel>
              <Input
                placeHolder="Select profile picture"
                size="lg"
                fontFamily="Eirian"
                backgroundColor="transparent"
                id="cover"
                type="file"
                border="none"
                color="purple.200"
              />
            </ModalBody>

            <ModalFooter>
              <Button
                size="md"
                fontFamily="Eirian"
                border="1px"
                borderColor="purple.200"
                borderRadius="10px"
                fontSize="1.2em"
                bg="transparent"
                color="gray.200"
                onClick={onClose}
                _hover={{
                  bg: "gray.200",
                  color: "purple.800",
                }}
                colorScheme="purple"
                mr={3}
              >
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <HStack gap="5" my="4">
          <Linker href={`https://www.twitter.com/${twitter}`} target="_blank">
            <FiTwitter size="3em" />
          </Linker>
          <Linker href={`https://www.github.com/${github}`} target="_blank">
            <FiGithub size="3em" />
          </Linker>
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
          <Heading
            color="white"
            my="4"
            fontSize="4xl"
            className="head"
            display="inline-flex"
            _selection={{
              color: "purple.800",
              background: "white",
            }}
          >
            <GiInjustice
              size="1.8em"
              style={{
                marginRight: "0.5em",
                marginBottom: "-1em",
              }}
            />
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
                  <Box key={index} py="2" mx="4">
                    <Link href={`/audit/${audit}`} passHref>
                      <Linker>
                        <Text
                          fontSize="1.1em"
                          className="address"
                          color="purple.100"
                          display="inline-flex"
                          href={`/audit/${audit}`}
                          _selection={{
                            color: "purple.800",
                            background: "white",
                          }}
                          _hover={{
                            color: "purple.100",
                          }}
                        >
                          {audit}
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
          m="4"
          p="4"
          w="50vw"
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
              color: "purple.800",
              background: "white",
            }}
          >
            <AiOutlineAudit
              size="1.7em"
              style={{
                marginRight: "0.5em",
                marginBottom: "-1em",
              }}
            />
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
                  <VStack key={index} py="2" mx="4">
                    <Link href={`/audit/${audit}`} passHref>
                      <a>
                        <Text
                          fontSize="1.1em"
                          color="purple.100"
                          display="inline-flex"
                          className="address"
                          _selection={{
                            color: "purple.800",
                            background: "white",
                          }}
                          _hover={{
                            color: "purple.50",
                          }}
                        >
                          {audit}
                        </Text>
                      </a>
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
          <Heading
            color="white"
            my="4"
            fontSize="3xl"
            className="head"
            display="inline-flex"
          >
            <BsBug
              size="1.4em"
              style={{
                marginRight: "0.5em",
              }}
            />
            Reported bugs in :
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
                  borderColor="purple.50"
                  borderStart="solid"
                  p="6"
                  borderRadius="15px"
                >
                  <Link href={`/audit/${bug.contractAddress}`} passHref>
                    <Linker
                      fontSize="2xl"
                      color="purple.100"
                      display="inline-flex"
                      className="address"
                      _hover={{
                        color: "purple.50",
                      }}
                      blendMode="unset"
                      _selected={true}
                      _selection={{
                        backgroundColor: "purple.700",
                        color: "black",
                      }}
                    >
                      {bug.contractAddress}
                    </Linker>
                  </Link>
                  <Text
                    fontSize="xl"
                    color="purple.50"
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
                      <GoUnverified size="1.4em" color="purple" />
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

export default UserProfile;
