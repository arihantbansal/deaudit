import { Box, Image } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const NavBar = () => {
  return (
    <Box display="flex" direction="row" justifyContent="space-between">
      <Image boxSize="40px" src="assets/polygonlogo.png" alt="Bug" />
      <ConnectButton chainStatus={"icon"} />
    </Box>
  );
};

export default NavBar;
