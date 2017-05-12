import React, { Component } from 'react';
import { Col, Form, FormGroup, FormControl, Button, ControlLabel, Alert } from 'react-bootstrap';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import Select from 'react-select';

export default class NewSchool extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      alert: false,
      newId: '',
      userList: [],
      director: false,
      profesores: [],
    };
  }

  componentWillMount() {
    firebase.database().ref('/schools').on('value', data => {
      this.setState({ newId: data.val() === null ? 0 : data.val().length });
    });
    firebase.database().ref('/users').on('value', data => {
      const users = [];
      for (const [key, value] of Object.entries(data.val())) {
        users.push({ value: key, label: value.nombre });
      }
      this.setState({ users });
    });
  }

  create(e) {
    e.preventDefault();
    const { nombre, director, profesores, newId } = this.state;
    if (nombre && director) {
      this.setState({ loading: true });
      firebase.database().ref(`/schools/${newId}`).set({
        nombre,
        director: director.value,
        profesores: profesores.map(profesor => profesor.value),
      })
      .then(this.setState({ loading: false, alert: `Colegio ${nombre} fue creado correctamente`, newId: newId + 1 }));
    }
  }

  render() {
    const { nombre, alert, loading, users, director, profesores } = this.state;
    return (
      <Col xs={12} mdOffset={2} md={8}>
        <h1>Crear Nuevo Colegio</h1>
        <Form horizontal onSubmit={e => this.create(e)}>
          <FormGroup controlId="formHorizontalEmail">
            <ControlLabel>Nombre del Colegio</ControlLabel>
            <FormControl type="input" placeholder="Nombre" onChange={e => this.setState({ nombre: e.target.value })} value={nombre} />
            <ControlLabel>Nombre del Director</ControlLabel>
            <Select name="form-field-name" placeholder="Seleccione el Director del colegio" options={users} onChange={directorVal => this.setState({ director: directorVal })} value={director} />
            <ControlLabel>Seleccione los Profesores</ControlLabel>
            <Select multi name="form-field-name" placeholder="Seleccione los profesores del colegio" options={users} onChange={profesoresVal => this.setState({ profesores: profesoresVal })} value={profesores} />
          </FormGroup>
          <Button bsStyle="success" disabled={loading} onClick={e => this.create(e)}>
            {!loading ? 'Crear Colegio' : 'Creando Colegio...'}
          </Button>
        </Form>
        {alert.length > 0 &&
          <div>
            <hr />
            <Alert bsStyle="success" >
              <h3>{alert}</h3>
              <Button bsStyle="success" onClick={() => this.setState({ alert: false, nombre: '', director: false, profesores: [] })}>
                Aceptar
              </Button>
            </Alert>
          </div>
        }
      </Col>
    );
  }
}

NewSchool.propTypes = {
};
