import React, { Component } from 'react';
import { Col, Form, FormGroup, FormControl, Button, ControlLabel, Alert } from 'react-bootstrap';
import firebase from 'firebase';
import PropTypes from 'prop-types';

export default class MyUSer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordView: false,
      loading: false,
      alert: '',
    };
  }

  componentWillMount() {
    this.fetchUser();
  }

  componentWillReceiveProps() {
    this.fetchUser();
  }

  fetchUser() {
    const { userData } = this.props;
    this.setState({
      nombre: userData.nombre,
      rut: userData.rut,
      email: userData.email,
      celular: userData.celular,
      tipo: userData.tipo,
    });
  }

  edit() {
    const { nombre, tipo, email, celular, rut } = this.state;
    this.setState({ loading: true });
    if (nombre && tipo && rut && email) {
      this.setState({ loading: true });
      firebase.database().ref(`/users/${this.props.user.uid}`).update({
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

  changePassword() {
    const { newPassword, confirmPassword, oldPassword } = this.state;
    const { user } = this.props;
    const credential = firebase.auth.EmailAuthProvider.credential(user.email, oldPassword);
    console.log(credential);
    if (newPassword === confirmPassword) {
      user.reauthenticate(credential).then(user.updatePassword(newPassword).then(this.setState({ loading: false, alert: 'Contraseña actualizada correctamente' }), error => this.setState({ error })));
    } else {
      this.setState({ loading: false, alert: 'Las contraseñas no coinciden, intentalo nuevamente' });
    }
  }

  render() {
    const { nombre, alert, email, loading, celular, rut, passwordView, newPassword, confirmPassword, oldPassword } = this.state;
    return (
      <Col xs={12} mdOffset={2} md={8}>
        <h1>Editar Mi Usuario</h1>
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
          <Button bsStyle={!loading ? 'success' : 'disabled'} onClick={e => this.edit(e)}>
            {!loading ? 'Editar Usuario' : 'Editando Usuario...'}
          </Button>
          <br />
          <br />
          {passwordView ?
            <FormGroup controlId="formHorizontalEmail">
              <ControlLabel>Contraseña Anterior</ControlLabel>
              <FormControl type="password" placeholder="Contraseña Anterior..." onChange={e => this.setState({ oldPassword: e.target.value })} value={oldPassword} />
              <ControlLabel>Nueva contraseña</ControlLabel>
              <FormControl type="password" placeholder="Contraseña Nueva..." onChange={e => this.setState({ newPassword: e.target.value })} value={newPassword} />
              <ControlLabel>Repita nueva contraseña</ControlLabel>
              <FormControl type="password" placeholder="Confirmar Contraseña.." onChange={e => this.setState({ confirmPassword: e.target.value })} value={confirmPassword} />
              <br />
              <Button bsStyle={!loading ? 'success' : 'disabled'} onClick={() => this.changePassword()}>Cambiar Contraseña</Button>
              <br />
              <br />
              <Button bsStyle={'default'} onClick={() => this.setState({ passwordView: false })}>Ocultar</Button>
            </FormGroup>
            :
            <Button bsStyle={!loading ? 'success' : 'disabled'} onClick={() => this.setState({ passwordView: true })}>Cambiar Contraseña</Button>
          }
        </Form>
        {alert.length > 0 &&
          <div>
            <hr />
            <Alert bsStyle="success" >
              <h3>{alert}</h3>
              <Button bsStyle="success" onClick={() => this.setState({ alert: '' }, this.fetchUser())}>
                Aceptar
              </Button>
            </Alert>
          </div>
        }
      </Col>
    );
  }
}

MyUSer.propTypes = {
  user: PropTypes.object,
  userData: PropTypes.object,
};
