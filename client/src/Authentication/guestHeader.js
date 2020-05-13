import React, { Fragment } from "react";
import Auth from '../auth'; 
import { Link } from "react-router-dom";
class GuestHeader extends React.Component {
  render() {
    return (
      <Fragment>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <Link class="navbar-brand btn btn-info text-light" to="/home">HomePage</Link>
          <button class="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
              </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
              <p>Welcome to Guestbook</p>
            </form>
          </div>
        </nav>
      </Fragment>
    );
  }
}
export default GuestHeader;
