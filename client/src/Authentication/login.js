import React, { Fragment } from 'react'
import '../layout/authenticationStyle/login.css'
class Login extends React.Component {
    
    render() {
        return (
            <Fragment>
                <br/><br/>
                <h1>Welcome To Guestbook Login Page</h1>
                <div class="row">
                    <div class="col-4 form">
                        <form >
                            <div class="form-group row">
                                <label for="inputEmail3" class="col-sm-2 col-form-label">Username</label>
                                <div class="col-sm-10">
                                    <input type="username" class="form-control" id="inputEmail3" name="username"  />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
                                <div class="col-sm-10">
                                    <input type="password" class="form-control" id="inputPassword3" name="password" />
                                    <span class="bg-danger text-white warrningMsg" id="msgWarning">Username or Password is Invalid !</span>
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-sm-10 loginButtons">
                                    <button type="submit"class="btn btn-primary signBtn">Sign in</button>
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
export default Login;