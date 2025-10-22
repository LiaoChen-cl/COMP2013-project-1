import "./App.css";
import NavBar from "./Components/NavBar";
import GroceriesAppContainer from "./Components/GroceriesAppContainer";

function App() {
  return (
    <div className="App">
      <NavBar username="Liao" />
      <GroceriesAppContainer />
    </div>
  );
}

export default App;
