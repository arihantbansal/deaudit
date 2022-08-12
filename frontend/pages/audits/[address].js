import AuditProfile from "@components/Audits/AuditProfile";
import { config } from "@lib/utilities";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Audit = (props) => {
  const router = useRouter();
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--line-color",
      "rgba(65, 3, 3, 0.351)"
    );
  }, []);

  console.log(props);
  if (props.audit !== null)
    return <AuditProfile audit={props.audit.data} bugs={props.bugList.data} />;
  else {
    if (typeof window !== "undefined") router.push("/404");
  }
};

export async function getServerSideProps(context) {
  const address = context.query.address;

  const [auditsRes, bugsRes] = await Promise.all([
    fetch(`${config}/audits/${address}`),
    fetch(`${config}/bugs/audits/${address}`),
  ]);

  const [audit, bugList] = await Promise.all([
    auditsRes.json(),
    bugsRes.json(),
  ]);

  if (audit.data === undefined) return { props: { audit: null } };
  else return { props: { audit, bugList } };
}

export default Audit;
