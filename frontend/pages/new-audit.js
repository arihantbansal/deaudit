import Audit from "@components/NewAudit/NewAudit";
import { useEffect } from "react";

const NewAudit = () => {
  useEffect(() => {
    document.documentElement.style.setProperty("--line-color", "#16de5222");
  }, []);
  return <Audit />;
};

export default NewAudit;
