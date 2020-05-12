import React, { Fragment } from 'react';
import './App.css';
// Bootstrap in Index it will be seen in Whole Project component
import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/js/bootstrap.js';
import AuthenticationApp from './Authentication/authenticationApp';
import { BrowserRouter } from 'react-router-dom';
class App extends React.Component {
  render(){
    return(
      <Fragment>
        <BrowserRouter>
          <AuthenticationApp />
        </BrowserRouter>
      </Fragment>
    );
  }
}

export default App;
