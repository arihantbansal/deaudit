import { Box, Heading, Flex, Button, Link, Text } from "@chakra-ui/react";
import Lottie from "react-lottie";
import styles from "../../styles/Landing.module.scss";
import blockchain from "../../public/assets/blockchain.json";

const Landing = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: blockchain,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Flex
      w="100vw"
      h="85vh"
      flexDirection="row"
      alignItems="center"
      className="home"
      mt="20"
    >
      <Flex
        flexDirection="column"
        w="53vw"
        ml="20"
        justifyContent="space-evenly"
        alignItems="left"
      >
        <Heading
          fontFamily="Space Mono"
          fontSize="6xl"
          letterSpacing="1.2"
          fontWeight="bold"
          display="flex"
          className={styles.heading}
          my="6"
        >
          The Decentralized Audit Marketplace.
        </Heading>
        <Text
          fontSize="xl"
          fontFamily="Space Mono"
          letterSpacing="-0.5px"
          fontWeight="normal"
          lineHeight="1.5"
          my="2"
        >
          Digital marketplace for requesting, creating <br /> and applying for
          auditing proposals.
        </Text>
        <Link href="/explore" textDecor="none">
          <Button
            fontFamily="Space Grotesk"
            bg="red.900"
            variant="solid"
            my="6"
            color="white"
            borderColor="red.900"
            borderRadius="30px"
            borderStyle="solid"
            borderWidth="1px"
            letterSpacing="0.5px"
            size="lg"
            fontSize="lg"
            _active={{
              bg: "transparent",
              border: "white",
              borderWidth: "1px",
              borderStyle: "solid",
            }}
            _hover={{
              bg: "red.700",
              textDecoration: "none",
            }}
          >
            Explore Marketplace
          </Button>
        </Link>
      </Flex>
      <Box w="55vw">
        <Lottie options={defaultOptions} width={500} />
      </Box>
    </Flex>
  );
};

export default Landing;
