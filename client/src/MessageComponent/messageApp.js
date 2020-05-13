import React, { Fragment,Component } from 'react';
import  MessageHomePage from './messageHomePage';
import MessagePage from './messagePage';
import { ProtectedRoute } from '../protectedRoute';
class MessageApp extends Component
{
    render()
    {
        return(
            <Fragment>
                    <ProtectedRoute exact path="/home" component ={(props)=> <MessageHomePage {...props} /> } />
                    <ProtectedRoute exact path="/message/:id" component ={(props)=> <MessagePage {...props} /> } />
            </Fragment>
        )
    }
}
export default MessageApp;