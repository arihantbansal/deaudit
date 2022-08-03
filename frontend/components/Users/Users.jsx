import React from "react";
import { Box, Flex, Link, Heading, Text } from "@chakra-ui/react";
import styles from "@styles/Listing.module.scss";
import { useRouter } from "next/router";

const Users = () => {
  const router = useRouter();
  const users = [
    {
      id: 1,
      address: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
      coverImage:
        "https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
      auditsCreated: 2,
      bugsReported: 2,
      juryOf: 3,
    },
  ];
  return (
    <Flex p={50} mt="16vh" w="full" alignItems="center" justifyContent="center">
      {users.map((user) => (
        <Box
          key={user.id}
          cursor="pointer"
          bg="#120101"
          mx="8"
          w="90%"
          display="flex"
          maxW="5xl"
          shadow="lg"
          border="0.1px solid #f2b4b4"
          onClick={() => {
            router.push(`/users/${user.address}`);
          }}
        >
          <Box w="35%">
            <Box
              h="full"
              bgSize="cover"
              bgImage={`url("${user.coverImage}")`}
            ></Box>
          </Box>

          <Box py={12} px={6} w="65%" color="red.100" textAlign="center">
            <Heading fontSize="xl" className={styles.userHeader}>
              Address : {user.address}
            </Heading>
            <Heading className={styles.userHeader}>
              Audits Created : {user.auditsCreated}
            </Heading>
            <Heading className={styles.userHeader}>
              Bugs Reported : {user.bugsReported}
            </Heading>
            <Heading className={styles.userHeader}>
              Jury of : {user.juryOf}
            </Heading>
          </Box>
        </Box>
      ))}
    </Flex>
  );
};

export default Users;
