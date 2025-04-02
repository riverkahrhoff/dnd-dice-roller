import { useState, useCallback, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode";
import { motion } from "framer-motion";

const DiceRollerNew = () => {
  const [diceNumber, setDiceNumber] = useState(20);
  const [modifier, setModifier] = useState(0);
  const [rollTotal, setRollTotal] = useState<number | null>(null);
  const [bgColor, setBgColor] = useState("#006400"); // Darker green default
  const [hasRolled, setHasRolled] = useState(false);
  const { colorMode } = useColorMode();

  const dice = [4, 6, 8, 10, 12, 20];

  useEffect(() => {
    const savedColor = localStorage.getItem("bgColor");
    if (savedColor) {
      setBgColor(savedColor);
    }
  }, []);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setBgColor(newColor);
    localStorage.setItem("bgColor", newColor);
  };

  const handleRoll = useCallback(() => {
    const rollTotal = Math.floor(Math.random() * diceNumber) + 1 + modifier;
    setRollTotal(rollTotal);
    setHasRolled(true);
  }, [diceNumber, modifier]);

  const MotionBox = motion(Box);

  return (
    <div className="p-4 min-vh-100" style={{ backgroundColor: bgColor }}>
      <Stack direction="column" pt={24} gap={8} alignItems="center">
        {/* Dice Selection */}
        <Box
          bg={
            colorMode === "light"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.2)"
          }
          p={6}
          borderRadius="xl"
          backdropFilter="blur(10px)"
          boxShadow="lg"
          width="100%"
          maxW="600px"
        >
          <Stack direction="column" gap={4}>
            <Heading
              size="md"
              className={`text-${colorMode === "light" ? "dark" : "light"}`}
            >
              Choose Your Dice
            </Heading>
            <Stack
              direction="row"
              gap={3}
              flexWrap="wrap"
              justifyContent="center"
            >
              {dice.map((die, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    className="btn-check"
                    name="options-base"
                    id={`option-${index}`}
                    autoComplete="off"
                    value={die}
                    checked={diceNumber === die}
                    onChange={(e) => setDiceNumber(Number(e.target.value))}
                  />
                  <label
                    className={`btn btn-outline-${
                      colorMode === "light" ? "dark" : "light"
                    } rounded-circle`}
                    htmlFor={`option-${index}`}
                    style={{
                      width: "60px",
                      height: "60px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    D{die}
                  </label>
                </div>
              ))}
            </Stack>
          </Stack>
        </Box>

        {/* Modifier Input */}
        <Box
          bg={
            colorMode === "light"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.2)"
          }
          p={6}
          borderRadius="xl"
          backdropFilter="blur(10px)"
          boxShadow="lg"
          width="100%"
          maxW="600px"
        >
          <Stack direction="column" gap={4}>
            <Heading
              size="md"
              className={`text-${colorMode === "light" ? "dark" : "light"}`}
            >
              Modifier
            </Heading>
            <div className="input-group">
              <span
                className={`input-group-text text-${
                  colorMode === "light" ? "dark" : "light"
                } border-${colorMode === "light" ? "dark" : "light"}`}
                style={{ backgroundColor: "transparent" }}
              >
                +/-
              </span>
              <input
                type="number"
                className={`form-control text-${
                  colorMode === "light" ? "dark" : "light"
                } border-${colorMode === "light" ? "dark" : "light"}`}
                style={{ backgroundColor: "transparent" }}
                placeholder="Enter modifier"
                value={modifier}
                onChange={(e) => setModifier(Number(e.target.value))}
              />
            </div>
          </Stack>
        </Box>

        {/* Roll Button and Result */}
        <Stack direction="column" gap={6} alignItems="center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`btn btn-${
              colorMode === "light" ? "dark" : "light"
            } btn-lg px-5 py-3`}
            onClick={handleRoll}
            style={{
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              fontSize: "1.5rem",
            }}
          >
            Roll
          </motion.button>

          <MotionBox
            initial={false}
            animate={{
              scale: hasRolled ? 1 : 0.5,
              opacity: hasRolled ? 1 : 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Heading
              size="2xl"
              className={`mt-3 text-${
                colorMode === "light" ? "dark" : "light"
              }`}
            >
              {rollTotal !== null ? rollTotal : "-"}
            </Heading>
          </MotionBox>
        </Stack>

        {/* Background Color */}
        <Box
          bg={
            colorMode === "light"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.2)"
          }
          p={6}
          borderRadius="xl"
          backdropFilter="blur(10px)"
          boxShadow="lg"
          width="100%"
          maxW="600px"
        >
          <Stack direction="column" gap={4} alignItems="center">
            <Text
              className={`text-${colorMode === "light" ? "dark" : "light"}`}
            >
              Background Color
            </Text>
            <input
              type="color"
              value={bgColor}
              onChange={handleColorChange}
              className="form-control form-control-color"
              style={{ width: "100px", height: "50px" }}
            />
          </Stack>
        </Box>
      </Stack>
    </div>
  );
};

export default DiceRollerNew;
