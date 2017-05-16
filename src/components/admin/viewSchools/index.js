import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Table } from 'react-bootstrap';
import firebase from 'firebase';
import TiEdit from 'react-icons/lib/ti/edit';

export default class ViewSchools extends Component {

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
    const { dataUsers, dataSchools, dataUserKeys } = this.state;
    if (dataSchools) {
      dataSchools.map(school => {
        if (school.profesores) {
          return school.profesores.forEach(profesor => dataUsers[dataUserKeys.indexOf(profesor)].nombre);
        } else { return null; }
      });
    }
    return (
      <Col xs={12} mdOffset={2} md={8}>
        <h3>Lista de Colegios</h3>
        <Table responsive>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Director</th>
              <th>profesores</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {dataSchools && dataSchools.map((school, i) =>
              <tr key={i}>
                <td>{school.value.nombre}</td>
                <td>{school.value.director.map(director => dataUsers.filter(user => user.key === director).map(user => <p>{user.value.nombre}</p>))}</td>
                <td>{school.value.profesores && school.value.profesores.map((profesor, j) => <p key={j}>{dataUsers.filter(user => user.key === profesor.key)[0].value.nombre}</p>)}</td>
                <td style={{ cursor: 'pointer' }} onClick={() => this.props.history.push(`/admin/editSchool/${school.key}`)}>Editar <TiEdit size={25} /></td>
              </tr>
          )}
          </tbody>
        </Table>
      </Col>
    );
  }
}

ViewSchools.propTypes = {
  history: PropTypes.object,
};
