import { useState, useCallback, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Box, Heading, Stack } from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode";

const DiceRollerNew = () => {
  const [diceNumber, setDiceNumber] = useState(20);
  const [modifier, setModifier] = useState(0);
  const [rollTotal, setRollTotal] = useState<number | null>(null);
  const [hasRolled, setHasRolled] = useState(false);
  const [isNatural20, setIsNatural20] = useState(false);
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

  const handleRoll = useCallback(() => {
    const roll = Math.floor(Math.random() * diceNumber) + 1;
    const rollTotal = roll + modifier;
    setRollTotal(rollTotal);
    setHasRolled(true);
    setIsNatural20(roll === 20 && diceNumber === 20);
  }, [diceNumber, modifier]);

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
        gap={4}
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
          p={6}
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
          <Stack direction="column" gap={4}>
            <Heading
              size="lg"
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
                    className={`dice-btn btn btn-outline-${
                      colorMode === "light" ? "dark" : "light"
                    } rounded-circle`}
                    htmlFor={`option-${index}`}
                    style={{
                      width: "80px",
                      height: "80px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      background:
                        diceNumber === die
                          ? colorMode === "light"
                            ? "rgba(0, 0, 0, 0.2)"
                            : "rgba(255, 255, 255, 0.2)"
                          : "transparent",
                      border: `3px solid ${
                        colorMode === "light"
                          ? "rgba(0,0,0,0.3)"
                          : "rgba(255,255,255,0.3)"
                      }`,
                      transform: diceNumber === die ? "scale(1.1)" : "scale(1)",
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
              ? "rgba(255, 255, 255, 0.2)"
              : "rgba(0, 0, 0, 0.3)"
          }
          p={6}
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
          <Stack direction="column" gap={4}>
            <Heading
              size="lg"
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
                  width: "60px",
                  height: "60px",
                  borderRadius: "20px",
                  fontSize: "2rem",
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
                  width: "100px",
                  height: "60px",
                  fontSize: "2rem",
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
                  borderRadius: "20px",
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
                  width: "60px",
                  height: "60px",
                  borderRadius: "20px",
                  fontSize: "2rem",
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
        <Stack direction="column" gap={4} alignItems="center">
          <button
            className="roll-btn btn btn-lg px-5 py-3"
            onClick={handleRoll}
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              borderRadius: "30px",
              minWidth: "200px",
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
            <Heading
              size="2xl"
              className={`text-${colorMode === "light" ? "dark" : "light"} ${
                isNatural20 ? "natural-20" : ""
              }`}
              style={{
                fontSize: "5rem",
                fontWeight: "900",
                textShadow: isNatural20
                  ? "0 0 30px gold, 0 0 60px gold, 0 0 90px gold"
                  : `0 0 30px ${
                      colorMode === "light"
                        ? "rgba(0,0,0,0.4)"
                        : "rgba(255,255,255,0.4)"
                    }`,
                animation: hasRolled
                  ? isNatural20
                    ? "natural-20 2s cubic-bezier(0.4, 0, 0.2, 1) infinite"
                    : "glow 2s ease-in-out infinite alternate"
                  : "none",
              }}
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
