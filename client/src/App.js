import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import AuthenticationApp from './Authentication/authenticationApp';
import MessageApp from './MessageComponent/messageApp';
import Auth from './auth'

class App extends React.Component {
  render(){
    return(
      <Fragment>
        <BrowserRouter>
            <AuthenticationApp />
            <MessageApp />
        </BrowserRouter>
      </Fragment>
    );
  }
}

export default App;
