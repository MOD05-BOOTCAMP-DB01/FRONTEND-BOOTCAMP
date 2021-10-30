import React from 'react'
import { Switch, Route } from 'react-router-dom';
import CardObjective from '../CardObjective';
import Cadastro from '../Pages/Cadastro/Cadastro';
import Login from '../Pages/Login/Login';

function Routes() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/objective" component={CardObjective} />
        <Route path="/register" component={Cadastro} />
      </Switch>
    </div>
  );
}

export default Routes;
