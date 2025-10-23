// ...existing code...
import "./App.css";
import NavBar from "./Components/NavBar";
import GroceriesAppContainer from "./Components/GroceriesAppContainer";

// App: root component for the application.
// Currently renders the groceries app container.
function App() {
  return (
    <div className="App">
      {/* Main groceries application container */}
      <GroceriesAppContainer />
    </div>
  );
}

export default App;
