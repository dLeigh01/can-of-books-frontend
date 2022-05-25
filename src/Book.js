'use strict';

import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';

class Book extends React.Component {

  handleDelete = () => {
    this.props.onDelete(this.props.bookObj._id);
  }

  render () {
    return(
      <>
        <Carousel.Caption>
          <h5>{this.props.bookObj.title}</h5>
          <p>{this.props.bookObj.description}</p>
          <Button onClick={this.handleDelete}>Delete</Button>
        </Carousel.Caption>
        <img src="https://images-na.ssl-images-amazon.com/images/I/41gHG-a2OEL._SX331_BO1,204,203,200_.jpg" alt="movie cover art" />
      </>
    );
  }
}

export default Book;
