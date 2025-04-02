import { useState, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Box, Heading, Stack } from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode";

const DiceRollerNew = () => {
  const [diceNumber, setDiceNumber] = useState(20);
  const [modifier, setModifier] = useState(0);
  const [rollTotal, setRollTotal] = useState<number | null>(null);
  const [hasRolled, setHasRolled] = useState(false);
  const { colorMode } = useColorMode();

  const dice = [4, 6, 8, 10, 12, 20];

  const handleRoll = useCallback(() => {
    const rollTotal = Math.floor(Math.random() * diceNumber) + 1 + modifier;
    setRollTotal(rollTotal);
    setHasRolled(true);
  }, [diceNumber, modifier]);

  return (
    <div className="p-4 min-vh-100">
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
              <button
                type="button"
                className={`btn btn-outline-${
                  colorMode === "light" ? "dark" : "light"
                }`}
                onClick={() => setModifier((prev) => prev - 1)}
                style={{ backgroundColor: "transparent" }}
              >
                -
              </button>
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                className={`form-control text-center text-${
                  colorMode === "light" ? "dark" : "light"
                } border-${colorMode === "light" ? "dark" : "light"}`}
                style={{
                  backgroundColor: "transparent",
                  minWidth: "60px",
                  maxWidth: "100px",
                }}
                value={modifier}
                onChange={(e) => {
                  const val =
                    e.target.value === "" ? 0 : parseInt(e.target.value);
                  setModifier(isNaN(val) ? 0 : val);
                }}
              />
              <button
                type="button"
                className={`btn btn-outline-${
                  colorMode === "light" ? "dark" : "light"
                }`}
                onClick={() => setModifier((prev) => prev + 1)}
                style={{ backgroundColor: "transparent" }}
              >
                +
              </button>
            </div>
          </Stack>
        </Box>

        {/* Roll Button and Result */}
        <Stack direction="column" gap={6} alignItems="center">
          <button
            className={`btn btn-${
              colorMode === "light" ? "dark" : "light"
            } btn-lg px-5 py-3`}
            onClick={handleRoll}
            style={{
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              fontSize: "1.5rem",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Roll
          </button>

          <Box
            style={{
              opacity: hasRolled ? 1 : 0,
              transform: `scale(${hasRolled ? 1 : 0.5})`,
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}
          >
            <Heading
              size="2xl"
              className={`mt-3 text-${
                colorMode === "light" ? "dark" : "light"
              }`}
            >
              {rollTotal !== null ? rollTotal : "-"}
            </Heading>
          </Box>
        </Stack>
      </Stack>
    </div>
  );
};

export default DiceRollerNew;
