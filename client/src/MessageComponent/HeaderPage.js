import React, { Fragment } from "react";
import { Navbar, Form, Button, Nav } from "react-bootstrap";
import Auth from '../auth'; 
class HeaderPage extends React.Component {
  render() {
    return (
      <Fragment>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Homepage</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">All Messages</Nav.Link>
            </Nav>
            <Form inline>
              <Button variant="outline-success" onClick={() =>{
                Auth.logout(() =>{
                  this.props.history.push("/")
                })
              }}>Logout</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </Fragment>
    );
  }
}
export default HeaderPage;
