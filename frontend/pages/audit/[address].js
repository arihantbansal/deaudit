import AuditProfile from "@components/AuditProfile/AuditProfile";
import { useRouter } from "next/router";

const Audit = () => {
  const router = useRouter();
  const { address } = router.query;

  return <AuditProfile contractAddress={address} />;
};

export default Audit;
