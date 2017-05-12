import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Col, FormControl, Image, Button, Alert, InputGroup, Glyphicon, ControlLabel } from 'react-bootstrap';
import firebase from 'firebase';

import Logo from '../../img/logoChico.png';
import imgBlur from '../../img/schoolBlur.png';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false,
      recoveryView: false,
      messageRecovery: '',
    };
  }

  login(e) {
    e.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;
    if (email === 'profesor@kimche.co') this.props.history.push('/main/profesor');
    else if (email === 'director@kimche.co') this.props.history.push('/main/director');
    else {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => {
          this.setState({ user, loading: false });
          this.props.history.push('/admin');
        })
        .catch(error => this.setState({ error, loading: false }));
    }
  }

  recovery() {
    const { email } = this.state;
    firebase.auth().sendPasswordResetEmail(email).then(() => {
      this.setState({ messageRecovery: true });
    }, error => this.setState({ error }))
    .catch(error => this.setState({ error }));
  }

  renderMessage() {
    return (
      <div>
        <hr />
        <Alert bsStyle="success">
          <h4>Se ha enviado un mail para recuperar su contraseña</h4>
          <Button style={{ marginTop: 10 }}block bsStyle="success" onClick={() => this.setState({ messageRecovery: false })}>Ocultar Alerta</Button>
        </Alert>
      </div>
    );
  }

  renderError(error) {
    return (
      <Alert bsStyle="danger">
        <h4>No hemos podido iniciar sesión</h4>
        <p>Mensaje de error: {error.message}</p>
        <Button style={{ marginTop: 10 }}block bsStyle="primary" onClick={() => this.setState({ error: '' })}>Ocultar Alerta</Button>
      </Alert>
    );
  }

  render() {
    const { height } = this.props;
    const { loading, error, recoveryView, messageRecovery } = this.state;
    const firstContainer = {
      backgroundImage: `url(${imgBlur})`,
      minHeight: height - 40,
      backgroundSize: '100% 100%',
      backgroundPositionX: '50%',
      backgroundPositionY: '50%',
      backgroundPosition: '50% 50%',
      alignItems: 'center',
      display: 'flex',
    };
    return (
      <div style={firstContainer} >
        <Col sm={6} mdOffset={3} xs={10} xsOffset={1} style={{ backgroundColor: 'rgba(81,80,94,0.7)', padding: '5%', borderRadius: 20 }}>
          <Form onSubmit={a => this.login(a)} horizontal>
            <center>
              <Image src={Logo} responsive style={{ padding: '3%' }} />
            </center>
            {recoveryView ?
              <FormGroup controlId="formHorizontalEmail">
                <ControlLabel style={{ color: 'white' }}>Ingresa el mail de tu usuario</ControlLabel>
                <InputGroup style={{ paddingBottom: 10 }}>
                  <InputGroup.Addon><Glyphicon glyph="user" /></InputGroup.Addon>
                  <FormControl type="email" placeholder="Email" value={this.state.email} onChange={email => this.setState({ email: email.target.value })} />
                </InputGroup>
                <Button type="submit" bsStyle="success" block onClick={() => this.recovery()}>
                  Recuperar Contraseña
                </Button>
                {messageRecovery && this.renderMessage()}
              </FormGroup>
            :
              <FormGroup controlId="formHorizontalEmail">
                <InputGroup style={{ paddingBottom: 10 }}>
                  <InputGroup.Addon><Glyphicon glyph="user" /></InputGroup.Addon>
                  <FormControl type="email" placeholder="Email" value={this.state.email} onChange={email => this.setState({ email: email.target.value })} />
                </InputGroup>
                <InputGroup style={{ paddingBottom: 10 }}>
                  <InputGroup.Addon><Glyphicon glyph="lock" /></InputGroup.Addon>
                  <FormControl type="password" placeholder="Contraseña" value={this.state.password} onChange={password => this.setState({ password: password.target.value })} />
                </InputGroup>
                <Button type="submit" bsStyle="success" disabled={loading} block>
                  {loading ? 'Ingresando' : 'Ingresar'}
                </Button>
                <Button style={{ color: 'white' }} bsStyle="link" block onClick={() => this.setState({ recoveryView: true })}>Recuperar Contraseña</Button>
                {error.message && this.renderError(error)}
              </FormGroup>
            }
          </Form>
        </Col>
      </div>
    );
  }
}

Login.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  history: PropTypes.object,
};
