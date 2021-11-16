import React from "react";
import { Switch, Route } from "react-router-dom";
import CardObjective from "../components/CardObjective/CardObjective";
import Logout from "../components/Logout/Logout";
import Objective from "../components/Objective/Objective";
import Home from "../Pages/Home/Home";
import CreateObjective from "../Pages/Objective/CreateObjective/CreateObjective";
import UpdateObjective from "../Pages/Objective/UpdateObjective/UpdateObjective";
import UpdateUsers from "../Pages/Users/UpdateUsers/UpdateUsers";
import GuardedRoute from "../components/GuardedRoute/GuardedRoute";
import AboutUs from "../Pages/AboutUs/AboutUs";



function Routes() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/sobre" component={AboutUs} />
        <GuardedRoute path="/objective/:id" component={CardObjective} />
        <GuardedRoute path="/objective" component={CreateObjective} />
        <GuardedRoute path="/objectives" component={Objective} />
        <GuardedRoute path="/editar/usuario" component={UpdateUsers} />
        <GuardedRoute path="/editar/objetivo/:id" component={UpdateObjective} />
        <GuardedRoute path="/logout" component={Logout} />
      </Switch>
    </div>
  );
}

export default Routes;
