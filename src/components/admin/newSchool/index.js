import React, { Component } from 'react';
import { Col, Form, FormGroup, FormControl, Button, ControlLabel, Alert } from 'react-bootstrap';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Spinner from 'react-spinkit';

  // TODO: arreglar editar directores y profesores #urgent

export default class NewSchool extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      alert: false,
      newId: '',
      userDirector: [],
      userProfesores: [],
      directores: [],
      profesores: [],
      directorChange: false,
      profesorChange: false,
    };
  }

  componentWillMount() {
    const { editable, match } = this.props;
    if (editable) {
      firebase.database().ref(`/schools/${match.params.schoolId}`).on('value', data => {
        const school = data.val();
        this.setState({ nombre: school.nombre, directores: school.director, profesores: school.profesores });
      });
    }
    firebase.database().ref('/users').on('value', data => {
      const userDirector = [];
      const userProfesores = [];
      for (const [key, value] of Object.entries(data.val())) {
        if (value.tipo === 'A') {
          userDirector.push({ value: key, label: value.nombre });
        } else if (value.tipo === 'P') {
          userProfesores.push({ value: key, label: value.nombre });
        }
      }
      this.setState({ userDirector, userProfesores, loading: false });
    });
  }

  create(e) {
    e.preventDefault();
    const { nombre, directores, profesores } = this.state;
    if (nombre && directores) {
      this.setState({ loading: true });
      const key = firebase.database().ref('schools').push().key;
      firebase.database().ref(`schools/${key}`).update({
        nombre,
        director: directores.map(director => director.value),
        profesores: profesores && profesores.map(profesor => profesor.value),
      })
      .then(directores.map(director =>
        firebase.database().ref(`/users/${director.value}`).update({
          school: key,
        })
      ))
      .then(profesores.map(profesor =>
          firebase.database().ref(`/users/${profesor.value}`).update({
            school: key,
          })
        ))
      .then(this.setState({ loading: false, alert: `Colegio ${nombre} fue creado correctamente` }));
    }
  }

  edit(e) {
    e.preventDefault();
    const { nombre, directores, profesores, directorChange, profesorChange } = this.state;
    const schoolId = this.props.match.params.schoolId;
    console.log(directores);
    if (nombre && directores) {
      this.setState({ loading: true });
      firebase.database().ref(`/schools/${schoolId}`).update({
        nombre,
        director: directores.map(director => director.value),
        profesores: profesores ? profesores.map(profesor => profesor.value) : [],
      })
      .then(directores.map(director =>
        firebase.database().ref(`/users/${director.value}`).update({
          school: schoolId,
        })
      ))
      .then(profesores.map(profesor =>
          firebase.database().ref(`/users/${profesor.value}`).update({
            school: schoolId,
          })
        ))
      .then(this.setState({ loading: false, alert: `Colegio ${nombre} fue editado correctamente` }));
    }
  }

  render() {
    const { nombre, alert, loading, userDirector, userProfesores, directores, profesores } = this.state;
    const { editable } = this.props;
    return (
      <Col xs={12} mdOffset={2} md={8}>
        {loading ? <center><Spinner spinnerName="folding-cube" style={{ width: 100, height: 100, marginTop: '20%' }} /></center>
        :
          <div>
            <h1>{editable ? `Editar ${nombre}` : 'Crear Nuevo Colegio'}</h1>
            <Form horizontal onSubmit={e => this.create(e)}>
              <FormGroup controlId="formHorizontalEmail">
                <ControlLabel>Nombre del Colegio</ControlLabel>
                <FormControl type="input" placeholder="Nombre" onChange={e => this.setState({ nombre: e.target.value })} value={nombre} />
                <ControlLabel>Nombre de los Directores</ControlLabel>
                <Select multi placeholder="Seleccione los Directores del colegio" options={userDirector} onChange={directoresVal => this.setState({ directores: directoresVal, directorChange: true })} value={directores} />
                <ControlLabel>Seleccione los Profesores</ControlLabel>
                <Select multi placeholder="Seleccione los profesores del colegio" options={userProfesores} onChange={profesoresVal => this.setState({ profesores: profesoresVal, profesorChange: true })} value={profesores} />
              </FormGroup>
              <Button bsStyle="success" disabled={loading} onClick={e => { if (editable) { this.edit(e); } else { this.create(e); } }}>
                {editable ?
                  !loading ? 'Editar Colegio' : 'Editando Colegio...'
                  :
                  !loading ? 'Crear Colegio' : 'Creando Colegio...'
                }
              </Button>
            </Form>
            {alert.length > 0 &&
              <div>
                <hr />
                <Alert bsStyle="success" >
                  <h3>{alert}</h3>
                  <Button bsStyle="success" onClick={() => { if (editable) { this.setState({ alert: false }); } else { this.setState({ alert: false, nombre: '', director: false, profesores: [] }); } }}>
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

NewSchool.propTypes = {
  editable: PropTypes.boolean,
  match: PropTypes.object,
};
