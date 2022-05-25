'use strict';

import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class UpdateModal extends React.Component {

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.updateBook({
      title: event.target.title.value || this.props.bookToUpdate.title,
      description: event.target.description.value || this.props.bookToUpdate.description,
      status: event.target.status.checked,
      _id: this.props.bookToUpdate._id,
      __v: this.props.bookToUpdate.__v,
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
            <Form.Control type='name' placeholder={this.props.bookToUpdate.title}></Form.Control>
          </Form.Group>
          <Form.Group controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control type='name' placeholder={this.props.bookToUpdate.description}></Form.Control>
          </Form.Group>
          <Form.Group controlId='status'>
            <Form.Label>Fiction</Form.Label>
            <Form.Check type='checkbox' defaultChecked={this.props.bookToUpdate.status}/>
          </Form.Group>
          <Button type='submit'>Submit</Button>
        </Form>
      </Modal>
    );
  }
}

export default UpdateModal;
