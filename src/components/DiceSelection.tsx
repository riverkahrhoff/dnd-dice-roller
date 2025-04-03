import { Box, Heading, Stack } from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode";
import DiceIcon from "./DiceIcon";
import { useEffect, useState } from "react";

interface DiceSelection {
  die: number;
  quantity: number;
}

interface Props {
  selectedDice: DiceSelection[];
  onDiceClick: (die: number) => void;
  onDiceRemove: (die: number) => void;
  isRolling?: boolean;
}

const DiceSelectionComponent = ({
  selectedDice,
  onDiceClick,
  onDiceRemove,
  isRolling = false,
}: Props) => {
  const { colorMode } = useColorMode();
  const dice = [4, 6, 8, 10, 12, 20];
  const [animatingDice, setAnimatingDice] = useState<boolean>(false);

  useEffect(() => {
    if (isRolling) {
      // Start animation
      setAnimatingDice(true);
      const timer = setTimeout(() => {
        setAnimatingDice(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      // Reset animation state when not rolling
      setAnimatingDice(false);
    }
  }, [isRolling]);

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
            const shouldAnimate = selected && animatingDice;

            return (
              <div key={index} style={{ position: "relative" }}>
                <button
                  className={`dice-btn btn btn-outline-${
                    colorMode === "light" ? "dark" : "light"
                  } rounded-circle ${selected ? "selected" : ""}`}
                  onClick={() => onDiceClick(die)}
                  style={{
                    width: "80px",
                    height: "80px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: window.innerWidth < 640 ? "1.25rem" : "1.5rem",
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
                    animation: shouldAnimate
                      ? "diceSpin 0.5s ease-in-out"
                      : "none",
                  }}
                >
                  <DiceIcon
                    type={`d${die}` as any}
                    size={window.innerWidth < 640 ? 32 : 40}
                    color={colorMode === "light" ? "#000" : "#fff"}
                  />
                  {selected && (
                    <span
                      style={{
                        fontSize: "1rem",
                        marginTop: "4px",
                        opacity: 1,
                        fontWeight: "bold",
                        color: colorMode === "light" ? "#000" : "#fff",
                      }}
                    >
                      x{selected.quantity}
                    </span>
                  )}
                </button>
                {selected && (
                  <button
                    className="btn-close"
                    onClick={() => onDiceRemove(die)}
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      width: "24px",
                      height: "24px",
                      padding: "0",
                      borderRadius: "50%",
                      background: colorMode === "light" ? "#000" : "#fff",
                      color: colorMode === "light" ? "#fff" : "#000",
                      border: `2px solid ${
                        colorMode === "light"
                          ? "rgba(0,0,0,0.3)"
                          : "rgba(255,255,255,0.3)"
                      }`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      cursor: "pointer",
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
