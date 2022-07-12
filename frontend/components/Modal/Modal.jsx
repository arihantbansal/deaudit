import Head from "next/head";
import { providers } from "ethers";
import { sequence } from "0xsequence";
import WalletLink from "walletlink";
import { useCallback, useContext, useEffect, useReducer } from "react";
import Web3Modal from "web3modal";
import { ellipseAddress, getChainData } from "../../lib/utilities";
import { Button, Flex, Heading, Text, useToast } from "@chakra-ui/react";
import { StateContext } from "../../contexts/StateContext";

let providerOptions = {
  "custom-walletlink": {
    display: {
      logo: "https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0",
      name: "Coinbase",
      description: "Connect to the Coinbase Wallet",
    },
    package: WalletLink,
    connector: async (_, options) => {
      const { appName, networkUrl, chainId } = options;
      const walletLink = new WalletLink({
        appName,
      });
      const provider = walletLink.makeWeb3Provider(networkUrl, chainId);
      await provider.enable();
      return provider;
    },
  },
};

if (!window?.ethereum?.isSequence) {
  providerOptions = {
    ...providerOptions,
    sequence: {
      package: sequence,
      options: {
        appName: "Deaudit",
        defaultNetwork: "mumbai",
      },
    },
  };
}

let web3Modal;
if (window) {
  web3Modal = new Web3Modal({
    network: "testnet",
    cacheProvider: true,
    theme: {
      background: "#eee2e2",
      border: "#170505",
      main: "#170505",
      secondary: "#000",
    },
    providerOptions,
  });
}

const Modal = () => {
  const toast = useToast();
  const [{ provider, web3Provider, address, chainId }, dispatch] =
    useContext(StateContext);

  const connect = async () => {
    const provider = await web3Modal.connect();
    const web3Provider = new providers.Web3Provider(provider);

    const signer = web3Provider.getSigner();
    const address = await signer.getAddress();

    const network = await web3Provider.getNetwork();

    if (network.chainId === 80001) {
      dispatch({
        type: "SET_WEB3_PROVIDER",
        provider,
        web3Provider,
        address,
        chainId: network.chainId,
      });
      toast({
        title: "Success",
        description: "Connected to the Mumbai Testnet.",
        status: "success",
        variant: "left-accent",
        duration: 1500,
        position: "bottom-right",
      });
    } else {
      toast({
        title: "Error",
        description: "Please choose the Mumbai Testnet in MetaMask.",
        status: "error",
        variant: "left-accent",
        duration: 3000,
        position: "bottom-right",
      });
    }
  };

  const disconnect = useCallback(
    async () => {
      await web3Modal.clearCachedProvider();
      if (provider?.disconnect && typeof provider.disconnect === "function") {
        await provider.disconnect();
      }
      dispatch({
        type: "RESET_WEB3_PROVIDER",
      });
    },
    [provider,dispatch]
  );

  // Auto connect to the cached provider
  const connectWeb3Modal = async () => {
    if (web3Modal.cachedProvider) {
      web3Modal.clearCachedProvider();
    }
    connect();
  };
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log("accountsChanged", accounts);
        dispatch({
          type: "SET_ADDRESS",
          address: accounts[0],
        });
      };

      const handleChainChanged = (_hexChainId) => {
        window.location.reload();
      };

      const handleDisconnect = (error) => {
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider, disconnect,dispatch]);

  const chainData = getChainData(chainId);

  return (
    <>
      <Head>
        <title>Deaudit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        bg="transparent"
        w="100%"
        height="15vh"
        backdropFilter="auto"
        backdropBlur="sm"
        backdropContrast="85%"
        position="fixed"
        top="0"
        left="0"
        alignItems="center"
        justifyContent="space-between"
        flexDir="row"
      >
        <Heading
          fontSize="5xl"
          p="3"
          ml="10"
          fontFamily="Geostar"
          letterSpacing="2px"
          color="white"
        >
          DEAUDIT
        </Heading>

        <Flex m="20" justifyContent="space-around" flexDir="row">
          {web3Provider ? (
            <Button
              fontFamily="Space Grotesk"
              bg="transparent"
              variant="solid"
              borderRadius="30px"
              borderWidth="1px"
              borderStyle="solid"
              borderColor="#fecaca"
              onClick={disconnect}
              color="white"
              w="fit-content"
              size="lg"
              fontSize="xl"
              padding={["10px", "20px"]}
              _hover={{
                bg: "transparent",
                color: "#fecaca",
              }}
            >
              Disconnect
            </Button>
          ) : (
            <Button
              fontFamily="Space Grotesk"
              bg="transparent"
              variant="solid"
              borderRadius="30px"
              borderWidth="1px"
              borderStyle="solid"
              borderColor="#fecaca"
              onClick={connectWeb3Modal}
              color="white"
              size="lg"
              padding={["10px", "20px"]}
              fontSize="xl"
              w="fit-content"
              _hover={{
                bg: "transparent",
                color: "#fecaca",
                border: "1px solid #fecaca",
              }}
            >
              Connect
            </Button>
          )}
        </Flex>
      </Flex>
      {address && (
        <Flex
          flexDir="row"
          mt="36"
          justifyContent="space-between"
          alignItems="center"
        >
          {chainData.name === "Error" ? null : (
            <>
              <Flex flexDir="column" gap="1" mx="20">
                <Heading fontSize="2xl" fontFamily="Space Mono">
                  Network:
                </Heading>
                <Text fontSize="lg" fontFamily="Didact Gothic">
                  {chainData.name}
                </Text>
              </Flex>
              <Flex flexDir="column" gap="1" mx="20">
                <Heading fontSize="2xl" fontFamily="Space Mono">
                  Address:
                </Heading>
                <Text
                  fontSize="lg"
                  fontFamily="Didact Gothic"
                  letterSpacing="1px"
                >
                  {ellipseAddress(address)}
                </Text>
              </Flex>
            </>
          )}
        </Flex>
      )}
    </>
  );
};

export default Modal;
