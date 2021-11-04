import React from "react";
import { Switch, Route } from "react-router-dom";
import CardObjective from "../components/CardObjective/CardObjective";
import Objective from "../components/Objective/Objective";
import Cadastro from "../Pages/Cadastro/Cadastro";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";

function Routes() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/objective/:id" component={CardObjective} />
        <Route path="/register" component={Cadastro} />
        <Route path="/objectives" component={Objective} />
      </Switch>
    </div>
  );
}

export default Routes;
