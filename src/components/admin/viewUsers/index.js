import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Table } from 'react-bootstrap';
import firebase from 'firebase';
import TiEdit from 'react-icons/lib/ti/edit';

export default class ViewUsers extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
    const dataUsers = [];
    const dataUsersKeys = [];
    firebase.database().ref('users').on('value', users => {
      for (const [key, value] of Object.entries(users.val())) {
        dataUsers.push(value);
        dataUsersKeys.push(key);
      }
      this.setState({ dataUsers, dataUsersKeys });
    });
  }

  render() {
    const { dataUsers, dataUsersKeys } = this.state;
    return (
      <Col xs={12} mdOffset={2} md={8}>
        <h3>Lista de Usuarios</h3>
        <Table responsive>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Celular</th>
              <th>RUT</th>
              <th>Tipo</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {dataUsers && dataUsers.map((user, i) =>
              <tr key={i}>
                <td>{user.nombre}</td>
                <td>{user.email}</td>
                <td>{user.celular}</td>
                <td>{user.rut}</td>
                <td>{user.tipo}</td>
                <td style={{ cursor: 'pointer' }} onClick={() => this.props.history.push(`/admin/editUser/${dataUsersKeys[i]}`)}>Editar <TiEdit size={25} /></td>
              </tr>
          )}
          </tbody>
        </Table>
      </Col>
    );
  }
}

ViewUsers.propTypes = {
  history: PropTypes.object,
};
