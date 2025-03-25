import { useState } from "react";

const SavedRolls = () => {
  const [name, setName] = useState("");
  const [formula, setFormula] = useState("");
  const [savedRolls, setSavedRolls] = useState<
    { name: string; formula: string }[]
  >([]);

  const handleAddRoll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !formula) return; // Prevent empty entries

    const newRoll = { name, formula };
    setSavedRolls([...savedRolls, newRoll]); // Update state
    setName(""); // Clear inputs
    setFormula("");
  };

  return (
    <div>
      <h2>Saved Rolls</h2>

      {/* Form to add new rolls */}
      <form onSubmit={handleAddRoll}>
        <input
          type="text"
          placeholder="Roll Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Formula (e.g., 1d20+5)"
          value={formula}
          onChange={(e) => setFormula(e.target.value)}
          required
        />
        <button type="submit">Save Roll</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th scope="col">Formula</th>
          </tr>
        </thead>
        <tbody>
          {savedRolls.map((roll, index) => (
            <tr key={index}>
              <td>{roll.name}</td>
              <td>{roll.formula}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SavedRolls;
