import { Box, Heading, Stack } from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode";

interface Props {
  modifier: number;
  onModifierChange: (value: number) => void;
}

const ModifierInput = ({ modifier, onModifierChange }: Props) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      bg={
        colorMode === "light"
          ? "rgba(255, 255, 255, 0.2)"
          : "rgba(0, 0, 0, 0.3)"
      }
      p={3}
      borderRadius="3xl"
      backdropFilter="blur(10px)"
      boxShadow={`0 8px 32px ${
        colorMode === "light" ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.4)"
      }`}
      width="100%"
      maxW="600px"
      style={{
        transform: "translateZ(0)",
        border: `2px solid ${
          colorMode === "light"
            ? "rgba(255,255,255,0.3)"
            : "rgba(255,255,255,0.1)"
        }`,
      }}
    >
      <Stack direction="column" gap={2}>
        <Heading
          size="md"
          className={`text-${
            colorMode === "light" ? "dark" : "light"
          } text-center`}
          style={{
            textShadow: `0 2px 4px ${
              colorMode === "light" ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.4)"
            }`,
          }}
        >
          Modifier
        </Heading>
        <div
          className="input-group justify-content-center"
          style={{ maxWidth: "250px", margin: "0 auto" }}
        >
          <button
            type="button"
            className="dice-btn btn"
            onClick={() => onModifierChange(modifier - 1)}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "15px",
              fontSize: "1.5rem",
              background:
                colorMode === "light"
                  ? "rgba(0, 0, 0, 0.2)"
                  : "rgba(255, 255, 255, 0.2)",
              border: `3px solid ${
                colorMode === "light"
                  ? "rgba(0,0,0,0.3)"
                  : "rgba(255,255,255,0.3)"
              }`,
              color: colorMode === "light" ? "#000" : "#fff",
            }}
          >
            -
          </button>
          <input
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            className={`form-control text-center text-${
              colorMode === "light" ? "dark" : "light"
            } modifier-input`}
            style={{
              width: "80px",
              height: "50px",
              fontSize: "1.5rem",
              fontWeight: "bold",
              margin: "0 10px",
              background:
                colorMode === "light"
                  ? "rgba(0, 0, 0, 0.1)"
                  : "rgba(255, 255, 255, 0.1)",
              border: `3px solid ${
                colorMode === "light"
                  ? "rgba(0,0,0,0.3)"
                  : "rgba(255,255,255,0.3)"
              }`,
              borderRadius: "15px",
              boxShadow: "none",
              padding: "0",
              textAlign: "center",
            }}
            value={modifier}
            onChange={(e) => {
              const val = e.target.value === "" ? 0 : parseInt(e.target.value);
              onModifierChange(isNaN(val) ? 0 : val);
            }}
          />
          <button
            type="button"
            className="dice-btn btn"
            onClick={() => onModifierChange(modifier + 1)}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "15px",
              fontSize: "1.5rem",
              background:
                colorMode === "light"
                  ? "rgba(0, 0, 0, 0.2)"
                  : "rgba(255, 255, 255, 0.2)",
              border: `3px solid ${
                colorMode === "light"
                  ? "rgba(0,0,0,0.3)"
                  : "rgba(255,255,255,0.3)"
              }`,
              color: colorMode === "light" ? "#000" : "#fff",
            }}
          >
            +
          </button>
        </div>
      </Stack>
    </Box>
  );
};

export default ModifierInput;
