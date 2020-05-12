import React, { Fragment,Component } from 'react';
import {Route} from 'react-router-dom';
import Login from './login';
import Register from './register'
class AuthenticationApp extends Component
{
    render()
    {
        return(
            <Fragment>
                <Route exact path="/login" component ={(props)=> <Login {...props}/> } />
                <Route exact path="/" component ={(props)=> <Login {...props}/> } />
                <Route exact path="/register" component = {() => <Register /> }  />
            </Fragment>
        )
    }
}
export default AuthenticationApp;