import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import BookFormModal from './BookFormModal';
import Book from './Book.js';

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

  handleDelete = async (bookId) => {
    const url = `${process.env.REACT_APP_SERVER}/books/${bookId}`;
    try {
      await axios.delete(url);
      const filteredBooks = this.state.books.filter(book => bookId !== book._id);
      this.setState({books: filteredBooks});
    } catch (error) {
      console.error(error);
    }
  }

  render() {

    let booksArr = this.state.books.map(bookObj => {
      return (
        <Carousel.Item key={bookObj._id}>
          <Book
            bookObj={bookObj}
            onDelete={this.handleDelete}
          />
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
