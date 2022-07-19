import AuditProfile from "@components/AuditProfile/AuditProfile";
import Router, { useRouter } from "next/router";
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
    document.documentElement.style.setProperty("--button-color", "#fed7d7");
  }, []);

  if (exists) return <AuditProfile contractAddress={address} />;
  else Router.push("/404");
};

export default Audit;
