import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

const DiceRollerNew = () => {
  const [diceNumber, setDiceNumber] = useState(20);
  const [modifier, setModifier] = useState(0);
  const [rollTotal, setRollTotal] = useState(Number);

  const dice = [4, 6, 8, 10, 12, 20];

  const handleRoll = () => {
    setRollTotal(Math.floor(Math.random() * diceNumber) + 1 + modifier);
    console.log(rollTotal);
  };

  return (
    <div className="bg-dark text-light p-4 min-vh-100">
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
        <span className="input-group-text bg-secondary text-light">
          Modifier:
        </span>
        <input
          type="number"
          className="form-control bg-dark text-light border-secondary"
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
      <h1 className="mt-3">Total: {rollTotal}</h1>
    </div>
  );
};

export default DiceRollerNew;
