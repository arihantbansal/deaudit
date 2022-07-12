import { Flex } from "@chakra-ui/react";
import Landing from "@components/Landing/Landing";
import dynamic from "next/dynamic";
import styles from "../styles/Main.module.css";
import { StateProvider } from "../contexts/StateContext";
const Modal = dynamic(() => import("../components/Modal/Modal.jsx"), {
  ssr: false,
});

export default function Home() {
  return (
    <StateProvider>
      <Flex flexDir="column" className={styles.container}>
        <Flex h="100vh" w="100%" flexDir="column" className={styles.child}>
          <Modal />
          <Landing />
        </Flex>
      </Flex>
    </StateProvider>
  );
}
