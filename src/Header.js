import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withAuth0 } from '@auth0/auth0-react';
import LogonButton from './LogonButton.js';
import LogoutButton from './LogoutButton.js';
import Contents from './Contents.js';

class Header extends React.Component {
  render() {
    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand>My Favorite Books</Navbar.Brand>
          <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
          <NavItem><Link to="/About" className="nav-link">About</Link></NavItem>
        </Navbar>
        {
          this.props.auth0.isAuthenticated
            ?
            <LogoutButton/>
            :
            <LogonButton/>
        }
        {
          this.props.auth0.isAuthenticated
            ?
            <Contents/>
            :
            <p>Please login</p>
        }
      </>
    );
  }
}

export default withAuth0(Header);
