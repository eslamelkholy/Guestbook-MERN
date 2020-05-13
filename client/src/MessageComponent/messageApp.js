import React, { Fragment,Component } from 'react';
import  MessageHomePage from './messageHomePage';
import MessagePage from './messagePage';
import { ProtectedRoute } from '../protectedRoute';
import EditMessagePage from './editMessagePage'
class MessageApp extends Component
{
    render()
    {
        return(
            <Fragment>
                    
                    <ProtectedRoute exact path="/home" component ={(props)=> <MessageHomePage {...props} /> } />
                    <ProtectedRoute exact path="/message/:id" component ={(props)=> <MessagePage {...props} /> } />
                    <ProtectedRoute exact path="/editMessage/:id" component ={(props)=> <EditMessagePage {...props} /> } />
            </Fragment>
        )
    }
}
export default MessageApp;