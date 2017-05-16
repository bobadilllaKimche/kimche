import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Table } from 'react-bootstrap';
import firebase from 'firebase';
import TiEdit from 'react-icons/lib/ti/edit';

// TODO: arreglar estado #next

export default class ViewConsejo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      director: '',
      dataUsers: [],
      dataSchools: [],
      loading: false,
      states: ['No visto', 'Visto y no editado', 'Visto y editado'],
    };
  }

  componentWillMount() {
    const dataUsers = [];
    const dataSchools = [];
    const dataConsejo = [];
    firebase.database().ref('consejos').on('value', consejo => {
      if (consejo.val()) {
        for (const [key, value] of Object.entries(consejo.val())) {
          dataConsejo.push({ value, key });
        }
      }
      this.setState({ dataConsejo });
    });
    firebase.database().ref('users').on('value', users => {
      for (const [key, value] of Object.entries(users.val())) {
        dataUsers.push({ value, key });
      }
      this.setState({ dataUsers });
    });
    firebase.database().ref('schools').on('value', data => {
      for (const [key, value] of Object.entries(data.val())) {
        dataSchools.push({ value, key });
      }
      this.setState({ dataSchools });
    });
  }

  render() {
    const { dataUsers, dataSchools, dataConsejo, states } = this.state;
    if (dataSchools) {
      dataSchools.map(school => {
        if (school.profesores) {
          return school.profesores.forEach(profesor => dataUsers.filter(user => user.key === profesor.key)[0].nombre);
        } else { return null; }
      });
    }
    return (
      <Col xs={12} mdOffset={2} md={8}>
        <h3>Lista de Avisos</h3>
        <Table responsive>
          <thead>
            <tr>
              <th>Colegio</th>
              <th>Fecha Creacion</th>
              <th>Estado</th>
              <th>Mensaje</th>
              <th>Tipo</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {dataConsejo && dataConsejo.map((consejo, i) =>
              <tr key={i}>
                <td>{dataSchools.filter(school => school.key === consejo.value.school)[0].value.nombre}</td>
                <td>{consejo.value.createData}</td>
                <td>{states[consejo.value.state]}</td>
                <td>{consejo.value.message}</td>
                <td>{consejo.value.tipo}</td>
                <td style={{ cursor: 'pointer' }} onClick={() => this.props.history.push(`/admin/editConsejo/${consejo.key}`)}>Editar <TiEdit size={25} /></td>
              </tr>
          )}
          </tbody>
        </Table>
      </Col>
    );
  }
}

ViewConsejo.propTypes = {
  history: PropTypes.object,
};
