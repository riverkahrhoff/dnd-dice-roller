import { Box, Heading, HStack, Image } from "@chakra-ui/react";
import logo from "../assets/d203.png";
import TextColorButton from "./TextColorButton";

const NavBar = () => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={100}
      bg={"rgba(255, 255, 255, 0.5)"}
      color="black"
    >
      <HStack padding="10px" justifyContent="space-between" alignItems="center">
        {/* Empty box for left side to balance the layout */}
        <Box width="40px" />

        {/* Center content */}
        <HStack>
          <Image src={logo} height="50px" fit="cover" />
          <Heading fontSize="30px" fontWeight="thin">
            Dice Vault
          </Heading>
        </HStack>

        {/* Right side button */}
        <Box>
          <TextColorButton />
        </Box>
      </HStack>
    </Box>
  );
};

export default NavBar;
