import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';

export default class Admin extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <Col xs={12} mdOffset={2} md={8}>
        <h2>Bienvenido {this.props.user.email} - Super-Administrador</h2>
      </Col>
    );
  }
}

Admin.propTypes = {
  user: PropTypes.object,
};
