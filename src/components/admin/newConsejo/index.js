import React, { Component } from 'react';
import { Col, Form, FormGroup, FormControl, Button, ControlLabel, Alert, Table } from 'react-bootstrap';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Spinner from 'react-spinkit';
import FaClose from 'react-icons/lib/fa/close';
import moment from 'moment';

// TODO: Mensaje, Profesor/Director **, fecha, tipo, porque paso, accion, visto, estado

export default class newConsejo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      alert: false,
      error: false,
      newId: 0,
      users: [],
      usersData: [],
      schoolsData: [],
      school: null,
      rowTable: [],
      tipoData: [
        { label: 'felicitar', value: 'felicitar' },
        { label: 'apoyar', value: 'apoyar' },
        { label: 'conservar', value: 'conservar' },
        { label: 'corregir', value: 'corregir' },
      ],
    };
  }

  componentWillMount() {
    const { editable, match } = this.props;
    firebase.database().ref('/schools').on('value', data => {
      const schoolsData = [];
      for (const [key, value] of Object.entries(data.val())) { schoolsData.push({ value: key, label: value.nombre }); }
      this.setState({ schoolsData });
    });
    firebase.database().ref('/users').on('value', data => {
      const usersData = [];
      const usersDataKeys = [];
      for (const [key, value] of Object.entries(data.val())) { if (value.tipo === 'A' || value.tipo === 'P') usersData.push({ value: key, data: value }); }
      this.setState({ usersData, loading: false, usersDataKeys });
    });
    if (editable) {
      firebase.database().ref(`/consejos/${match.params.consejoId}`).on('value', data => {
        const aviso = data.val();
        this.setState({ school: aviso.school, users: aviso.users, message: aviso.message, rowTable: aviso.rowTable, state: aviso.state, tipo: aviso.tipo, newId: match.params.consejoId });
        this.changeSchool(aviso.school);
      });
    } else {
      firebase.database().ref('/consejos').on('value', data => {
        this.setState({ newId: data.val() === null ? 1 : data.val().length + 1 });
      });
    }
  }

  create(e) {
    e.preventDefault();
    const { school, newId, users, message, rowTable, tipo } = this.state;
    if (school && users && message) {
      this.setState({ loading: true });
      firebase.database().ref(`/consejos/${newId}`).set({
        school: school.value,
        users: users.map(p => p.value),
        message,
        rowTable,
        tipo: tipo.value,
        state: 0,
        createData: moment().format('DD-MM-YYYY, h:mm a'),
        action: [],
        diagnostico: [],
      })
      .then(this.setState({ loading: false, alert: 'Aviso creado correctamente', newId: newId + 1 }));
    } else {
      this.setState({ loading: false, error: 'Seleccione almenos un colegio, usuario y mensaje para crear el aviso' });
    }
  }

  edit(e) {
    e.preventDefault();
    const { school, newId, users, message, rowTable, tipo } = this.state;
    if (school && users && message) {
      this.setState({ loading: true });
      firebase.database().ref(`/consejos/${newId}`).update({
        school: school.value,
        users: users.map(p => p.value),
        message,
        rowTable,
        tipo: tipo.value,
      })
      .then(this.setState({ loading: false, alert: 'Aviso editado correctamente' }));
    } else {
      this.setState({ loading: false, error: 'Seleccione almenos un colegio, usuario y mensaje para editar el aviso' });
    }
  }

  changeSchool(school) {
    const { usersData } = this.state;
    const { editable } = this.props;
    if (school !== null) {
      const userListInfo = [];
      const valueSchool = editable ? school : school.value;
      usersData.filter(user => `${user.data.school}` === valueSchool).forEach(user => userListInfo.push({ value: user.value, label: user.data.nombre }));
      this.setState({ school, userListInfo });
    } else this.setState({ school });
  }

  render() {
    const { message, alert, loading, userListInfo, users, schoolsData, school, tipoData, tipo, rowTable, error } = this.state;
    const { editable } = this.props;
    return (
      <Col xs={12} mdOffset={2} md={8}>
        {loading ? <center><Spinner spinnerName="folding-cube" style={{ width: 100, height: 100, marginTop: '20%' }} /></center>
        :
          <div>
            <h1>{editable ? 'Editar Consejo' : 'Crear Nuevo Consejo'}</h1>
            <Form horizontal onSubmit={e => this.create(e)}>
              <FormGroup controlId="formHorizontalEmail">
                <ControlLabel>Colegio</ControlLabel>
                <Select name="form-field-name" placeholder="Seleccione el colegio..." options={schoolsData} onChange={schoolVal => this.changeSchool(schoolVal)} value={school} />
                <ControlLabel>Usuarios Involucrados</ControlLabel>
                <Select disabled={school === null} multi name="form-field-name" placeholder="Seleccione los Involucrados..." options={userListInfo} onChange={userVal => this.setState({ users: userVal })} value={users} />
                <ControlLabel>Tipo de Mensaje</ControlLabel>
                <Select name="form-field-name" placeholder="Seleccione el tipo de Mensaje..." options={tipoData} onChange={tipoval => this.setState({ tipo: tipoval })} value={tipo} />
                <ControlLabel>Escriba el Mensaje</ControlLabel>
                <FormControl type="input" placeholder="Mensaje..." onChange={e => this.setState({ message: e.target.value })} value={message} />
              </FormGroup>
              <h3>{editable ? 'Editar' : 'Crear'} tabla de datos</h3>
              <Table>
                <thead>
                  <tr>
                    <th>Alumno</th>
                    <th>Dato</th>
                    <th>Descripción</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {rowTable.map((row, i) =>
                    <tr key={i} >
                      <td><FormControl type="input" value={row.alumno} onChange={e => { rowTable[i].alumno = e.target.value; this.setState({ rowTable }); }} /></td>
                      <td><FormControl type="input" value={row.data} onChange={e => { rowTable[i].data = e.target.value; this.setState({ rowTable }); }} /></td>
                      <td><FormControl type="input" value={row.description} onChange={e => { rowTable[i].description = e.target.value; this.setState({ rowTable }); }} /></td>
                      <td style={{ textAlign: 'center' }} onClick={() => { rowTable.splice(i, 1); this.setState({ rowTable }); }}><FaClose /></td>
                    </tr>
                  )}
                </tbody>
              </Table>
              <Button onClick={() => { rowTable.push({ alumno: '', data: '', description: '' }); this.setState({ }); }}>Nueva Fila [+]</Button>
              <br />
              <br />
              <Button bsStyle="success" disabled={loading} onClick={e => { if (editable) { this.edit(e); } else { this.create(e); } }}>
                {editable ?
                  !loading ? 'Editar Consejo' : 'Editando Consejo...'
                  :
                  !loading ? 'Crear Consejo' : 'Creando Consejo...'
                }
              </Button>
            </Form>
            {alert.length > 0 &&
              <div>
                <hr />
                <Alert bsStyle="success" >
                  <h3>{alert}</h3>
                  <Button bsStyle="success" onClick={() => { if (editable) { this.setState({ alert: false }); } else { this.setState({ alert: false, school: false, users: [], message: '', rowTable: [] }); } }}>
                    Aceptar
                  </Button>
                </Alert>
              </div>
            }
            {error.length > 0 &&
              <div>
                <hr />
                <Alert bsStyle="warning" >
                  <h3>{error}</h3>
                  <Button bsStyle="warning" onClick={() => this.setState({ error: false })}>
                    Aceptar
                  </Button>
                </Alert>
              </div>
            }
          </div>
        }
      </Col>
    );
  }
}

newConsejo.propTypes = {
  editable: PropTypes.bool,
  match: PropTypes.object,
};
