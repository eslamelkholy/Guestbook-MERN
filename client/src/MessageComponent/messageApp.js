import React, { Fragment,Component } from 'react';
import {Route} from 'react-router-dom';
import  MessageHomePage from './messageHomePage';
import HeaderPage from './HeaderPage';
import { ProtectedRoute } from '../protectedRoute';
class MessageApp extends Component
{
    render()
    {
        return(
            <Fragment>
                <ProtectedRoute exact path="/home" component ={(props)=> <HeaderPage {...props} /> }/>
                <ProtectedRoute exact path="/home" component ={(props)=> <MessageHomePage {...props} /> } />
            </Fragment>
        )
    }
}
export default MessageApp;