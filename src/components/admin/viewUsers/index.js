import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Table } from 'react-bootstrap';
import firebase from 'firebase';
import TiEdit from 'react-icons/lib/ti/edit';

export default class ViewUsers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      director: '',
      dataUsers: [],
      dataSchools: [],
    };
  }

  componentWillMount() {
    const dataUsers = [];
    const dataSchools = [];
    firebase.database().ref('users').on('value', users => {
      for (const [key, value] of Object.entries(users.val())) {
        dataUsers.push({ value, key });
      }
      this.setState({ dataUsers });
    });
    firebase.database().ref('/schools').on('value', data => {
      for (const [key, value] of Object.entries(data.val())) {
        dataSchools.push({ value, key });
      }
      this.setState({ dataSchools });
    });
  }

  render() {
    const { dataUsers, dataSchools } = this.state;
    return (
      <Col xs={12} mdOffset={2} md={8}>
        <h3>Lista de Usuarios</h3>
        <Table responsive>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Colegio</th>
              <th>Celular</th>
              <th>RUT</th>
              <th>Tipo</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {dataUsers && dataUsers.map((user, i) =>
              <tr key={i}>
                <td>{user.value.nombre}</td>
                <td>{user.value.email}</td>
                <td>{dataSchools && dataSchools.filter(school => school.key === user.value.school).map(school => school.value.nombre)}</td>
                <td>{user.value.celular}</td>
                <td>{user.value.rut}</td>
                <td>{user.value.tipo === 'SA' ? 'Super Administrador' : user.value.tipo === 'A' ? 'Administrador' : 'Profesor'}</td>
                <td style={{ cursor: 'pointer' }} onClick={() => this.props.history.push(`/admin/editUser/${user.key}`)}>Editar <TiEdit size={25} /></td>
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
