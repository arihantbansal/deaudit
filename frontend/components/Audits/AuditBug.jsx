import { Button, Checkbox, Flex, Text, VStack } from "@chakra-ui/react";
import { Link as Linker } from "@chakra-ui/react";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import styles from "@styles/Listing.module.scss";
import { config, CONTRACT_ADDRESS } from "@lib/utilities";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import contractAbi from "@lib/contractAbi.json";

const AuditBug = ({ bug, audit }) => {
  const [bugId, setBugId] = useState(0);
  const [voteState, setVoteState] = useState(false);
  const { address } = useAccount();

  //   // get jury
  //   const jurydata = useContractRead({
  //     addressOrName: CONTRACT_ADDRESS,
  //     contractInterface: contractAbi,
  //     functionName: "getEligibleMembers",
  //   });

  //   // get voting config
  //   const { config : configForVote } = usePrepareContractWrite({
  //     addressOrName: CONTRACT_ADDRESS,
  //     contractInterface: contractAbi,
  //     functionName: "juryVote",
  //     args: [audit.contract_address, bug.reported_by, bugId, jurydata, voteState],
  //   });

  //   // vote
  // const { write : writeVote } = useContractWrite(configForVote);

  useEffect(() => {
    const init = async () => {
      const response = await fetch(`${config}/bugs/users/${bug.reported_by}`);
      const data = await response.json();
      const bugsArray = data.data;
      const bugId = bugsArray.findIndex(
        bugOfFetched =>
          bugOfFetched.description === bug.description &&
          bugOfFetched.reported_by === bug.reported_by
      );
      setBugId(bugId);
    };
    init();
  }, [bug.reported_by, bug.description]);

  return (
    <VStack
      my="10"
      mx="4"
      w="60vw"
      h="fit-content"
      px="6"
      py="10"
      gap="2"
      className={styles.container}
    >
      <Link href={`/users/${bug.reported_by}`} passHref>
        <Linker
          fontSize="lg"
          color="red.100"
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
          backgroundColor: "purple.100",
          color: "black",
        }}
        fontFamily="Azeret Thin"
      >
        Description : {bug.description}
      </Text>
      <Flex flexDir="column" gap="4">
        <Button
          fontFamily="Laser"
          // disabled={!address || juryData?.data?.findIndex(address) == -1}
          onClick={() => {
            setVoteState(true);
            writeVote?.();
          }}
        >
          Approve
        </Button>
        <Button
          fontFamily="Laser"
          // disabled={!address || juryData?.data?.findIndex(address) == -1}
          onClick={() => {
            setVoteState(false);
            writeVote?.();
          }}
        >
          Disapprove
        </Button>
      </Flex>
    </VStack>
  );
};

export default AuditBug;
