import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter, Route, Link, Redirect, withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/js/bootstrap.js';
import AuthenticationApp from './Authentication/authenticationApp';
import MessageApp from './MessageComponent/messageApp';

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
