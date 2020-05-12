import React, { Fragment } from 'react'
import '../layout/authenticationStyle/register.css'
class Register extends React.Component {
    render() {
        return (
            <div class="container">
                <a className="btn btn-info" href="/login">Back To Login Page >> </a>
                <h1 align="Center">Register Page</h1>
                <form class="col-6 offset-3" enctype="multipart/form-data">
                    <div class="form-group">
                        <label>Username</label>
                        <input type="text" class="form-control" name="username"  />
                        <span class="bg-danger text-white"></span>
                    </div>
                    <div class="form-group">
                        <label>Userpass</label>
                        <input type="password" class="form-control" name="password" />
                        <span class="bg-danger text-white"></span>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="text" class="form-control" name="email" />
                        <span class="bg-danger text-white"></span>
                    </div>
                    <input type="submit" id="registerBtn" value="Register" class="btn btn-success" />
                    <div class="p-3 mb-2 bg-info text-white" id="msgSuccessful">
                        Registeration Completed Successfully You Will be Redirect Now ...
                    </div>
                </form>
            </div>
        )
    }
}
export default Register;