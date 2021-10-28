import "./App.css";
import { Switch, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div>
        <Switch>
          <Route path="/" component={Login} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
