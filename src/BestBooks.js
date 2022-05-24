import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  // Not sure if we can use componentDidMount as arrow function
  componentDidMount = async () => {
    let incomingBooks = await axios.get(`${process.env.REACT_APP_SERVER}/books`);
    this.setState({
      books: incomingBooks.data,
    });
  }

  render() {

    /* TODO: render all the books in a Carousel */
    let booksArr = this.state.books.map(bookObj => {
      return (
        <Carousel.Item>
          <Carousel.Caption>
            <h5>{bookObj.title}</h5>
            <p>{bookObj.description}</p>
          </Carousel.Caption>
          <img src="https://images-na.ssl-images-amazon.com/images/I/41gHG-a2OEL._SX331_BO1,204,203,200_.jpg" alt="movie cover art" />
        </Carousel.Item>
      );
    });

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <Carousel>
            {booksArr}
          </Carousel>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    );
  }
}

export default BestBooks;
