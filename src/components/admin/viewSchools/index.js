import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Table } from 'react-bootstrap';
import firebase from 'firebase';
import TiEdit from 'react-icons/lib/ti/edit';

export default class viewSchools extends Component {

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
    const dataSchoolsKeys = [];
    const dataUserKeys = [];
    firebase.database().ref('users').on('value', users => {
      for (const [key, value] of Object.entries(users.val())) {
        dataUsers.push(value);
        dataUserKeys.push(key);
      }
      this.setState({ dataUsers, dataUserKeys });
    });
    firebase.database().ref('/schools').on('value', data => {
      for (const [key, value] of Object.entries(data.val())) {
        dataSchools.push(value);
        dataSchoolsKeys.push(key);
      }
      this.setState({ dataSchools, dataSchoolsKeys });
    });
  }

  render() {
    const { dataUsers, dataSchools, dataSchoolsKeys, dataUserKeys } = this.state;
    dataSchools.map(school => school.profesores.forEach(profesor => dataUsers[dataUserKeys.indexOf(profesor)].nombre));
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
                <td>{school.nombre}</td>
                <td>{dataUsers[dataUserKeys.indexOf(school.director)].nombre}</td>
                <td>{school.profesores.map(profesor => <p>{dataUsers[dataUserKeys.indexOf(profesor)].nombre}</p>)}</td>
                <td style={{ cursor: 'pointer' }} onClick={() => this.props.history.push(`/admin/editSchool/${dataSchoolsKeys[i]}`)}>Editar <TiEdit size={25} /></td>
              </tr>
          )}
          </tbody>
        </Table>
      </Col>
    );
  }
}

viewSchools.propTypes = {
  history: PropTypes.object,
};
