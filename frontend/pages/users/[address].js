import UserProfile from "@components/Users/UserProfile";
import { config } from "@lib/utilities";
import {useRouter} from "next/router";
import { useEffect } from "react";

const User = (props) => {
  const router = useRouter();
  useEffect(() => {
    document.documentElement.style.setProperty("--line-color", "#2102476c");
  }, []);



 if(props.user) return <UserProfile user={props.user.data} />;
  else { if(typeof window !== "undefined") router.push("/404"); }
};

export async function getServerSideProps(context) {
  const address = context.query.address;
  const res = await fetch(`${config}/users/${address}`);
  const user = await res.json();

  if(user.data === undefined) return { props: { user: null } };
  return { props: { user } };
}

export default User;
