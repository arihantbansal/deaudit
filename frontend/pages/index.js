import { Container } from "@chakra-ui/react";
import dynamic from "next/dynamic";
const Modal = dynamic(() => import("../components/Modal/Modal"), {
  ssr: false,
});

export default function Home() {
  return (
    <Container paddingY="6">
      <Modal />
    </Container>
  );
}
