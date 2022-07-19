import Four0Four from "@components/Four0Four/Four0Four";
import React, { useEffect } from "react";

const UhOh = () => {
  useEffect(() => {
    document.documentElement.style.setProperty("--line-color", "#0364526c");
    document.documentElement.style.setProperty("--button-color", "#C4F1F9");
  }, []);

  return <Four0Four />;
};

export default UhOh;
