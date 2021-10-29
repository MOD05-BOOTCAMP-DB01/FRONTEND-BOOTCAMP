import React from "react";
import { Switch, Route } from "react-router-dom";
import CardObjective from "../CardObjective";
import Login from "../Pages/Login/Login";

function Routes() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/objective" component={CardObjective} />
        <Route path="/" component={Login} />
      </Switch>
    </div>
  );
}

export default Routes;
