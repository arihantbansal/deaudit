import Audit from "@components/NewAudit/NewAudit";
import React from "react";
import { useEffect } from "react";

const NewAudit = () => {
  useEffect(() => {
    document.documentElement.style.setProperty("--line-color", "#92b39c2a");
  }, []);
  return <Audit />;
};

export default NewAudit;
