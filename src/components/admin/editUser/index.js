import React, { Component } from 'react';
import { Col, Form, FormGroup, FormControl, Button, ControlLabel, Alert } from 'react-bootstrap';
import firebase from 'firebase';
import PropTypes from 'prop-types';

export default class EditUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      alert: false,
    };
  }

  componentWillMount() {
    firebase.database().ref(`users/${this.props.match.params.editableUser}`).on('value', user => this.setState({
      nombre: user.val().nombre,
      rut: user.val().rut,
      email: user.val().email,
      celular: user.val().celular,
      tipo: user.val().tipo,
    }));
  }

  edit(e) {
    e.preventDefault();
    const { nombre, tipo, email, celular, rut } = this.state;
    this.setState({ loading: true });
    if (nombre && tipo && rut && email) {
      this.setState({ loading: true });
      firebase.database().ref(`/users/${this.props.match.params.editableUser}`).update({
        email,
        nombre,
        visibility: true,
        tipo,
        rut,
        celular,
      })
      .then(this.setState({ loading: false, alert: `Usuario ${nombre} fue editado correctamente` }));
    }
  }

  render() {
    const { nombre, alert, tipo, email, loading, celular, rut } = this.state;
    return (
      <Col xs={12} mdOffset={2} md={8}>
        <h1>Editar Usuario</h1>
        <Form horizontal onSubmit={e => this.edit(e)}>
          <FormGroup controlId="formHorizontalEmail">
            <ControlLabel>Nombre</ControlLabel>
            <FormControl type="input" placeholder="Nombre" onChange={e => this.setState({ nombre: e.target.value })} value={nombre} />
          </FormGroup>
          <FormGroup controlId="formHorizontalEmail">
            <ControlLabel>Email</ControlLabel>
            <FormControl type="input" placeholder="Email" onChange={e => this.setState({ email: e.target.value })} value={email} />
          </FormGroup>
          <FormGroup controlId="formHorizontalEmail">
            <ControlLabel>RUT</ControlLabel>
            <FormControl type="input" placeholder="RUT" onChange={e => this.setState({ rut: e.target.value })} value={rut} />
            <p><small>*Agregue el RUT sin guión</small></p>
          </FormGroup>
          <FormGroup controlId="formHorizontalEmail">
            <ControlLabel>Telefono de Contacto</ControlLabel>
            <FormControl type="input" placeholder="Celular" onChange={e => this.setState({ celular: e.target.value })} value={celular} />
          </FormGroup>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Tipo de Usuario</ControlLabel>
            <FormControl componentClass="select" value={tipo} onChange={e => this.setState({ tipo: e.target.value })}>
              <option value="" hidden defaultValue>Eliga un tipo de Usuario</option>
              <option value="SA">Super-Administrador</option>
              <option value="A">Administrador de Colegio</option>
              <option value="P">Profesor</option>
            </FormControl>
          </FormGroup>
          <p><small>* La contraseña sera el rut</small></p>
          <Button bsStyle="success" disabled={loading} onClick={e => this.edit(e)}>
            {!loading ? 'Editar Usuario' : 'Editando Usuario...'}
          </Button>
        </Form>
        {alert.length > 0 &&
          <div>
            <hr />
            <Alert bsStyle="success" >
              <h3>{alert}</h3>
              <Button bsStyle="success" onClick={() => this.setState({ alert: false })}>
                Aceptar
              </Button>
            </Alert>
          </div>
        }
      </Col>
    );
  }
}

EditUser.propTypes = {
  secondaryApp: PropTypes.object,
  match: PropTypes.object,
};
