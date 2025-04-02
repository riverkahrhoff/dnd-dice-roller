import { FC } from "react";
import { Button } from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode";
import { BsSun, BsMoon } from "react-icons/bs";

const TextColorButton: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button
      onClick={toggleColorMode}
      bg={colorMode === "light" ? "black" : "white"}
      color={colorMode === "light" ? "white" : "black"}
      border="1px solid"
      borderColor={colorMode === "light" ? "white" : "black"}
      _hover={{
        opacity: 0.8,
      }}
      borderRadius="md"
      size={{ base: "xs", sm: "sm" }}
      p={{ base: 1, sm: 2 }}
      minW={{ base: "24px", sm: "32px" }}
      h={{ base: "24px", sm: "32px" }}
      aria-label={`Toggle ${colorMode === "light" ? "Dark" : "Light"} Mode`}
    >
      {colorMode === "light" ? <BsMoon size={16} /> : <BsSun size={16} />}
    </Button>
  );
};

export default TextColorButton;
