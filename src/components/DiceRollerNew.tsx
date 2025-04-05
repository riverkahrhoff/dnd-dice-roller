import { useState, useCallback, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Stack, Box } from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode";
import AdvantageDisadvantage, { RollType } from "./AdvantageDisadvantage";
import DiceSelectionComponent from "./DiceSelection";
import ModifierInput from "./ModifierInput";
import RollResults from "./RollResults";
import "../styles/dice-roller.css";

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
  const [isNatural20, setIsNatural20] = useState(false);
  const [rollType, setRollType] = useState<RollType>("normal");
  const [bgColor, setBgColor] = useState("#006400");
  const [isRolling, setIsRolling] = useState(false);
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

    setIsRolling(true);
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
    setIsNatural20(hasNatural20);

    // Reset rolling state after animation
    setTimeout(() => {
      setIsRolling(false);
    }, 500);
  }, [selectedDice, modifier, rollType]);

  return (
    <Box
      className="min-vh-100 position-relative overflow-hidden"
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
          /* Number input styling */
          input[type="number"] {
            -moz-appearance: textfield;
            text-align: center !important;
          }
          input[type="number"]::-webkit-inner-spin-button,
          input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          input[type="number"]:focus {
            outline: none;
            box-shadow: none;
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
                : "rgba(255, 255, 255, 0.95)"
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
            border: 2px solid ${
              colorMode === "light"
                ? "rgba(255, 255, 255, 0.3)"
                : "rgba(0, 0, 0, 0.3)"
            };
            box-shadow: 0 2px 4px ${
              colorMode === "light"
                ? "rgba(0, 0, 0, 0.2)"
                : "rgba(0, 0, 0, 0.4)"
            };
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
        pt={{ base: "70px", sm: "100px" }}
        px={{ base: 2, sm: 4 }}
        pb={{ base: 4, sm: 8 }}
        gap={{ base: 2, sm: 4 }}
        alignItems="center"
        style={{ position: "relative", zIndex: 1 }}
      >
        <DiceSelectionComponent
          selectedDice={selectedDice}
          onDiceClick={handleDiceClick}
          onDiceRemove={handleDiceRemove}
          isRolling={isRolling}
        />

        <AdvantageDisadvantage
          rollType={rollType}
          onRollTypeChange={setRollType}
        />

        <ModifierInput modifier={modifier} onModifierChange={setModifier} />

        <Stack direction="column" gap={{ base: 2, sm: 4 }} alignItems="center">
          <button
            className="roll-btn btn btn-lg px-4 py-2"
            onClick={handleRoll}
            style={{
              fontWeight: "bold",
              borderRadius: "25px",
              minWidth: "160px",
              fontSize: window.innerWidth < 640 ? "1.5rem" : "1.75rem",
              background:
                colorMode === "light"
                  ? "rgba(0, 0, 0, 0.8)"
                  : "rgba(255, 255, 255, 0.95)",
              border: `3px solid ${
                colorMode === "light"
                  ? "rgba(255, 255, 255, 0.3)"
                  : "rgba(0, 0, 0, 0.3)"
              }`,
              color: colorMode === "light" ? "#fff" : "#000",
              boxShadow: `0 8px 32px ${
                colorMode === "light"
                  ? "rgba(0, 0, 0, 0.3)"
                  : "rgba(0, 0, 0, 0.5)"
              }, 0 0 0 1px ${
                colorMode === "light"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.2)"
              }`,
              backdropFilter: "blur(4px)",
            }}
          >
            {selectedDice.length ? "Roll" : "Choose Dice"}
          </button>

          <RollResults results={rollResults} isNatural20={isNatural20} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default DiceRollerNew;
