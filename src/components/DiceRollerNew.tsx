import { useState, useCallback, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Box, Heading, Stack } from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode";
import AdvantageDisadvantage, { RollType } from "./AdvantageDisadvantage";

interface DiceSelection {
  die: number;
  quantity: number;
}

interface RollResult {
  total: number;
  isHigher: boolean;
}

const DiceRollerNew = () => {
  const [selectedDice, setSelectedDice] = useState<DiceSelection[]>([]);
  const [modifier, setModifier] = useState(0);
  const [rollResults, setRollResults] = useState<RollResult[]>([]);
  const [hasRolled, setHasRolled] = useState(false);
  const [isNatural20, setIsNatural20] = useState(false);
  const [rollType, setRollType] = useState<RollType>("normal");
  const [bgColor, setBgColor] = useState("#006400");
  const { colorMode } = useColorMode();

  // Listen for background color changes in localStorage
  useEffect(() => {
    const savedColor = localStorage.getItem("bgColor");
    if (savedColor) {
      setBgColor(savedColor);
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "bgColor" && e.newValue) {
        setBgColor(e.newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const dice = [4, 6, 8, 10, 12, 20];

  const handleDiceClick = (die: number) => {
    setSelectedDice((prev) => {
      const existing = prev.find((d) => d.die === die);
      if (existing) {
        return prev.map((d) =>
          d.die === die ? { ...d, quantity: d.quantity + 1 } : d
        );
      }
      return [...prev, { die, quantity: 1 }];
    });
  };

  const handleDiceRemove = (die: number) => {
    setSelectedDice((prev) => {
      const existing = prev.find((d) => d.die === die);
      if (existing && existing.quantity > 1) {
        return prev.map((d) =>
          d.die === die ? { ...d, quantity: d.quantity - 1 } : d
        );
      }
      return prev.filter((d) => d.die !== die);
    });
  };

  const handleRoll = useCallback(() => {
    if (selectedDice.length === 0) return;

    let total = 0;
    let hasNatural20 = false;
    let results: RollResult[] = [];

    // Handle advantage/disadvantage for all dice
    if (rollType !== "normal") {
      let roll1Total = 0;
      let roll2Total = 0;

      // Roll each die twice
      selectedDice.forEach(({ die, quantity }) => {
        for (let i = 0; i < quantity; i++) {
          const firstRoll = Math.floor(Math.random() * die) + 1;
          const secondRoll = Math.floor(Math.random() * die) + 1;

          roll1Total += firstRoll;
          roll2Total += secondRoll;

          // Check for natural 20
          if (die === 20 && (firstRoll === 20 || secondRoll === 20)) {
            hasNatural20 = true;
          }
        }
      });

      const isAdvantage = rollType === "advantage";
      const firstIsHigher = isAdvantage
        ? roll1Total >= roll2Total
        : roll1Total <= roll2Total;

      results = [
        {
          total: roll1Total,
          isHigher: firstIsHigher,
        },
        {
          total: roll2Total,
          isHigher: !firstIsHigher,
        },
      ];
    } else {
      // Normal roll for all dice
      selectedDice.forEach(({ die, quantity }) => {
        for (let i = 0; i < quantity; i++) {
          const roll = Math.floor(Math.random() * die) + 1;
          total += roll;
          if (roll === 20 && die === 20) {
            hasNatural20 = true;
          }
        }
      });
      results = [{ total, isHigher: true }];
    }

    setRollResults(results.map((r) => ({ ...r, total: r.total + modifier })));
    setHasRolled(true);
    setIsNatural20(hasNatural20);
  }, [selectedDice, modifier, rollType]);

  return (
    <div
      className="p-4 min-vh-100 position-relative overflow-hidden"
      style={{
        backgroundColor: bgColor,
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Floating particles and animations */}
      <style>
        {`
          @keyframes float {
            0% { transform: translate(0, 0) rotate(0deg); }
            33% { transform: translate(10px, -10px) rotate(120deg); }
            66% { transform: translate(-10px, 10px) rotate(240deg); }
            100% { transform: translate(0, 0) rotate(360deg); }
          }
          @keyframes pulse {
            0% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); opacity: 0.8; }
          }
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px) rotate(-5deg); }
            75% { transform: translateX(5px) rotate(5deg); }
          }
          @keyframes confetti-fall {
            0% { transform: translateY(-100%) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
          }
          @keyframes natural-20 {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
          .particle {
            position: absolute;
            pointer-events: none;
            animation: float 8s infinite linear;
            opacity: 0.1;
            z-index: 0;
          }
          .confetti {
            position: absolute;
            width: 10px;
            height: 10px;
            background: gold;
            animation: confetti-fall 3s linear forwards;
            z-index: 2;
          }
          .dice-btn {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
          }
          .dice-btn::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%);
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          .dice-btn:hover::before {
            opacity: 1;
          }
          .roll-btn {
            animation: pulse 2s infinite ease-in-out;
          }
          .roll-btn:active {
            animation: shake 0.5s ease-in-out;
          }
          .natural-20 {
            animation: natural-20 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            color: gold !important;
            text-shadow: 0 0 20px gold, 0 0 40px gold, 0 0 60px gold !important;
          }
          .dice-btn.selected {
            transform: scale(1.1);
            background: ${
              colorMode === "light"
                ? "rgba(0, 0, 0, 0.2)"
                : "rgba(255, 255, 255, 0.2)"
            } !important;
          }
          .dice-quantity {
            position: absolute;
            top: -8px;
            left: -8px;
            background: ${
              colorMode === "light"
                ? "rgba(0, 0, 0, 0.8)"
                : "rgba(255, 255, 255, 0.8)"
            };
            color: ${colorMode === "light" ? "#fff" : "#000"};
            border-radius: 50%;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.8rem;
            font-weight: bold;
            z-index: 2;
          }
          .remove-btn {
            opacity: 0.7;
            transition: opacity 0.2s ease;
            z-index: 2;
          }
          .remove-btn:hover {
            opacity: 1;
          }
        `}
      </style>

      {/* Generate confetti for natural 20 */}
      {isNatural20 &&
        Array.from({ length: 50 }).map((_, i) => (
          <div
            key={`confetti-${i}`}
            className="confetti"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              background: `hsl(${Math.random() * 360}, 100%, 50%)`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}

      <Stack
        direction="column"
        pt={16}
        gap={2}
        alignItems="center"
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Dice Selection */}
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
            <Stack
              direction="row"
              gap={2}
              flexWrap="wrap"
              justifyContent="center"
            >
              {dice.map((die, index) => {
                const selected = selectedDice.find((d) => d.die === die);
                return (
                  <div key={index} style={{ position: "relative" }}>
                    <button
                      className={`dice-btn btn btn-outline-${
                        colorMode === "light" ? "dark" : "light"
                      } rounded-circle`}
                      onClick={() => handleDiceClick(die)}
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
                          handleDiceRemove(die);
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

        {/* Advantage/Disadvantage Component */}
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
          <AdvantageDisadvantage
            rollType={rollType}
            onRollTypeChange={setRollType}
          />
        </Box>

        {/* Modifier Input */}
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
                onClick={() => setModifier((prev) => prev - 1)}
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
                }`}
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
                className="dice-btn btn"
                onClick={() => setModifier((prev) => prev + 1)}
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

        {/* Roll Button and Result */}
        <Stack direction="column" gap={2} alignItems="center">
          <button
            className="roll-btn btn btn-lg px-4 py-2"
            onClick={handleRoll}
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              borderRadius: "25px",
              minWidth: "180px",
              background:
                colorMode === "light"
                  ? "rgba(0, 0, 0, 0.8)"
                  : "rgba(255, 255, 255, 0.8)",
              border: `3px solid ${
                colorMode === "light"
                  ? "rgba(0,0,0,0.3)"
                  : "rgba(255,255,255,0.3)"
              }`,
              color: colorMode === "light" ? "#fff" : "#000",
              boxShadow: `0 8px 32px ${
                colorMode === "light" ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.4)"
              }`,
            }}
          >
            Roll
          </button>

          <Box
            style={{
              opacity: hasRolled ? 1 : 0,
              transform: `scale(${hasRolled ? 1 : 0.5})`,
              transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <Stack
              direction="row"
              gap={3}
              alignItems="center"
              justifyContent="center"
            >
              {rollResults.map((result, index) => (
                <Heading
                  key={index}
                  size="2xl"
                  className={`text-${
                    colorMode === "light" ? "dark" : "light"
                  } ${result.total === 20 && isNatural20 ? "natural-20" : ""}`}
                  style={{
                    fontSize: result.isHigher ? "4rem" : "2rem",
                    fontWeight: "900",
                    opacity: result.isHigher ? 1 : 0.7,
                    textShadow:
                      result.total === 20 && isNatural20
                        ? "0 0 30px gold, 0 0 60px gold, 0 0 90px gold"
                        : `0 0 30px ${
                            colorMode === "light"
                              ? "rgba(0,0,0,0.4)"
                              : "rgba(255,255,255,0.4)"
                          }`,
                    animation: hasRolled
                      ? result.total === 20 && isNatural20
                        ? "natural-20 2s cubic-bezier(0.4, 0, 0.2, 1) infinite"
                        : "glow 2s ease-in-out infinite alternate"
                      : "none",
                  }}
                >
                  {result.total}
                </Heading>
              ))}
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </div>
  );
};

export default DiceRollerNew;
