import React from "react";
import { Switch, Route } from "react-router-dom";
import CardObjective from "../components/CardObjective/CardObjective";
import Objective from "../components/Objective/Objective";
import Home from "../Pages/Home/Home";

function Routes() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/objective/:id" component={CardObjective} />
        <Route path="/objectives" component={Objective} />
      </Switch>
    </div>
  );
}

export default Routes;
