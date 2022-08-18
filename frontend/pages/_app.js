import { ChakraProvider } from "@chakra-ui/react";
import {
  RainbowKitProvider,
  getDefaultWallets,
  midnightTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";
import theme from "@styles/theme";
import NavBar from "@components/NavBar/NavBar";
import "@styles/globals.scss";
import "@styles/colors.scss";
import "@rainbow-me/rainbowkit/styles.css";

const { chains, provider } = configureChains(
  [
    // chain.polygon,
    chain.polygonMumbai,
  ],
  [
    jsonRpcProvider({
      rpc: () => {
        return {
          http: "https://rpc.ankr.com/polygon_mumbai",
        };
      },
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "DEAudit",
  chains,
});

const appInfo = {
  appName: "DEAudit",
};

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const rainbowTheme = midnightTheme();
rainbowTheme.fonts.body = "Aeonik Light";
rainbowTheme.colors.accentColorForeground = "black";
rainbowTheme.colors.accentColor = "white";

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        appInfo={appInfo}
        chains={chains}
        theme={rainbowTheme}
        coolMode
      >
        <ChakraProvider theme={theme}>
          <NavBar />
          <Component {...pageProps} />
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
