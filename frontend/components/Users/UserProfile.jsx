import React, { useEffect, useReducer, useState } from "react";
import {
  Box,
  Button,
  Center,
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
  Spinner,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import { FiTwitter, FiGithub, FiSettings, FiLinkedin } from "react-icons/fi";
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
import { Web3Storage } from "web3.storage";

// Construct with token and endpoint
const client = new Web3Storage({
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGQ2OUZiZERiNkI3YTZDYTA5MEU1ZDdlMENlNTU3MDJBNmEyRTMwZEUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTk0MjQxMTQ1MzAsIm5hbWUiOiJkZWF1ZGl0In0.brbCSwSRpKGpzPA_uz2LtoUUQlq0HXv_gzta7dQsjxE",
});

const UserProfile = ({ userAddress }) => {
  // Dummy data, to be fetched from chain and backend
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

  // Modal and page title utilities
  const profileModal = useDisclosure();
  const loadingModal = useDisclosure();
  const { data, isError, isLoading } = useEnsName({ address: userAddress });
  const cutAddress = "User " + ellipseAddress(userAddress);
  let [title, setTitle] = useState("");
  const { address, isConnecting, isDisconnected } = useAccount();

  // Handling user text-data
  const initialState = {
    github: "",
    twitter: "",
    linkedin: "",
    jury: false,
    bio: "Crypto Enthusiast",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "setGithub":
        return { ...state, github: action.payload };
      case "setTwitter":
        return { ...state, twitter: action.payload };
      case "setLinkedin":
        return { ...state, linkedin: action.payload };
      case "setJury":
        return { ...state, jury: action.payload };
      case "setBio":
        return { ...state, bio: action.payload };
      default:
        return state;
    }
  };

  const [socialState, dispatch] = useReducer(reducer, initialState);

  // Handling user image-data
  const [profileImage, setProfileImage] = useState(
    "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8"
  );
  const [coverImage, setCoverImage] = useState(
    "https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8"
  );

  const handleProfile = async (e) => {
    loadingModal.onOpen();
    const file = e.target.files;
    const rootCid = await client.put(file, {
      name: file[0].name + "-" + userAddress,
      maxRetries: 3,
    });

    const res = await client.get(rootCid);
    const returnFile = await res.files();
    setProfileImage(
      "https://" + rootCid + ".ipfs.dweb.link/" + returnFile[0].name
    );
    loadingModal.onClose();
    profileModal.onClose();
  };

  const handleCover = async (e) => {
    loadingModal.onOpen();
    const file = e.target.files;
    const rootCid = await client.put(file, {
      name: file[0].name + "-" + userAddress,
      maxRetries: 3,
    });

    const res = await client.get(rootCid);
    const returnFile = await res.files();
    setCoverImage(
      "https://" + rootCid + ".ipfs.dweb.link/" + returnFile[0].name
    );
    loadingModal.onClose();
    profileModal.onClose();
  };

  useEffect(() => {
    if (address === userAddress) {
      setTitle("Your Profile");
    } else {
      setTitle(cutAddress);
    }
  }, [userAddress, cutAddress, address]);

  // TODO Fetching user data from backend using useEffect

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
        overflowX="hidden"
        top="0"
      >
        <Head>
          <title>{title}</title>
        </Head>
        <Flex
          w="100%"
          h="85vh"
          bgImage={`url(${coverImage})`}
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
          src={profileImage}
          borderRadius="full"
          objectFit="cover"
          borderWidth="2px"
          borderColor="white"
          borderStyle="solid"
          mb="4"
        />

        {!address ? null : address === userAddress ? (
          <Button
            fontSize="3em"
            mx="auto"
            position="relative"
            top="-16"
            left="20"
            fontFamily="Space Grotesk"
            border="none"
            borderRadius="10px"
            letterSpacing="0.5px"
            bg="transparent"
            color="purple.200"
            onClick={profileModal.onOpen}
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

        <Text
          color="purple.100"
          my="4"
          fontSize="1.7em"
          fontFamily="Azeret Thin"
          _selection={{
            color: "purple.800",
            background: "white",
          }}
        >
          <Linker
            href={
              !isLoading && !isError && data
                ? `https://app.ens.domains/name/${data}`
                : null
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            ENS : &nbsp;
            {isLoading ? (
              <span>Loading...</span>
            ) : isError ? (
              <span>N/A</span>
            ) : (
              <span>{data}</span>
            )}
          </Linker>
        </Text>

        <Modal
          isOpen={profileModal.isOpen}
          onClose={profileModal.onClose}
          isCentered
        >
          <ModalOverlay />
          <ModalContent bgColor="#0d0717">
            <ModalCloseButton />
            <ModalHeader className="modal-head">Profile Settings</ModalHeader>
            <ModalBody>
              <Checkbox
                size="md"
                colorScheme="purple"
                borderColor="purple.100"
                fontFamily="Geostar Fill"
                mb="3"
                fontSize="3xl"
                isChecked={socialState.jury}
                onChange={() => {
                  dispatch({ type: "setJury", payload: !socialState.jury });
                }}
              >
                Apply for Jury
              </Checkbox>
              <FormLabel htmlFor="bio" fontSize="sm" fontFamily="Space Grotesk">
                Bio
              </FormLabel>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself"
                spellCheck="false"
                size="md"
                border="1px"
                borderColor="purple.50"
                borderRadius="10px"
                fontFamily="Space Grotesk"
                rows="3"
                cols="40"
                value={socialState.bio}
                onChange={(e) => {
                  dispatch({ type: "setBio", payload: e.target.value });
                }}
                mb="2"
                fontSize="1em"
                color="purple.100"
                boxShadow="none"
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
                htmlFor="github"
                fontSize="sm"
                fontFamily="Space Grotesk"
                my="2"
              >
                Github Username
              </FormLabel>
              <Input
                size="md"
                id="github"
                variant="outline"
                colorScheme="purple"
                borderColor="purple.100"
                fontFamily="Space Grotesk"
                fontSize="lg"
                _focus={{
                  borderColor: "purple.50",
                  boxShadow: "none",
                }}
                value={socialState.github}
                onChange={(e) => {
                  dispatch({ type: "setGithub", payload: e.target.value });
                }}
              />

              <FormLabel
                htmlFor="twitter"
                fontSize="sm"
                fontFamily="Space Grotesk"
                my="2"
              >
                Twitter Username
              </FormLabel>
              <Input
                size="md"
                id="twitter"
                colorScheme="purple"
                borderColor="purple.100"
                fontFamily="Space Grotesk"
                variant="outline"
                fontSize="lg"
                value={socialState.twitter}
                boxShadow="none"
                onChange={(e) => {
                  dispatch({ type: "setTwitter", payload: e.target.value });
                }}
                _focus={{
                  borderColor: "purple.50",
                  boxShadow: "none",
                }}
              />

              <FormLabel
                htmlFor="linkedin"
                fontSize="sm"
                fontFamily="Space Grotesk"
                my="2"
              >
                LinkedIn Username
              </FormLabel>
              <Input
                size="md"
                id="linkedin"
                colorScheme="purple"
                borderColor="purple.100"
                fontFamily="Space Grotesk"
                variant="outline"
                mb="2"
                fontSize="lg"
                value={socialState.linkedin}
                boxShadow="none"
                onChange={(e) => {
                  dispatch({ type: "setLinkedin", payload: e.target.value });
                }}
                _focus={{
                  borderColor: "purple.50",
                  boxShadow: "none",
                }}
              />

              <FormLabel
                htmlFor="profile"
                fontFamily="Space Grotesk"
                my="3"
                fontWeight="bold"
              >
                Cover Image
              </FormLabel>
              <Input
                placeholder="Select cover image"
                size="md"
                fontFamily="Space Grotesk"
                backgroundColor="transparent"
                id="cover"
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
                onChange={(e) => handleCover(e)}
              />
              <FormLabel
                htmlFor="cover"
                fontFamily="Space Grotesk"
                my="3"
                fontWeight="bold"
              >
                Profile Image
              </FormLabel>
              <Input
                placeholder="Select profile image"
                size="md"
                fontFamily="Space Grotesk"
                backgroundColor="transparent"
                id="profile"
                type="file"
                border="none"
                color="purple.200"
                onChange={(e) => handleProfile(e)}
              />
            </ModalBody>

            <ModalFooter>
              <Button
                size="md"
                fontFamily="Space Grotesk"
                border="1px"
                borderColor="purple.200"
                borderRadius="10px"
                fontSize="1.2em"
                bg="transparent"
                color="gray.200"
                onClick={profileModal.onClose}
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

        <Modal
          isCentered
          onClose={loadingModal.onClose}
          isOpen={loadingModal.isOpen}
          closeOnOverlayClick={false}
          size="md"
        >
          <ModalOverlay />
          <ModalContent bgColor="#0d0717">
            <ModalBody>
              <ModalHeader
                fontSize="2xl"
                color="purple.100"
                fontFamily="Space Grotesk"
                textAlign="center"
              >
                Updating Image...
              </ModalHeader>
              <Center my="2">
                <Spinner size="xl" color="purple.100" fontSize="3xl" />
              </Center>
            </ModalBody>
          </ModalContent>
        </Modal>

        <Text
          fontFamily="Azeret Thin"
          fontSize="1.5em"
          color="purple.100"
          mb="2"
        >
          {socialState.bio}
        </Text>

        <HStack gap="5" my="4">
          <Linker
            href={`https://www.twitter.com/${socialState.twitter}`}
            target="_blank"
          >
            <FiTwitter size="2.5em" />
          </Linker>
          <Linker
            href={`https://www.github.com/${socialState.github}`}
            target="_blank"
          >
            <FiGithub size="2.5em" />
          </Linker>
          <Linker
            href={`https://www.linkedin.com/in/${socialState.linkedin}`}
            target="_blank"
          >
            <FiLinkedin size="2.5em" />
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
                    <Link href={`/audits/${audit}`} passHref>
                      <Linker>
                        <Text
                          fontSize="1.1em"
                          className="address"
                          color="purple.100"
                          display="inline-flex"
                          href={`/audits/${audit}`}
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
                    <Link href={`/audits/${audit}`} passHref>
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
            overflowX="hidden"
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
                  w="50vw"
                  borderWidth="0.5px"
                  borderColor="purple.50"
                  borderStart="solid"
                  p="6"
                  borderRadius="15px"
                >
                  <Link href={`/audits/${bug.contractAddress}`} passHref>
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