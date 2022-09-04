import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import dynamic from "next/dynamic";
const AuditProfile = dynamic(() => import("@components/Audits/AuditProfile"), {
  ssr: false,
});

const Audit = () => {
  const { query: address } = useRouter();
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--line-color",
      "rgba(40, 3, 3, 0.351)"
    );
  }, []);

  return <AuditProfile auditAddress={address} />;
};

export default Audit;
