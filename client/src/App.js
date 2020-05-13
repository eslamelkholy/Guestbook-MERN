import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import HeaderPage from './MessageComponent/HeaderPage';
import { ProtectedRoute } from './protectedRoute';
// import 'bootstrap/dist/js/bootstrap.js';
import AuthenticationApp from './Authentication/authenticationApp';
import MessageApp from './MessageComponent/messageApp';

class App extends React.Component {
  render(){
    return(
      <Fragment>
        <BrowserRouter>
        <ProtectedRoute exact path="/home" component ={(props)=> <HeaderPage {...props} /> }/>
        <ProtectedRoute exact path="/message/:id" component ={(props)=> <HeaderPage {...props} /> }/>
            <AuthenticationApp />
            <MessageApp />
        </BrowserRouter>
      </Fragment>
    );
  }
}

export default App;
