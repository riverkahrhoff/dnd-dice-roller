import { Box, Heading, Stack } from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode";

interface DiceSelection {
  die: number;
  quantity: number;
}

interface Props {
  selectedDice: DiceSelection[];
  onDiceClick: (die: number) => void;
  onDiceRemove: (die: number) => void;
}

const DiceSelectionComponent = ({
  selectedDice,
  onDiceClick,
  onDiceRemove,
}: Props) => {
  const { colorMode } = useColorMode();
  const dice = [4, 6, 8, 10, 12, 20];

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
          Choose Your Dice
        </Heading>
        <Stack direction="row" gap={2} flexWrap="wrap" justifyContent="center">
          {dice.map((die, index) => {
            const selected = selectedDice.find((d) => d.die === die);
            return (
              <div key={index} style={{ position: "relative" }}>
                <button
                  className={`dice-btn btn btn-outline-${
                    colorMode === "light" ? "dark" : "light"
                  } rounded-circle`}
                  onClick={() => onDiceClick(die)}
                  style={{
                    width: "80px",
                    height: "80px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    background: selected
                      ? colorMode === "light"
                        ? "rgba(0, 0, 0, 0.2)"
                        : "rgba(255, 255, 255, 0.2)"
                      : "transparent",
                    border: `3px solid ${
                      colorMode === "light"
                        ? "rgba(0,0,0,0.3)"
                        : "rgba(255,255,255,0.3)"
                    }`,
                    transform: selected ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  <span>D{die}</span>
                  {selected && (
                    <span
                      style={{
                        fontSize: "1rem",
                        marginTop: "-5px",
                        opacity: 0.8,
                      }}
                    >
                      ×{selected.quantity}
                    </span>
                  )}
                </button>
                {selected && (
                  <button
                    className="btn position-absolute remove-btn"
                    style={{
                      top: "-12px",
                      right: "-12px",
                      width: "28px",
                      height: "28px",
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      fontSize: "1rem",
                      background:
                        colorMode === "light"
                          ? "rgba(0, 0, 0, 0.6)"
                          : "rgba(255, 255, 255, 0.6)",
                      color: colorMode === "light" ? "#fff" : "#000",
                      border: `2px solid ${
                        colorMode === "light"
                          ? "rgba(0,0,0,0.3)"
                          : "rgba(255,255,255,0.3)"
                      }`,
                      backdropFilter: "blur(5px)",
                      transition: "all 0.2s ease",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDiceRemove(die);
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
            );
          })}
        </Stack>
      </Stack>
    </Box>
  );
};

export default DiceSelectionComponent;
