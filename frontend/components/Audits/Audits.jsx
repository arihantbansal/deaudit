import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  Input,
  HStack,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import { BsBug } from "react-icons/bs";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import styles from "@styles/Listing.module.scss";
import { useRouter } from "next/router";
import { GiInjustice } from "react-icons/gi";

const Audits = ({ audits }) => {
  const router = useRouter();

  // Tags for the audit
  const tagsFetchedFromDb = [
    "bug",
    "polygon",
    "harmony",
    "centralized",
    "erc721",
    "dao",
    "erc20",
    "ethereum",
  ];

  // Tags selected by user for filter
  const [selected, setSelected] = useState([]);

  // Handler
  const handleTagFilter = (tag) => {
    if (selected.includes(tag)) {
      setSelected(selected.filter((t) => t !== tag));
    } else {
      setSelected([...selected, tag]);
    }
  };
  return (
    <VStack mt="20vh" width="100%" gap="10">
      <Heading as="h1" size="xl" fontFamily="Geostar">
        Audits
      </Heading>

      <Input
        w="50%"
        size="lg"
        mb="20"
        className={styles.input}
        placeholder="Search by contract address"
        onChange={(e) => {
          console.log(e.target.value);
        }}
      />
      <Text className={styles.text}>Filter by tags :</Text>
      <HStack gap="2">
        {tagsFetchedFromDb.map((tag, index) => (
          <Tag
            key={index}
            size="lg"
            variant="solid"
            border={selected.includes(tag) ? "none" : "0.2px solid #fff"}
            fontFamily="Space Grotesk"
            cursor="pointer"
            colorScheme={selected.includes(tag) ? "red" : "white"}
            userSelect="none"
            onClick={() => handleTagFilter(tag)}
          >
            <TagLabel>{tag}</TagLabel>
          </Tag>
        ))}
      </HStack>
      <Flex
        width="75%"
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
            w="100%"
            color="red.100"
            cursor="pointer"
            onClick={() => {
              router.push(`/audits/${audit.address}`);
            }}
          >
            <Flex flexDir="column" shadow="lg" h="fit-content" p="10" w="80%">
              <Heading className={styles.auditHeader}>
                Contract Name : {audit.name}
              </Heading>
              <Heading className={styles.auditHeader}>
                Contract Address : {audit.address}
              </Heading>
              <Heading className={styles.auditHeader}>
                Audit creator : {audit.creator}
              </Heading>
              {
                <HStack spacing={4} mt="4" fontFamily="Space Grotesk">
                  {audit.tags.length !== 0
                    ? audit.tags.map((tag, index) => (
                        <Tag
                          size="lg"
                          key={index}
                          variant="solid"
                          colorScheme="red"
                        >
                          {tag}
                        </Tag>
                      ))
                    : null}
                </HStack>
              }
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
                <BsBug size="2em" />
                <Text fontSize="2xl">{audit.bugs.length}</Text>
              </Flex>
              <Flex
                flexDir="row"
                justifyContent="space-around"
                alignItems="center"
                gap="6"
              >
                <RiMoneyDollarCircleLine size="2.4em" />
                <Box float="left">
                  <Text fontSize="xl">{audit.poolSizes.NoBug} N</Text>
                  <Text fontSize="xl">{audit.poolSizes.YesBug} Y</Text>
                </Box>
              </Flex>
              <Flex
                flexDir="row"
                justifyContent="space-evenly"
                alignItems="center"
                gap="12"
              >
                <GiInjustice size="2em" />
                <Text fontSize="2xl">{audit.juryMembers.length}</Text>
              </Flex>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </VStack>
  );
};
export default Audits;
