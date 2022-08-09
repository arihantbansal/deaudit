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
      juryMembers: [
        "0xA0C6dFF0CD9d034Ddb9fE46F9B9AeFbeC9EA4358F",
        "0x95Fce0ECfc530cfbfaA70D8644a8De8E12De723e",
        "0xA0C6dFF0CD9d034Ddb9fE46F9B9AeFbeC9EA4358F",
      ],
      bugs: [
        {
          userAddress: "0xA0C6dFF0CD9d034Ddb9fE46F9B9AeFbeC9EA4358F",
          description: "Not ownable",
          verified: true,
        },
        {
          userAddress: "0x95Fce0ECfc530cfbfaA70D8644a8De8E12De723e",
          description: "Can use OpenZeppelin to ensure reusability",
          verified: false,
        },
        {
          userAddress: "0xaC6dFF0CD9d034Ddb9fE46F9B9AeFbeC9EA4358F",
          description: "Would be better to implement ERC1155 instead of 721",
          verified: true,
        },
      ],
      createdAt: "2020-01-01",
      poolSizes: {
        NoBug: "5.3",
        YesBug: "2.1",
      },
      tags: ["erc721", "polygon"],
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
