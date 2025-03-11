import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const DiceRollerNew = () => {
  const [diceNumber, setDiceNumber] = useState(20);
  const [modifier, setModifier] = useState(0);
  const [rollTotal, setRollTotal] = useState<number | null>(null);
  const [bgColor, setBgColor] = useState("#333333");

  const dice = [4, 6, 8, 10, 12, 20];

  const handleRoll = () => {
    setRollTotal(Math.floor(Math.random() * diceNumber) + 1 + modifier);
  };

  return (
    <div
      className="text-light p-4 min-vh-100"
      style={{ backgroundColor: bgColor }}
    >
      {/* select dice */}
      <label className="fw-bold">Choose Dice:</label>
      <div className="d-flex gap-2">
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
              className="btn btn-outline-light"
              htmlFor={`option-${index}`}
            >
              D{die}
            </label>
          </div>
        ))}
      </div>

      {/* set modifier */}
      <div className="input-group mb-3 mt-3">
        <span
          className="input-group-text text-light"
          style={{ backgroundColor: bgColor }}
        >
          Modifier:
        </span>
        <input
          type="number"
          className="form-control text-light border-light"
          style={{ backgroundColor: bgColor }}
          placeholder="modifier"
          value={modifier}
          onChange={(e) => setModifier(Number(e.target.value))}
        />
      </div>

      {/* roll */}
      <button type="button" className="btn btn-light" onClick={handleRoll}>
        Roll
      </button>

      {/* display total */}
      <h1 className="mt-3">Total: {rollTotal !== null ? rollTotal : "-"}</h1>

      {/* Background color input */}
      <label className="d-block mt-3">Background Color:</label>
      <input
        id="base"
        type="color"
        name="base"
        value={bgColor}
        onChange={(e) => setBgColor(e.target.value)}
      />
    </div>
  );
};

export default DiceRollerNew;
