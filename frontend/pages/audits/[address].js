import AuditProfile from "@components/Audits/AuditProfile";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Audit = () => {
  const exists = true;
  const router = useRouter();
  const { address } = router.query;

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--line-color",
      "rgba(65, 3, 3, 0.351)"
    );
  }, []);

  if (exists) return <AuditProfile contractAddress={address} />;
  else router.push("/404");
};

export default Audit;
