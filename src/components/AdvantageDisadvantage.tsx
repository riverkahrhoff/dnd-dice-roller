import { Stack, Button, Box } from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode";

export type RollType = "normal" | "advantage" | "disadvantage";

interface Props {
  rollType: RollType;
  onRollTypeChange: (type: RollType) => void;
}

const AdvantageDisadvantage = ({ rollType, onRollTypeChange }: Props) => {
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
      <Stack
        direction="row"
        gap={2}
        alignItems="center"
        justifyContent="center"
        width="100%"
      >
        <Button
          onClick={() => onRollTypeChange("disadvantage")}
          minW={{ base: "80px", sm: "120px" }}
          h={{ base: "35px", sm: "40px" }}
          fontSize={{ base: "0.75rem", sm: "1rem" }}
          px={{ base: 1, sm: 4 }}
          style={{
            borderRadius: "20px",
            fontWeight: "bold",
            background:
              rollType === "disadvantage"
                ? colorMode === "light"
                  ? "rgba(0, 0, 0, 0.8)"
                  : "rgba(255, 255, 255, 0.8)"
                : colorMode === "light"
                ? "rgba(0, 0, 0, 0.2)"
                : "rgba(255, 255, 255, 0.2)",
            color:
              rollType === "disadvantage"
                ? colorMode === "light"
                  ? "#fff"
                  : "#000"
                : colorMode === "light"
                ? "#000"
                : "#fff",
            border: `2px solid ${
              colorMode === "light"
                ? "rgba(0,0,0,0.3)"
                : "rgba(255,255,255,0.3)"
            }`,
            transform: rollType === "disadvantage" ? "scale(1.05)" : "scale(1)",
            transition: "all 0.2s ease",
          }}
        >
          Disadvantage
        </Button>

        <Button
          onClick={() => onRollTypeChange("normal")}
          minW={{ base: "70px", sm: "100px" }}
          h={{ base: "35px", sm: "40px" }}
          fontSize={{ base: "0.75rem", sm: "1rem" }}
          px={{ base: 1, sm: 4 }}
          style={{
            borderRadius: "20px",
            fontWeight: "bold",
            background:
              rollType === "normal"
                ? colorMode === "light"
                  ? "rgba(0, 0, 0, 0.8)"
                  : "rgba(255, 255, 255, 0.8)"
                : colorMode === "light"
                ? "rgba(0, 0, 0, 0.2)"
                : "rgba(255, 255, 255, 0.2)",
            color:
              rollType === "normal"
                ? colorMode === "light"
                  ? "#fff"
                  : "#000"
                : colorMode === "light"
                ? "#000"
                : "#fff",
            border: `2px solid ${
              colorMode === "light"
                ? "rgba(0,0,0,0.3)"
                : "rgba(255,255,255,0.3)"
            }`,
            transform: rollType === "normal" ? "scale(1.05)" : "scale(1)",
            transition: "all 0.2s ease",
          }}
        >
          Normal
        </Button>

        <Button
          onClick={() => onRollTypeChange("advantage")}
          minW={{ base: "80px", sm: "120px" }}
          h={{ base: "35px", sm: "40px" }}
          fontSize={{ base: "0.75rem", sm: "1rem" }}
          px={{ base: 1, sm: 4 }}
          style={{
            borderRadius: "20px",
            fontWeight: "bold",
            background:
              rollType === "advantage"
                ? colorMode === "light"
                  ? "rgba(0, 0, 0, 0.8)"
                  : "rgba(255, 255, 255, 0.8)"
                : colorMode === "light"
                ? "rgba(0, 0, 0, 0.2)"
                : "rgba(255, 255, 255, 0.2)",
            color:
              rollType === "advantage"
                ? colorMode === "light"
                  ? "#fff"
                  : "#000"
                : colorMode === "light"
                ? "#000"
                : "#fff",
            border: `2px solid ${
              colorMode === "light"
                ? "rgba(0,0,0,0.3)"
                : "rgba(255,255,255,0.3)"
            }`,
            transform: rollType === "advantage" ? "scale(1.05)" : "scale(1)",
            transition: "all 0.2s ease",
          }}
        >
          Advantage
        </Button>
      </Stack>
    </Box>
  );
};

export default AdvantageDisadvantage;
