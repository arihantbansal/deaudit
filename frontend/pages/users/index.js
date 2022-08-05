import Users from "@components/Users/Users";
import Head from "next/head";
import React from "react";

const users = () => {
  // Dummy data, fetch users here.
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
    <>
      <Head>
        <title>Users</title>
      </Head>
      <Users users={users} />
    </>
  );
};

export default users;
