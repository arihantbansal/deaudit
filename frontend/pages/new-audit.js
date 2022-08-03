import Audit from "@components/NewAudit/NewAudit";
import { useEffect } from "react";

const NewAudit = () => {
  useEffect(() => {
    document.documentElement.style.setProperty("--line-color", "#f764A634");
  }, []);
  return <Audit />;
};

export default NewAudit;
