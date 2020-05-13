import React, { Fragment } from 'react'
import '../layout/authenticationStyle/login.css';
import Axios from 'axios';
import auth from '../auth';
import $ from 'jquery'
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
                // window.location = "/home";c
                this.props.history.push("/home");
                auth.setToken(serverReply.accessToken);
            })
        }).catch(err =>{
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