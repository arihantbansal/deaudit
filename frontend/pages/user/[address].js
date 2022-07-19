import Modal from "@components/Modal/Modal";
import UserProfile from "@components/UserProfile/UserProfile";
import { ellipseAddress } from "@lib/utilities";
import { useStateContext } from "contexts/StateContext";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";

const User = () => {
  const exists = true;
  const router = useRouter();
  const { address } = router.query;
  useEffect(() => {
    document.documentElement.style.setProperty("--line-color", "#2102476c");
    document.documentElement.style.setProperty("--button-color", "#D6BCFA");
  }, []);

  if (exists) return <UserProfile userAddress={address} />;
  else Router.push("/404");
};

export default User;
