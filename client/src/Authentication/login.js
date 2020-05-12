import React, { Fragment } from 'react'
import '../layout/authenticationStyle/login.css';
import Axios from 'axios';
import Auth from '../auth';
import auth from '../auth';
class Login extends React.Component {
    state = {
        username: "",
        password: "",
        warrningMsg: ""
    }
    componentDidMount() {
        localStorage.removeItem('token');
    }
    userLoginValidation()
    {
        return postRequest("http://localhost:8080/login", { username: this.state.username, password: this.state.password });
    }
    onFormSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.username, this.state.password);
        auth.login(()=>{
            this.props.history.push("/home")
        })
    }
    render() {
        return (
            <Fragment>
                <br/><br/>
                <h1>Welcome To Guestbook Login Page</h1>
                <div class="row container">
                    <div class="col-6 form">
                        <form >
                            <div class="form-group row">
                                <label for="inputEmail3" class="col-sm-2 col-form-label">Username</label>
                                <div class="col-sm-10">
                                    <input type="username" class="form-control" id="inputEmail3" name="username" onChange={(e) => { this.setState({ username: e.target.value }) }} />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
                                <div class="col-sm-10">
                                    <input type="password" class="form-control" id="inputPassword3" name="password" onChange={(e) => { this.setState({ password: e.target.value }) }} />
                                    <span class="bg-danger text-white warrningMsg" id="msgWarning">Username or Password is Invalid !</span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-10 loginButtons">
                                    <button type="submit"class="btn btn-primary signBtn" onClick={this.onFormSubmit}>Sign in</button>
                                    <a href="/register" class="btn btn-primary signBtn">Sign up</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Fragment>
        )
    }
}
function postRequest(url, object) {
    return Axios.post(url, object).then((res) => res.data);
}
export default Login;