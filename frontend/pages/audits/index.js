import React from "react";
import Head from "next/head";
import Audits from "@components/Audits/Audits";

const audits = () => {
  return(
  <>
    <Head>
      <title>Audits</title>
    </Head>
    <Audits />
  </>
  )
};

export default audits;
