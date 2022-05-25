import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import BookFormModal from './BookFormModal';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      modalDisplaying: false,
    };
  }

  componentDidMount = async () => {
    let incomingBooks = await axios.get(`${process.env.REACT_APP_SERVER}/books`);
    this.setState({
      books: incomingBooks.data,
    });
  }

  createBook = async (bookInfo) => {
    const response = await axios.post(`${process.env.REACT_APP_SERVER}/books`, bookInfo);
    const newBook = response.data;
    this.setState({
      books: [...this.state.books, newBook],
    });
  }

  openBookForm = () => {
    this.setState({
      modalDisplaying: true,
    });
  }

  hideModal = () => {
    this.setState({
      modalDisplaying: false,
    });
  }

  render() {

    /* TODO: render all the books in a Carousel */
    let booksArr = this.state.books.map(bookObj => {
      return (
        <Carousel.Item key={bookObj._id}>
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
          <>
            <Carousel>
              {booksArr}
            </Carousel>
          </>
        ) : (
          <h3>No Books Found :(</h3>
        )}
        <Button onClick={this.openBookForm}>Add Books</Button>
        <BookFormModal hideModal={this.hideModal} createBook={this.createBook} modalDisplaying={this.state.modalDisplaying}/>
      </>
    );
  }
}

export default BestBooks;
