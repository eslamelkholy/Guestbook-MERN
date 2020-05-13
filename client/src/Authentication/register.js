import React from 'react'
import Axios from 'axios'
import $ from 'jquery'
import '../layout/authenticationStyle/register.css'

class Register extends React.Component {
    state = {
        username: "",
        usernameError: "",
        password: "",
        passwordError: "",
        email: "",
        emailError: "",
        formIsValid: true
    }
    showSuccessMsg = () => {
        $("#msgSuccessful").show();
    }
    handleValidation = () => {
        this.setState({ usernameError: "", passwordError: "", emailError: ""});
        if (this.state.username.length === 0)
        {
            this.setState({ usernameError: "Username Can't Be Empty"});
            this.state.formIsValid = false;
        }
        if (this.state.password.length < 5)
        {
            this.setState({ passwordError: "Your Password too Weak" });
            this.state.formIsValid = false;
        }   
        if (!this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))
        {
            this.setState({ emailError: "Please Enter a Valid Email"});
            this.state.formIsValid = false;
        }
        return this.state.formIsValid;
    }
    componentDidCatch(error, info) {
        this.setState({ emailError: "Username and Email Must be Unique"})
      }
    onFormSubmit = (e) => {
        e.preventDefault();
        if (this.handleValidation()) 
        {
            
            Axios.post("http://localhost:8000/register",{
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
            }).then((res) => {
                this.showSuccessMsg();
                setTimeout(function(){window.location.href="http://localhost:3000/login"},3000);
            }).catch((err) => {
                { const mute = err }
                this.setState({ emailError: "Username and Email Must be Unique"})})
        }
    }
    render() {
        return (
            <div class="container">
                <a className="btn btn-info" href="/login">Back To Login Page >> </a>
                <h1 align="Center">Speakers Register Page</h1>
                <form class="col-6 offset-3" enctype="multipart/form-data">
                    <div class="form-group">
                        <label>UserName</label>
                        <input type="text" class="form-control" name="username" onChange={(e) => { this.setState({ username: e.target.value }) }} />
                        <span class="bg-danger text-white">{this.state.usernameError}</span>
                    </div>
                    <div class="form-group">
                        <label>UserPass</label>
                        <input type="password" class="form-control" name="password" onChange={(e) => { this.setState({ password: e.target.value }) }} />
                        <span class="bg-danger text-white">{this.state.passwordError}</span>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="text" class="form-control" name="email" onChange={(e) => { this.setState({ email: e.target.value }) }} />
                        <span class="bg-danger text-white">{this.state.emailError}</span><br/>
                    </div><br/>
                    <input type="submit" id="registerBtn" value="Register" onClick={this.onFormSubmit} class="btn btn-success" />
                    <br/><br/>  
                    <div class="p-3 mb-2 bg-info text-white" id="msgSuccessful">
                        Registeration Completed Successfully You Will be Redirect Now ...
                    </div>
                </form>
            </div>
        )
    }
}
export default Register;