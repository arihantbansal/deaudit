import React, { useEffect, useState } from "react";
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
import { config } from "@lib/utilities";

const Audits = ({ audits }) => {
  const router = useRouter();
  const currency = "MATIC";

  const [tags, setTags] = useState([]);

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

  useEffect(() => {
    const init = async () => {
      fetch(`${config}/tags`)
        .then((res) => res.json())
        .then((result) => {
          setTags(result?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    init();
  }, []);

  return (
    <VStack mt="20vh" width="100%" gap="10" mb="10">
      <Heading as="h1" size="xl" fontFamily="Laser">
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
        {tags?.map((tag, index) => (
          <Tag
            key={index}
            size="lg"
            variant="solid"
            border={selected.includes(tag) ? "none" : "0.2px solid #fff"}
            fontFamily="Space Grotesk"
            cursor="pointer"
            rounded="sm"
            colorScheme={selected.includes(tag) ? "black" : "white"}
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
            my="10"
            className={styles.container}
            flexDir="row"
            alignItems="center"
            rounded="sm"
            justifyContent="space-around"
            w="100%"
            color="black.100"
            cursor="pointer"
            onClick={() => {
              router.push(`/audits/${audit.contract_address}`);
            }}
          >
            <Flex flexDir="column" shadow="lg" h="fit-content" p="10" w="80%">
              <Heading className={styles.auditHeader}>
                Contract Address : {audit.contract_address}
              </Heading>
              <Heading className={styles.auditHeader}>
                Audit creator : {audit.created_by}
              </Heading>
              <Heading className={styles.auditHeader}>
                Chain : {audit.chain}
              </Heading>
              {
                <HStack spacing={4} mt="4" fontFamily="Space Grotesk">
                  {audit.tags?.length !== 0 ? (
                    audit.tags?.map((tag, index) => (
                      <Tag
                        size="lg"
                        key={index}
                        variant="outline"
                        rounded="sm"
                        colorScheme="whiteAlpha"
                      >
                        {tag}
                      </Tag>
                    ))
                  ) : (
                    <Text color="white">No tags found</Text>
                  )}
                </HStack>
              }
            </Flex>
            <Flex
              flexDir="column"
              shadow="lg"
              justifyContent="space-around"
              alignItems="center"
              gap="4"
              width="30%"
            >
              <Flex
                flexDir="row"
                justifyContent="space-evenly"
                alignItems="center"
                gap="12"
              >
                <BsBug size="2em" />
                <Text fontSize="2xl">
                  {audit.bugs_reported ? audit.bugs_reported.length : 0}
                </Text>
              </Flex>
              <Flex
                flexDir="row"
                justifyContent="space-evenly"
                alignItems="center"
                gap="2"
                ml="6"
              >
                <RiMoneyDollarCircleLine size="2.4em" />
                <Text fontSize="xl">
                  {audit.initial_pool_size} {currency}
                </Text>
              </Flex>
              <Flex
                flexDir="row"
                justifyContent="space-evenly"
                alignItems="center"
                gap="12"
              >
                <GiInjustice size="2em" />
                <Text fontSize="2xl">
                  {audit.jury_members ? audit.jury_members.length : 0}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </VStack>
  );
};
export default Audits;
