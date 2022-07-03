import { extendTheme } from "@chakra-ui/react";

const config = {
	initialColorMode: "dark",
	useSystemColorMode: false,
};

const colors = {
	// brand: {
	// 	500: "#FFD600",
	// },
};

const components = {
	// Button: {
	// 	baseStyle: {
	// 		_focus: {
	// 			boxShadow: "none",
	// 		},
	// 	},
	// 	defaultProps: {
	// 		// colorScheme: "gray",
	// 		// variant: "ghost",
	// 	},
	// },
};

const theme = extendTheme({ config, components, colors });

export default theme;
