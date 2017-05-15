import React, { Component } from 'react';
import { Col, Form, FormGroup, FormControl, Button, ControlLabel, Alert } from 'react-bootstrap';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Spinner from 'react-spinkit';

export default class NewSchool extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      alert: false,
      newId: '',
      userDirector: [],
      userProfesores: [],
      director: false,
      profesores: [],
    };
  }

  componentWillMount() {
    const { editable, match } = this.props;
    if (editable) {
      firebase.database().ref(`/schools/${match.params.schoolId}`).on('value', data => {
        const school = data.val();
        console.log(school);
        this.setState({ nombre: school.nombre, director: school.director, profesores: school.profesores });
      });
    } else {
      firebase.database().ref('/schools').on('value', data => {
        this.setState({ newId: data.val() === null ? 1 : data.val().length + 1 });
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
    const { nombre, director, profesores, newId } = this.state;
    if (nombre && director) {
      this.setState({ loading: true });
      firebase.database().ref(`/schools/${newId}`).set({
        nombre,
        director: director.value,
        profesores: profesores.map(profesor => profesor.value),
      })
      .then(firebase.database().ref(`/users/${director.value}`).update({
        school: newId,
      }))
      .then(profesores.map(profesor =>
          firebase.database().ref(`/users/${profesor.value}`).update({
            school: newId,
          })
        ))
      .then(this.setState({ loading: false, alert: `Colegio ${nombre} fue creado correctamente`, newId: newId + 1 }));
    }
  }

  edit(e) {
    e.preventDefault();
    const { nombre, director, profesores } = this.state;
    const schoolId = this.props.match.params.schoolId;
    if (nombre && director) {
      this.setState({ loading: true });
      firebase.database().ref(`/schools/${schoolId}`).update({
        nombre,
        director: typeof director === 'string' ? director : director.value,
        profesores: profesores.map(profesor => { if (typeof profesor === 'string') { return profesor; } else { return profesor.value; } }),
      })
      .then(firebase.database().ref(`/users/${typeof director === 'string' ? director : director.value}`).update({
        school: schoolId,
      }))
      .then(profesores.map(profesor =>
          firebase.database().ref(`/users/${typeof profesor === 'string' ? profesor : profesor.value}`).update({
            school: schoolId,
          })
        ))
      .then(this.setState({ loading: false, alert: `Colegio ${nombre} fue editado correctamente` }));
    }
  }

  render() {
    const { nombre, alert, loading, userDirector, userProfesores, director, profesores } = this.state;
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
                <ControlLabel>Nombre del Director</ControlLabel>
                <Select name="form-field-name" placeholder="Seleccione el Director del colegio" options={userDirector} onChange={directorVal => this.setState({ director: directorVal })} value={director} />
                <ControlLabel>Seleccione los Profesores</ControlLabel>
                <Select multi name="form-field-name" placeholder="Seleccione los profesores del colegio" options={userProfesores} onChange={profesoresVal => this.setState({ profesores: profesoresVal })} value={profesores} />
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
