import "./App.css";
import Routes from "./Routes/Routes";
import Navbar from "./components/Navbar/Navbar"


function App() {
  return (
    <div className="App">
      <Navbar />
      <div>
        <Routes />
      </div>
    </div>
  );
}

export default App;
