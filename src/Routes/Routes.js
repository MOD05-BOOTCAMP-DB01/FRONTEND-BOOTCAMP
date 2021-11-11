import React from "react";
import { Switch, Route } from "react-router-dom";
import CardObjective from "../components/CardObjective/CardObjective";
import Logout from "../components/Logout/Logout";
import Objective from "../components/Objective/Objective";
import Home from "../Pages/Home/Home";
import CreateObjective from "../Pages/Objective/CreateObjective/CreateObjective";
import UpdateUsers from "../Pages/Users/UpdateUsers/UpdateUsers";
import GuardedRoute from "../components/GuardedRoute/GuardedRoute";

function Routes() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Home} />
        <GuardedRoute path="/logout" component={Logout} />
        <GuardedRoute path="/objective/:id" component={CardObjective} />
        <GuardedRoute path="/objective" component={CreateObjective} />
        <GuardedRoute path="/objectives" component={Objective} />
        <GuardedRoute path="/atualizar/user" component={UpdateUsers} />
      </Switch>
    </div>
  );
}

export default Routes;
