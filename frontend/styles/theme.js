import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const styles = {
  global: (props) => ({
    body: {
      bg: mode("gray.100", "#170505")(props),
    },
  }),
};

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const colors = {};

const components = {
  Button: {
    baseStyle: {
      _focus: {
        boxShadow: "none",
      },
    },
  },
  Link: {
    baseStyle: {
      _focus: { boxShadow: "none" },
      _hover: {
        textDecoration: "none",
        color: "inherit",
      },
    },
  },
};

const theme = extendTheme({ styles, config, components, colors });

export default theme;
