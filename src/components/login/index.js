import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Col, FormControl, Image, Button, Alert, InputGroup, Glyphicon } from 'react-bootstrap';
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
    const { loading, error } = this.state;
    console.log(this.state.user);
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
            </FormGroup>
            <Col xs={12}>
              {error.message && this.renderError(error)}
            </Col>
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
