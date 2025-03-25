import { HStack } from "@chakra-ui/react";
import DiceRollerNew from "./components/DiceRollerNew";
import NavBar from "./components/NavBar";
import SavedRolls from "./components/SavedRolls";
import { Provider } from "./components/ui/provider";

function App() {
  return (
    <>
      <Provider>
        <NavBar />

        <div className="App">
          <DiceRollerNew />
        </div>
      </Provider>
    </>
  );
}

export default App;
