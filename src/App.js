import "./App.css";
import { Switch, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";

function App() {
  return (
    <div className="App">
      <div className="content">
        <Switch>
          <Route path="/" component={Login} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
