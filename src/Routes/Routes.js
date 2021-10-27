import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Login from '../Pages/Login/Login';

function Routes() {
  return (
    <div>
      <Switch>
        <Route path="/" component={Login} />
      </Switch>
    </div>
  )
}

export default Routes
