import Users from "@components/Users/Users";
import { config } from "@lib/utilities";
import Head from "next/head";
import React from "react";

const users = props => {
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <Users users={props.userList.data} />
    </>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch(`${config}/users/`);
  const userList = await res.json();

  return {
    props: {
      userList,
    },
  };
};

export default users;
