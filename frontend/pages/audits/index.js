import React from "react";
import Head from "next/head";
import Audits from "@components/Audits/Audits";

const audits = () => {
  // Dummy data, fetch audits here.
  const audits = [
    {
      id: 1,
      name: "AuditDAO",
      address: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
      creator: "0x3b5e3af9c9c6c5dcd09cef8f3d3c9c74d9ac2a2a",
      bugs: 2,
      createdAt: "2020-01-01",
      poolSizes: {
        NoBug: "5.3",
        YesBug: "2.1",
      },
    },
  ];
  return (
    <>
      <Head>
        <title>Audits</title>
      </Head>
      <Audits audits={audits} />
    </>
  );
};

export default audits;
