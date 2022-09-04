import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import dynamic from "next/dynamic";
const UserProfile = dynamic(() => import("@components/Users/UserProfile"), {
  ssr: false,
});

const User = () => {
  const { query: address } = useRouter();
  useEffect(() => {
    document.documentElement.style.setProperty("--line-color", "#21024741");
  }, []);

  return <UserProfile userAddress={address} />;
};

export default User;
