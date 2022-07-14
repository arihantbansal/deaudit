import { ChakraProvider } from "@chakra-ui/react";
import theme from "@styles/theme";
import dynamic from "next/dynamic.js";
import { StateProvider } from "contexts/StateContext";
import "@styles/globals.scss";
const Modal = dynamic(() => import("../components/Modal/Modal.jsx"), {
  ssr: false,
});

function MyApp({ Component, pageProps }) {
  return (
    <StateProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </StateProvider>
  );
}

export default MyApp;
