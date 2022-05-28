import { withAuth0 } from '@auth0/auth0-react';
import React from 'react';
import Profile from './Profile.js';

class Contents extends React.Component {

  getBooks = async () => {
    if(this.props.auth0.isAuthenticated) {
      const result = await this.props.auth0.getIdTokenClaims();
      const jwt = result.__raw;
      console.log(jwt);
    }
  }

  componentDidMount() {
    this.getBooks();
  }

  render () {
    return (
      <>
        <Profile />
        <h3>Contents!!</h3>
      </>
    );
  }
}

export default withAuth0(Contents);
