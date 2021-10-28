import React from 'react'
import { Switch, Route } from 'react-router-dom';
<<<<<<< HEAD
import CardObjective from '../CardObjective';
=======
>>>>>>> 138751c5b604c016e307348b7e9e8ded98019e64
import Login from '../Pages/Login/Login';

function Routes() {
  return (
    <div>
      <Switch>
<<<<<<< HEAD
        <Route path="/" exact component={Login} />
        <Route path="/objective" component={CardObjective} />
=======
        <Route path="/" component={Login} />
>>>>>>> 138751c5b604c016e307348b7e9e8ded98019e64
      </Switch>
    </div>
  )
}

export default Routes
