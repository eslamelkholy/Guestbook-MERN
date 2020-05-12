import React, { Fragment,Component } from 'react';
import {Route} from 'react-router-dom';
import  MessageHomePage from './messageHomePage';
import HeaderPage from './HeaderPage';
import { ProtectedRoute } from '../protectedRoute';
import Axios from 'axios'
class MessageApp extends Component
{
    state = {
        messageData : []
    }
    componentDidMount(){
        this.getData();
    }
    getData = () =>{
        Axios.get("/message").then((res) =>{
            this.setState({messageData: res});
        });
    }
    render()
    {
        return(
            <Fragment>
                <ProtectedRoute exact path="/home" component ={(props)=> <HeaderPage {...props} /> }/>
                <ProtectedRoute exact path="/home" component ={(props)=> <MessageHomePage {...props} messageData = {this.state.messageData} /> } />
            </Fragment>
        )
    }
}
export default MessageApp;