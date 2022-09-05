import Users from "@components/Users/Users";
import Head from "next/head";
import React from "react";

const users = () => {
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <Users />
    </>
  );
};

export default users;
