import { ChakraProvider } from "@chakra-ui/react";
import theme from "@styles/theme";
import dynamic from "next/dynamic.js";
import { StateProvider } from "contexts/StateContext";
import "@styles/globals.scss";
const Modal = dynamic(() => import("../components/Modal/Modal.jsx"), {
  ssr: false,
});
import {
  createClient,
  configureChains,
  defaultChains,
  WagmiConfig,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const { provider, webSocketProvider } = configureChains(defaultChains, [
  publicProvider(),
]);

const client = createClient({
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={client}>
      <StateProvider>
        <ChakraProvider theme={theme}>
          <Modal />
          <Component {...pageProps} />
        </ChakraProvider>
      </StateProvider>
    </WagmiConfig>
  );
}

export default MyApp;
