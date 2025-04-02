import { Stack, Button } from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode";

export type RollType = "normal" | "advantage" | "disadvantage";

interface Props {
  rollType: RollType;
  onRollTypeChange: (type: RollType) => void;
}

const AdvantageDisadvantage = ({ rollType, onRollTypeChange }: Props) => {
  const { colorMode } = useColorMode();

  return (
    <Stack
      direction={{ base: "column", sm: "row" }}
      gap={2}
      alignItems="center"
      justifyContent="center"
      width="100%"
    >
      <Button
        onClick={() => onRollTypeChange("advantage")}
        style={{
          minWidth: "100px",
          height: "40px",
          borderRadius: "20px",
          fontSize: "1rem",
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
            colorMode === "light" ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)"
          }`,
          transform: rollType === "advantage" ? "scale(1.05)" : "scale(1)",
          transition: "all 0.2s ease",
        }}
      >
        Advantage
      </Button>

      <Button
        onClick={() => onRollTypeChange("normal")}
        style={{
          minWidth: "100px",
          height: "40px",
          borderRadius: "20px",
          fontSize: "1rem",
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
            colorMode === "light" ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)"
          }`,
          transform: rollType === "normal" ? "scale(1.05)" : "scale(1)",
          transition: "all 0.2s ease",
        }}
      >
        Normal
      </Button>

      <Button
        onClick={() => onRollTypeChange("disadvantage")}
        style={{
          minWidth: "100px",
          height: "40px",
          borderRadius: "20px",
          fontSize: "1rem",
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
            colorMode === "light" ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)"
          }`,
          transform: rollType === "disadvantage" ? "scale(1.05)" : "scale(1)",
          transition: "all 0.2s ease",
        }}
      >
        Disadvantage
      </Button>
    </Stack>
  );
};

export default AdvantageDisadvantage;
