import Audit from "@components/NewAudit/NewAudit";
import { useEffect } from "react";

const NewAudit = () => {
  useEffect(() => {
    document.documentElement.style.setProperty("--line-color", "#f764A634");
    document.documentElement.style.setProperty("--button-color", "#FED7E2");
  }, []);
  return <Audit />;
};

export default NewAudit;
