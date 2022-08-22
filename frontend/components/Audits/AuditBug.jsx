import { Box, Button, Checkbox, Flex, Text, VStack } from "@chakra-ui/react";
import { Link as Linker } from "@chakra-ui/react";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import styles from "@styles/Listing.module.scss";
import { config, CONTRACT_ADDRESS } from "@lib/utilities";
import {
  useAccount,
  useContractEvent,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import contractAbi from "@lib/contractAbi.json";

const AuditBug = ({ bug, audit }) => {
  const [bugId, setBugId] = useState(0);
  const [voteState, setVoteState] = useState(false);
  let [juryIndex, setJuryIndex] = useState(0);
  const { address } = useAccount();

  //   // Get eligible jury pool
  const {
    data: auditData,
    isLoading: isLoadingData,
    isError: isErrorData,
  } = useContractRead({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: contractAbi,
    functionName: "getAuditData",
    args: [audit.contract_address],
  });

  // get voting config
  const { config: configForVote } = usePrepareContractWrite({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: contractAbi,
    functionName: "juryVote",
    args: [
      audit.contract_address,
      bug.reported_by,
      bugId,
      juryIndex,
      voteState,
    ],
  });

  // vote
  const { isLoading: isLoadingVote, write: writeVote } =
    useContractWrite(configForVote);

  useContractEvent({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: contractAbi,
    eventName: "JuryVoteOnBug",
    listener: event =>
      alert(`Jury : ${event[2]} voted on a bug reported by ${event[1]}.`),
  });

  const {
    data: bugVotedData,
    isLoading: isLoadingBug,
    isError: isErrorBug,
  } = useContractRead({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: contractAbi,
    functionName: "getBugByIndex",
    args: [audit.contract_address, bug.reported_by, bugId],
  });

  useEffect(() => {
    const init = async () => {
      const response = await fetch(`${config}/bugs/users/${bug.reported_by}`);
      const data = await response.json();
      const bugsArray = data.data;
      const newArray = bugsArray.filter(
        bugOfFetched => bugOfFetched.audit_id === audit.contract_address
      );
      const bugId = newArray.findIndex(
        bugOfFetched =>
          bugOfFetched.description === bug.description &&
          bugOfFetched.reported_by === bug.reported_by &&
          bugOfFetched.audit_id === audit.contract_address
      );
      setBugId(bugId);
    };
    init();
    if (auditData) {
      setJuryIndex(
        auditData.jury.findIndex(j => j === address) === -1
          ? 0
          : auditData.jury.findIndex(j => j === address)
      );
    }
  }, [bug.reported_by, bug.description, address, auditData, audit]);

  return (
    <VStack
      my="10"
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
        fontFamily="Space Grotesk"
      >
        Description : {bug.description}
      </Text>
      <Text fontSize="xl" fontFamily="Space Grotesk">
        Total votes yet :{" "}
        {isLoadingBug || isErrorBug
          ? "Loading..."
          : bugVotedData[1].filter(vote => vote === true).length}
      </Text>
      <Text fontSize="xl" fontFamily="Space Grotesk">
        Verdict :{" "}
        {isLoadingBug || isErrorBug
          ? "Loading..."
          : bugVotedData[3] === 2
          ? "Approved"
          : bugVotedData[3] === 1
          ? "Disapproved"
          : "Pending..."}
      </Text>
      <Flex flexDir="row" gap="4">
        {(address && isLoadingData) ||
        isErrorData ||
        isLoadingBug ||
        isErrorBug ||
        !auditData ||
        isLoadingVote ? null : (
          <Box>
            <Button
              fontFamily="Laser"
              disabled={
                !auditData.jury.includes(address) ||
                bugVotedData[1][auditData.jury.findIndex(x => x === address)]
              }
              onClick={() => {
                setVoteState(true);
                writeVote?.();
              }}
            >
              Approve
            </Button>
            <Button
              fontFamily="Laser"
              disabled={
                !auditData.jury.includes(address) ||
                bugVotedData[1][auditData.jury.findIndex(x => x === address)]
              }
              onClick={() => {
                setVoteState(false);
                console.log(voteState);
                writeVote?.();
              }}
            >
              Disapprove
            </Button>
          </Box>
        )}
      </Flex>
      {(address && isLoadingData) ||
      isErrorData ||
      isLoadingBug ||
      isErrorBug ||
      !auditData ? null : auditData.jury.includes(address) ? (
        bugVotedData[1][auditData.jury.findIndex(x => x === address)] ? (
          <Text fontSize="xl" fontFamily="Space Grotesk">
            You have voted on this bug.
          </Text>
        ) : (
          <Text fontSize="xl" fontFamily="Space Grotesk">
            You have not voted on this bug.
          </Text>
        )
      ) : (
        <Text fontSize="xl" fontFamily="Space Grotesk">
          You are not a jury member.
        </Text>
      )}
    </VStack>
  );
};

export default AuditBug;
