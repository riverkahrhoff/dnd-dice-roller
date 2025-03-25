import { Box, Heading, HStack, Image } from "@chakra-ui/react";
import logo from "../assets/d203.png";

const NavBar = () => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={100}
      bg={"rgba(255, 255, 255, 0.8)"}
      color="black"
      textAlign="center"
    >
      {" "}
      <HStack padding="10px" justifyContent="center" wrap="wrap">
        <HStack>
          <Image src={logo} height="50px" fit="cover" />

          <Heading fontSize="30px" fontWeight="thin">
            Dice Vault
          </Heading>
        </HStack>
      </HStack>
    </Box>
  );
};

export default NavBar;
