import React from "react";
import { Box, Flex, Link, Heading, Text } from "@chakra-ui/react";
import { BsBug } from "react-icons/bs";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import styles from "@styles/Listing.module.scss";
import { useRouter } from "next/router";

const Audits = ({ audits }) => {
  const router = useRouter();

  return (
    <Flex
      mt="25vh"
      mx="5vw"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
    >
      {audits.map((audit) => (
        <Flex
          key={audit.id}
          h="fit-content"
          bg="#120101"
          border="1px solid #f2b4b4"
          flexDir="row"
          alignItems="center"
          rounded="lg"
          justifyContent="space-around"
          w="85%"
          color="red.100"
          cursor="pointer"
          onClick={() => {
            router.push(`/audits/${audit.address}`);
          }}
        >
          <Flex
            flexDir="column"
            shadow="lg"
            h="fit-content"
            py="10"
            px="6"
            w="90%"
          >
            <Heading className={styles.auditHeader}>
              Contract Name : {audit.name}
            </Heading>
            <Heading className={styles.auditHeader}>
              Contract Address : {audit.address}
            </Heading>
            <Heading className={styles.auditHeader}>
              Audit creator : {audit.creator}
            </Heading>
          </Flex>
          <Flex
            flexDir="column"
            shadow="lg"
            justifyContent="space-evenly"
            alignItems="center"
            gap="4"
            width="25%"
          >
            <Flex
              flexDir="row"
              justifyContent="space-evenly"
              alignItems="center"
              gap="12"
            >
              {/* <Flex justifyContent="center" alignItems="center" gap="4"> */}
              <BsBug size="3em" />
              <Text fontSize="2xl">{audit.bugs}</Text>
              {/* </Flex> */}
              {/* <Button
                background="transparent"
                border="1px solid #f2b4b4;"
                color="red.100"
                fontFamily="Space Grotesk"
                fontSize="xl"
                rounded="lg"
                float="right"
                ml="10px"
                fontWeight="bold"
                _hover={{ background: "red.100", color: "red.900" }}
              >
                Report
              </Button> */}
            </Flex>
            <Flex
              flexDir="row"
              justifyContent="space-around"
              alignItems="center"
              gap="4"
            >
              <RiMoneyDollarCircleLine size="3.5em" />
              <Box float="left">
                <Text fontSize="xl">{audit.poolSizes.NoBug} N</Text>
                <Text fontSize="xl">{audit.poolSizes.YesBug} Y</Text>
              </Box>
              {/* <Button
                background="transparent"
                border="1px solid #f2b4b4;"
                color="red.100"
                fontFamily="Space Grotesk"
                fontSize="xl"
                float={"right"}
                rounded="lg"
                fontWeight="bold"
                _hover={{ background: "red.100", color: "red.900" }}
              >
                Bet
              </Button> */}
            </Flex>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};
export default Audits;
