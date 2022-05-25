'use strict';

import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class BookFormModal extends React.Component {

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createBook({
      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.checked,
    });
  }

  render() {
    return (
      <Modal show={this.props.modalDisplaying} onHide={this.props.hideModal}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Title>Add New Book!</Modal.Title>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId='title'>
            <Form.Label>Title</Form.Label>
            <Form.Control type='name' placeholder='Book Title (eg The Hobbit)'></Form.Control>
          </Form.Group>
          <Form.Group controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control type='name' placeholder='Place your description here'></Form.Control>
          </Form.Group>
          <Form.Group controlId='status'>
            <Form.Label>Fiction</Form.Label>
            <Form.Check type='checkbox'/>
          </Form.Group>
          <Button type='submit'>Submit</Button>
        </Form>
      </Modal>
    );
  }
}

export default BookFormModal;
