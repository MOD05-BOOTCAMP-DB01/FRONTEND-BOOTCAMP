import React from "react";
import { Switch, Route } from "react-router-dom";
import CardObjective from "../components/CardObjective/CardObjective";
import Objective from "../components/Objective/Objective";
import Home from "../Pages/Home/Home";
import CreateObjective from "../Pages/Objective/CreateObjective/CreateObjective";
import UpdateUsers from "../Pages/Users/UpdateUsers/UpdateUsers";

function Routes() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/objective/:id" component={CardObjective} />
        <Route path="/objective" component={CreateObjective} />
        <Route path="/objectives" component={Objective} />
        <Route path="/atualizar/user" component={UpdateUsers} />
      </Switch>
    </div>
  );
}

export default Routes;
