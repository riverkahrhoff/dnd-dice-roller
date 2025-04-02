import { Box, Heading, HStack, Image } from "@chakra-ui/react";
import logo from "../assets/d203.png";
import TextColorButton from "./TextColorButton";
import { useEffect, useState } from "react";

const NavBar = () => {
  const [bgColor, setBgColor] = useState("#006400");

  // Function to apply background color
  const applyBackgroundColor = (color: string) => {
    document
      .querySelector(".min-vh-100")
      ?.setAttribute("style", `background-color: ${color}`);
  };

  useEffect(() => {
    const savedColor = localStorage.getItem("bgColor");
    if (savedColor) {
      setBgColor(savedColor);
      applyBackgroundColor(savedColor);
    } else {
      // Apply default color if no saved color exists
      applyBackgroundColor(bgColor);
    }
  }, []);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setBgColor(newColor);
    localStorage.setItem("bgColor", newColor);
    applyBackgroundColor(newColor);
  };

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
        {/* Left side color picker */}
        <Box>
          <input
            type="color"
            value={bgColor}
            onChange={handleColorChange}
            className="form-control form-control-color"
            style={{
              width: "40px",
              height: "40px",
              padding: "2px",
              cursor: "pointer",
            }}
            title="Choose background color"
          />
        </Box>

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
