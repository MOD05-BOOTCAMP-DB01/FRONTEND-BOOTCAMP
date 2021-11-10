import React from "react";
import { Switch, Route } from "react-router-dom";
import CardObjective from "../components/CardObjective/CardObjective";
import Logout from "../components/Logout/Logout";
import Objective from "../components/Objective/Objective";
import Home from "../Pages/Home/Home";
import CreateObjective from "../Pages/Objective/CreateObjective/CreateObjective";

function Routes() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/objective/:id" component={CardObjective} />
        <Route path="/objective" component={CreateObjective} />
        <Route path="/objectives" component={Objective} />
      </Switch>
    </div>
  );
}

export default Routes;
