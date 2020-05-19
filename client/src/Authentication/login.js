import React, { Fragment } from 'react'
import '../layout/authenticationStyle/login.css';
import Axios from 'axios';
import auth from '../auth';
import $ from 'jquery'
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import GuestHeader from './guestHeader'
class Login extends React.Component {
    state = {
        username: "",
        password: "",
        warrningMsg: ""
    }
    userLoginValidation()
    {
        return postRequest("http://localhost:8000/login", { username: this.state.username, password: this.state.password });
    }
    onFormSubmit = (e) => {
        e.preventDefault();
        this.userLoginValidation().then(serverReply =>{
            auth.setUserData(serverReply.userData);
            localStorage.setItem("token", serverReply.accessToken);
            auth.login(() =>{
                this.props.history.push("/home");
                auth.setToken(serverReply.accessToken);
            })
        }).catch(err =>{
            $("#msgWarning").show();
        })
    }
    // Google Login Button
    responseSuccessGoogle = (response) => {
    Axios({
      method:"POST",
      url:"http://localhost:8000/user/googlelogin",
      data:{tokenId: response.tokenId}
    }).then(response =>{
      const { isAuthenticated, accessToken, user} = response.data;
      if(isAuthenticated){
        auth.setUserData(user)
        auth.setToken(accessToken)
        auth.authenticated = true;
        localStorage.setItem("token", accessToken)
        this.props.history.push("/home");
    }else
        $("#msgWarning").show();
    })
  }
  // Facebook Login Button
    responseFacebook = (response) => {
    Axios({
      method:"POST",
      url:"http://localhost:8000/user/facebooklogin",
      data:{accessToken: response.accessToken, userID: response.userID}
    }).then(response =>{
      const { isAuthenticated, accessToken, user} = response.data;
      if(isAuthenticated){
        auth.setUserData(user)
        auth.setToken(accessToken)
        auth.authenticated = true;
        localStorage.setItem("token", accessToken)
        this.props.history.push("/home");
    }else
        $("#msgWarning").show();
    })
  }
    render() {
        return (
            <Fragment>
            <GuestHeader/>
                <h1>Welcome To Guestbook Login Page</h1>
                <div className="row container">
                    <div className="col-6 form">
                        <form >
                            <div className="form-group row">
                                <label for="inputEmail3" className="col-sm-2 col-form-label">Username</label>
                                <div className="col-sm-10">
                                    <input type="username" className="form-control" id="inputEmail3" name="username" onChange={(e) => { this.setState({ username: e.target.value }) }} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                                <div className="col-sm-10">
                                    <input type="password" className="form-control" id="inputPassword3" name="password" onChange={(e) => { this.setState({ password: e.target.value }) }} />
                                    <span className="bg-danger text-white warrningMsg" id="msgWarning">Username or Password is Invalid !</span>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-10 loginButtons">
                                    <button type="submit"className="btn btn-primary signBtn" onClick={this.onFormSubmit}>Sign in</button>
                                    <a href="/register" className="btn btn-primary signBtn">Sign up</a>
                                </div>
                            </div>
                        </form>
                        <div className="row socialContainer">
                        <div className="col-10 offset-2">
                        <GoogleLogin
                            clientId="457064280855-fon6ji3u3aqgi3kpjp03e4lhtfgtshmj.apps.googleusercontent.com"
                            buttonText="Login With Google"
                            onSuccess={this.responseSuccessGoogle}
                            onFailure={this.responseErrorGoogle}
                            cookiePolicy={'single_host_origin'}
                            className="googleBtn"
                            theme="dark"
                        />
                        </div>
                        <div className="col-10 offset-2 facebookLogin">
                        <FacebookLogin
                        appId="271933347267191"
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={this.responseFacebook} 
                        className="facebookBtn"
                        icon="element"
                        />
                        </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
async function postRequest(url, object) {
    const res = await Axios.post(url, object);
    return res.data;
}
export default Login;