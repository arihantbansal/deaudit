import UserProfile from "@components/UserProfile/UserProfile";
import { useRouter } from "next/router";

const User = () => {
  const router = useRouter();
  const { address } = router.query;

  return <UserProfile userAddress={address} />;
};

export default User;
