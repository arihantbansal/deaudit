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
  useDisclosure,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Textarea,
  HStack,
  Tag,
  Center,
  FormControl,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "@styles/Listing.module.scss";
import { Link as Linker } from "@chakra-ui/react";
import {
  config,
  CONTRACT_ADDRESS,
  currency,
  ellipseAddress,
} from "@lib/utilities";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { GiInjustice } from "react-icons/gi";
import {
  allChains,
  useAccount,
  useContractEvent,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import contractAbi from "@lib/contractAbi.json";
import { BsBug } from "react-icons/bs";
import { ethers } from "ethers";
import AuditBug from "./AuditBug";

const AuditProfile = ({ audit, bugs }) => {
  const [bugMoney, setBugMoney] = useState("0");
  const [noBugMoney, setNoBugMoney] = useState("0");

  /*
  @desc : fetching audit data using address
  */
  // const { auditData, auditError, auditLoading } = useContractRead({
  //   addressOrName: CONTRACT_ADDRESS,
  //   contractInterface: contractAbi,
  //   functionName: "getAudit",
  //   args: [audit.contract_address],
  // });

  /*
  @desc : posting a bug, receiving the emitted event for NewBugReported and AuditYesPoolUpdated
  */
  // const { configForBugPost } = usePrepareContractWrite({
  //   addressOrName: CONTRACT_ADDRESS,
  //   contractInterface: contractAbi,
  //   functionName: "reportBug",
  //   args: [audit.contract_address],
  //   overrides: {
  //     value: ethers.utils.parseEther(bugMoney.toString())
  //   },
  // });

  // const { bugPostData, isLoadingPost, isSuccessPost, bugSubmit } = useContractWrite(configForBugPost);

  // useContractEvent({
  //   addressOrName: CONTRACT_ADDRESS,
  //   contractInterface: contractAbi,
  //   eventName: 'NewBugReported',
  //   listener: (event) => alert(`${event[1]} reported a new bug.`),
  // })

  // useContractEvent({
  //   addressOrName: CONTRACT_ADDRESS,
  //   contractInterface: contractAbi,
  //   eventName: 'AuditYesPoolUpdated',
  //   listener: (event) => alert(`${event[1]} added ${parseInt(event[2]?._hex, 16)} to the YesBug pool.`)
  // })

  /*
  @desc : Funding no bug pool, receiving the emitted event for AuditNoPoolUpdated
  */
  // const { configForNoBug } = usePrepareContractWrite({
  //   addressOrName: CONTRACT_ADDRESS,
  //   contractInterface: contractAbi,
  //   functionName: "fundNoBugs",
  //   args: [audit.contract_address],
  //   overrides: {
  //     value: ethers.utils.parseEther(noBugMoney.toString())
  //   },
  // });

  // const { noBugPoolData , isLoadingPool, isSuccessPool, noBugPoolSubmit } = useContractWrite(configForNoBug);

  // useContractEvent({
  //   addressOrName: CONTRACT_ADDRESS,
  //   contractInterface: contractAbi,
  //   eventName: "AuditNoPoolUpdated",
  //   listener: event =>
  //     alert(
  //       `${event[1]} added ${parseInt(event[2]?._hex, 16)} to the NoBug pool.`
  //     ),
  // });

  const handleBugSubmit = async () => {
    // Create user if not exists
    fetch(`${config}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: address,
      }),
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });

    // Create bug if not exists and get ID
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

    // update audit with the bug using the ID from above
    fetch(`${config}/audits/${audit.contract_address}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bugs_reported: [...bugsArray, num],
      }),
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });

    // update user with the bug using the ID from above
    fetch(`${config}/users/${address}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bugs_reported: [num],
      }),
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });

    setBugDescription("");
  };

  const title = `Audit ${ellipseAddress(audit.contract_address)}`;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bugDescription, setBugDescription] = useState("");
  const auditURL =
    allChains.find(c => c.name === audit.chain).blockExplorers.default.url +
    "/" +
    audit.contract_address;
  const { address, isConnecting, isDisconnected } = useAccount();
  const bugsArray = bugs.map(bug => bug.id);

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
          my="6"
          flexDir="row"
          fontSize="1.8em"
          className="head"
          display="inline-block"
          _selection={{
            color: "red.800",
            background: "white",
          }}
        >
          Contract :
          <Linker
            color="red.100"
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
          fontSize="1.6em"
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
                color="red.100"
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

        <Center m="4">
          <HStack gap="6">
            {audit.tags?.map((tag, index) => (
              <Tag
                key={index}
                size="lg"
                transform="scale(1.1)"
                variant="outline"
                fontFamily="Aeonik Light"
                cursor="pointer"
                colorScheme="whiteAlpha"
                userSelect="none"
              >
                {tag}
              </Tag>
            ))}
          </HStack>
        </Center>

        <Button
          size="lg"
          mx="auto"
          my="6"
          fontFamily="Aeonik Light"
          letterSpacing="1.5px"
          border="1px"
          borderColor="red.100"
          borderRadius="10px"
          fontSize="1.3em"
          bg="transparent"
          color="red.50"
          onClick={onOpen}
          _hover={{
            bg: "transparent",
          }}
          leftIcon={<BsBug />}
        >
          Report a Bug
        </Button>

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent bgColor="#060100">
            <ModalCloseButton />
            <ModalHeader className="modal-head">Report Bug</ModalHeader>
            <ModalBody>
              <FormControl isRequired>
                <Textarea
                  required
                  spellCheck="false"
                  placeholder="Description"
                  size="lg"
                  rows="6"
                  cols="50"
                  value={bugDescription}
                  onChange={e => setBugDescription(e.target.value)}
                  className={styles.auditInputs}
                />
              </FormControl>
              <Flex
                justify="center"
                gap="4"
                align="center"
                my="6"
                flexDirection="row"
                fontFamily="Space Grotesk"
                float="right"
              >
                <FormControl isRequired>
                  <Input
                    required
                    placeholder="Amount"
                    size="lg"
                    value={bugMoney}
                    w="120px"
                    onChange={e => setBugMoney(e.target.value)}
                    className={styles.auditInputs}
                  />
                </FormControl>

                <Text fontSize="xl"> {currency}</Text>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button
                size="md"
                fontFamily="Space Grotesk"
                border="1px"
                borderColor="red.100"
                borderRadius="10px"
                fontSize="1em"
                bg="transparent"
                color="gray.200"
                onClick={async () => {
                  if (bugDescription.length > 0) {
                    await handleBugSubmit();
                    // await bugSubmit();
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
              {
                //TODO fetch audit.jury
                audit.jury_members?.map((juryMember, index) => {
                  return (
                    <Box key={index} py="2" mx="4">
                      <Link href={`/users/${juryMember}`} passHref>
                        <Linker>
                          <Text
                            fontSize="1.1em"
                            color="red.100"
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
                })
              }
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
            my="8"
            fontSize="2xl"
            fontFamily="Space Grotesk"
          >
            {bugs?.map((bug, index) => {
              return <AuditBug key={index} bug={bug} audit={audit} />;
            })}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AuditProfile;
