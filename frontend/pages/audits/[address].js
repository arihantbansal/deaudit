import AuditProfile from "@components/Audits/AuditProfile";
import { config } from "@lib/utilities";
import {useRouter } from "next/router";
import { useEffect } from "react";

const Audit = (props) => {
  const router = useRouter();
  useEffect(() => {
    document.documentElement.style.setProperty("--line-color", "#2102476c");
  }, []);

  if(props.audit !== null) return <AuditProfile audit={props.audit.data} />;
  else { if(typeof window !== "undefined") router.push("/404"); }

};

export async function getServerSideProps(context) {
  const address = context.query.address;
  const res = await fetch(`${config}/audits/${address}`);
  const audit = await res.json();

  if(audit.data === undefined) return { props: { audit: null } };
  return { props: { audit } };
}

export default Audit;
