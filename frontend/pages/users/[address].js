import UserProfile from "@components/Users/UserProfile";
import { useRouter } from "next/router";
import { useEffect } from "react";

const User = () => {
  const exists = true;
  const router = useRouter();
  const { address } = router.query;

  useEffect(() => {
    document.documentElement.style.setProperty("--line-color", "#2102476c");
  }, []);

  if (exists) return <UserProfile userAddress={address} />;
  else router.push("/404");
};

export default User;
