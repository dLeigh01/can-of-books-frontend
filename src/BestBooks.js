import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import BookFormModal from './BookFormModal';
import Book from './Book.js';
import UpdateModal from './UpdateModal';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      createModalDisplaying: false,
      updateModalDisplaying: false,
      bookToUpdate: {},
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

  openCreateBookForm = () => {
    this.setState({
      createModalDisplaying: true,
    });
  }

  openUpdateBookForm = (bookObj) => {
    this.setState({
      updateModalDisplaying: true,
      bookToUpdate: bookObj,
    });
  }

  hideCreateModal = () => {
    this.setState({
      createModalDisplaying: false,
    });
  }

  hideUpdateModal = () => {
    this.setState({
      updateModalDisplaying: false,
    });
  }

  handleUpdate = async (bookObj) => {
    try {
      const updatedBooks = this.state.books.map(existingBook => {
        if (existingBook._id === bookObj._id) {
          return bookObj;
        } else {
          return existingBook;
        }
      });
      // console.log(updatedBooks);
      await axios.put(`${process.env.REACT_APP_SERVER}/books/${bookObj._id}`, bookObj);
      this.setState({
        books: updatedBooks,
      });
    } catch (error) {
      console.error(error);
    }
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
            showUpdate={this.openUpdateBookForm}
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
        <Button onClick={this.openCreateBookForm}>Add Books</Button>
        <BookFormModal
          hideModal={this.hideCreateModal}
          createBook={this.createBook}
          modalDisplaying={this.state.createModalDisplaying}
        />
        <UpdateModal
          hideModal={this.hideUpdateModal}
          modalDisplaying={this.state.updateModalDisplaying}
          updateBook={this.handleUpdate}
          bookToUpdate={this.state.bookToUpdate}
        />
      </>
    );
  }
}

export default BestBooks;
