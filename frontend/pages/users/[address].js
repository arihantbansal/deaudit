import { config } from "@lib/utilities";
import React from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import dynamic from "next/dynamic";
const UserProfile = dynamic(() => import("@components/Users/UserProfile"), {
  ssr: false,
});

const User = props => {
  const router = useRouter();
  useEffect(() => {
    document.documentElement.style.setProperty("--line-color", "#21024741");
  }, []);

  if (props.user)
    return <UserProfile user={props.user?.data} bugs={props.bugList.data} />;
  else {
    if (typeof window !== "undefined") router.push("/404");
  }
};

export async function getServerSideProps(context) {
  const address = context.query.address;

  const [usersRes, bugsRes] = await Promise.all([
    fetch(`${config}/users/${address}`),
    fetch(`${config}/bugs/users/${address}`),
  ]);

  const [user, bugList] = await Promise.all([usersRes.json(), bugsRes.json()]);

  if (user.data === undefined) return { props: { user: null } };
  else return { props: { user, bugList } };
}

export default User;
