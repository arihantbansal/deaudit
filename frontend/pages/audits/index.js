import React from "react";
import Head from "next/head";
import Audits from "@components/Audits/Audits";
import { config } from "@lib/utilities";

const audits = (props) => {
  return (
    <>
      <Head>
        <title>Audits</title>
      </Head>
      <Audits audits={props.auditList.data} />
    </>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch(`${config}/audits/`);
  const auditList = await res.json();

  return {
    props: {
      auditList,
    },
  };
};

export default audits;
