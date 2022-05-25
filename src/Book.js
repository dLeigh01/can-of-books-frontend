'use strict';

import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';

class Book extends React.Component {

  handleDelete = () => {
    this.props.onDelete(this.props.bookObj._id);
  }

  handleUpdate = () => {
    this.props.showUpdate(this.props.bookObj);
  }

  render () {
    return(
      <>
        <Carousel.Caption>
          <h5>{this.props.bookObj.title}</h5>
          <p>{this.props.bookObj.description}</p>
          {
            this.props.bookObj.status ?
              <p>Fiction</p> :
              <p>Non-Fiction</p>
          }
          <Button onClick={this.handleUpdate}>Update</Button>
          <Button onClick={this.handleDelete}>Delete</Button>
        </Carousel.Caption>
        <img src="https://images.unsplash.com/photo-1513185041617-8ab03f83d6c5?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070" alt="movie cover art" />
      </>
    );
  }
}

export default Book;
