import React, { useEffect, useContext } from 'react';
import { Route } from 'react-router-dom';
import { useParams } from 'react-router';
import { UserContext } from './context/UserContext';


import {
    Home,
    LoginReg,
    Navbar,
    Routines
} from './components/index'

const App = () => { 
    const params = useParams();
    const { setToken, setLoggenIn} = useContext(UserContext);

    return (
        <> 
            <Route exact path ='/'>
                <Home />
            </Route>
            <Navbar /> 
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