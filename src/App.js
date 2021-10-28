import "./App.css";
<<<<<<< HEAD
import Routes from "./Routes/Routes";

=======
import { Switch, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Navbar from "./components/Navbar/Navbar";
>>>>>>> 138751c5b604c016e307348b7e9e8ded98019e64

function App() {
  return (
    <div className="App">
      <Navbar />
      <div>
        <Routes/>
      </div>
    </div>
  );
}

export default App;
