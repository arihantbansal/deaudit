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
    document.documentElement.style.setProperty("--button-color", "#fed7d7");
  }, []);

  return (
    <Flex flexDir="column" className={styles.container}>
      <Flex h="100vh" w="100%" flexDir="column" className={styles.child}>
        <Landing />
      </Flex>
    </Flex>
  );
};

export default Home;
