import DiceRollerNew from "./components/DiceRollerNew";
import NavBar from "./components/NavBar";
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
