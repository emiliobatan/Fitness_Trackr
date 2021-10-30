import React, { useEffect, useContext } from 'react';
import { Route } from 'react-router-dom';

import {
    Home,
    LoginReg,
    Navbar,
    Routines
} from './components/index'

const App = () => { 

    return (
        <> 
            <Route exact path ='/'>
                <Home />
            </Route>
            <Route path ='/users/:method'>
                <LoginReg />
            </Route>
            <Route path ='/routines'> 
                <Routines />
            </Route>
        </>
    )
}

export default App;