import Four0Four from "@components/Four0Four/Four0Four";
import React, { useEffect } from "react";

const UhOh = () => {
  useEffect(() => {
    document.documentElement.style.setProperty("--line-color", "#0364526c");
  }, []);

  return <Four0Four />;
};

export default UhOh;
