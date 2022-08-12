import React from "react";
import { Box, Flex, Heading, VStack } from "@chakra-ui/react";
import styles from "@styles/Listing.module.scss";
import { useRouter } from "next/router";

const Users = ({ users }) => {
  const router = useRouter();
  return (
    <VStack mt="20vh" width="100%">
      <Heading as="h1" size="xl" mb="20" fontFamily="Geostar">
        Users
      </Heading>
      <Flex p={50} w="full" alignItems="center" justifyContent="center">
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
                bgPos="center"
                bgImage={`url("${user.cover_image}")`}
              ></Box>
            </Box>

            <Box py={12} px={6} w="70%" color="red.100" textAlign="center">
              <Heading className={styles.userHeader}>
                Wallet address : {user.address}
              </Heading>
              <Heading className={styles.userHeader}>
                Audits created : {user.audits_requested?.length}
              </Heading>
              <Heading className={styles.userHeader}>
                Bugs Reported :{" "}
                {user.bugs_reported ? user.bugs_reported.length : 0}
              </Heading>
              <Heading className={styles.userHeader}>
                Amount of Audits judged : {user.jury_of?.length}
              </Heading>
            </Box>
          </Box>
        ))}
      </Flex>
    </VStack>
  );
};

export default Users;
