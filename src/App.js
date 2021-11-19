import React, { Component } from 'react';
import Home from './home';
import Favourite from './favourites';

import { Route, Switch } from 'react-router';
import { Router } from 'react-router';
import {BrowserRouter} from 'react-router-dom'

class App extends Component{
    render()
    {
    return (<> 
    <BrowserRouter>
    <Switch>
    <Route exact path="/" exact={true} component={() => <Home/>}/>
    <Route exact path="/favourite" exact={true} component={() => <Favourite/>}/>
    </Switch>
    </BrowserRouter>
    </>);
    }
};
export default App;