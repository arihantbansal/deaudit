import { Flex } from "@chakra-ui/react";
import Landing from "@components/Landing/Landing";
import { useEffect } from "react";
import styles from "../styles/Main.module.scss";

const Home = () => {
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--line-color",
      "rgba(65, 3, 3, 0.351)"
    );
  }, []);

  return <Landing />;
};

export default Home;
