import DiceRollerNew from "./components/DiceRollerNew";
import NavBar from "./components/NavBar";
import { Provider } from "./components/ui/provider";
import { Box } from "@chakra-ui/react";

function App() {
  return (
    <>
      <Provider>
        <Box color="fg">
          <NavBar />
          <div className="App">
            <DiceRollerNew />
          </div>
        </Box>
      </Provider>
    </>
  );
}

export default App;
