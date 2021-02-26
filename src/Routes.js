import React from 'react'
import { Switch, Route } from 'react-router-dom';
import App from './App';
import PinRoute from "./screens/PinRoute"
import Profile from "./screens/Profile"






function Routes() {

    return (
        
            <Switch>
            <Route exact path='/' component={App}></Route>
            <Route exact path='/profile' component={Profile}></Route>
                 <Route path='/pin/:id' component={PinRoute}></Route>
            </Switch>
       
    )
}

export default Routes
