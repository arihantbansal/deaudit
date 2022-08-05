import React from "react";
import { Box, Flex, Link, Heading, Text } from "@chakra-ui/react";
import styles from "@styles/Listing.module.scss";
import { useRouter } from "next/router";

const Users = ({ users }) => {
  const router = useRouter();
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
          <Box w="30%">
            <Box
              h="full"
              bgSize="cover"
              bgImage={`url("${user.coverImage}")`}
            ></Box>
          </Box>

          <Box py={12} px={6} w="70%" color="red.100" textAlign="center">
            <Heading className={styles.userHeader}>
              Wallet address : {user.address}
            </Heading>
            <Heading className={styles.userHeader}>
              Audits created : {user.auditsCreated}
            </Heading>
            <Heading className={styles.userHeader}>
              Bugs Reported : {user.bugsReported}
            </Heading>
            <Heading className={styles.userHeader}>
              Amount of Audits judged : {user.juryOf}
            </Heading>
          </Box>
        </Box>
      ))}
    </Flex>
  );
};

export default Users;
