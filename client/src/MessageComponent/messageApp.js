import React, { Fragment,Component } from 'react';
import {Route} from 'react-router-dom';
import  MessageHomePage from './messageHomePage';
class MessageApp extends Component
{
    render()
    {
        return(
            <Fragment>
                <Route exact path="/home" component ={()=> <MessageHomePage /> } />
            </Fragment>
        )
    }
}
export default MessageApp;