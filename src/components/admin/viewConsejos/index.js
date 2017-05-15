import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Table } from 'react-bootstrap';
import firebase from 'firebase';
import TiEdit from 'react-icons/lib/ti/edit';

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
    const dataSchoolsKeys = [];
    const dataUserKeys = [];
    const dataConsejo = [];
    const dataConsejoKeys = [];
    firebase.database().ref('consejos').on('value', consejo => {
      for (const [key, value] of Object.entries(consejo.val())) {
        dataConsejo.push(value);
        dataConsejoKeys.push(key);
      }
      this.setState({ dataConsejo, dataConsejoKeys });
    });
    firebase.database().ref('users').on('value', users => {
      for (const [key, value] of Object.entries(users.val())) {
        dataUsers.push(value);
        dataUserKeys.push(key);
      }
      this.setState({ dataUsers, dataUserKeys });
    });
    firebase.database().ref('schools').on('value', data => {
      for (const [key, value] of Object.entries(data.val())) {
        dataSchools.push(value);
        dataSchoolsKeys.push(key);
      }
      this.setState({ dataSchools, dataSchoolsKeys });
    });
  }

  render() {
    const { dataUsers, dataSchools, dataSchoolsKeys, dataUserKeys, dataConsejo, dataConsejoKeys, states } = this.state;
    if (dataSchools) {
      dataSchools.map(school => {
        if (school.profesores) {
          return school.profesores.forEach(profesor => dataUsers[dataUserKeys.indexOf(profesor)].nombre);
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
                <td>{dataSchools[dataSchoolsKeys.indexOf(consejo.school)].nombre}</td>
                <td>{consejo.createData}</td>
                <td>{states[consejo.state]}</td>
                <td>{consejo.message}</td>
                <td>{consejo.tipo}</td>
                <td style={{ cursor: 'pointer' }} onClick={() => this.props.history.push(`/admin/editConsejo/${dataConsejoKeys[i]}`)}>Editar <TiEdit size={25} /></td>
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
