import {
  Box,
  Heading,
  Flex,
  Button,
  Link,
  Text,
  HStack,
} from "@chakra-ui/react";
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
          fontSize="6xl"
          letterSpacing="1px"
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
        <HStack spacing="4" my="6" w="30vw">
          <Link href="/audits" textDecor="none">
            <Button
              background="red.900"
              variant="solid"
              color="red.100"
              borderColor="red"
              rounded="3xl"
              borderStyle="solid"
              px="20px"
              py="5"
              letterSpacing="0.5px"
              size="lg"
              fontFamily="Space Grotesk"
              fontSize="lg"
              _active={{
                border: "white",
                bg: "transparent",
                borderWidth: "1px",
                borderStyle: "solid",
              }}
              _hover={{
                transform: "scale(1.05)",
              }}
            >
              Audits
            </Button>
          </Link>
          <Link href="/users" textDecor="none">
            <Button
              background="transparent"
              color="white"
              rounded="3xl"
              border="1px solid #f2b4b4;"
              px="20px"
              py="5"
              letterSpacing="0.5px"
              size="lg"
              fontFamily="Space Grotesk"
              fontSize="lg"
              _active={{
                border: "white",
                bg: "transparent",
                borderWidth: "1px",
                borderStyle: "solid",
              }}
              _hover={{
                transform: "scale(1.05)",
              }}
            >
              Users
            </Button>
          </Link>
        </HStack>
      </Flex>
      <Box w="55vw">
        <Lottie options={defaultOptions} width={500} />
      </Box>
    </Flex>
  );
};

export default Landing;
