import { ChakraProvider } from "@chakra-ui/react";
import theme from "@styles/theme";
import dynamic from "next/dynamic";
import { StateProvider } from "contexts/StateContext";
import "@styles/globals.scss";
import "@styles/colors.scss";
// const Modal = dynamic(() => import("../components/Modal/Modal.jsx"), {
//   ssr: false,
// });
import {
  createClient,
  configureChains,
  defaultChains,
  WagmiConfig,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import Modal from "@components/Modal/Modal";

const { provider, webSocketProvider } = configureChains(defaultChains, [
  publicProvider(),
]);

const client = createClient({
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }) {
  return (
    <StateProvider>
      <WagmiConfig client={client}>
        <ChakraProvider theme={theme}>
          <Modal />
          <Component {...pageProps} />
        </ChakraProvider>
      </WagmiConfig>
    </StateProvider>
  );
}

export default MyApp;
