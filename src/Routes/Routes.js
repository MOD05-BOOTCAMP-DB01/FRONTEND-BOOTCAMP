import React from "react";
import { Switch, Route } from "react-router-dom";
import CardObjective from "../components/CardObjective/CardObjective";
import Objective from "../components/Objective/Objective";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";

function Routes() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/objective/:id" component={CardObjective} />
        <Route path="/register" component={Register} />
        <Route path="/objectives" component={Objective} />
      </Switch>
    </div>
  );
}

export default Routes;
