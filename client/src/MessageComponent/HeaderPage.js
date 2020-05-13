import React, { Fragment } from "react";
import Auth from '../auth'; 
import { Link } from "react-router-dom";
class HeaderPage extends React.Component {
  render() {
    return (
      <Fragment>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <Link class="navbar-brand" to="#">Welcome {Auth.user.username}</Link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <Link class="nav-link" to="home">Home <span class="sr-only">(current)</span></Link>
              </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={() =>{
                Auth.logout(() =>{this.props.history.push("/")})}}>Logout</button>
            </form>
          </div>
        </nav>
      </Fragment>
    );
  }
}
export default HeaderPage;
