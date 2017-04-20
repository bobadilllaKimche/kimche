import React, { Component } from 'react';
import imgBlur from '../../img/schoolBlur.png';
import PropTypes from 'prop-types';
import { Form, FormGroup, Col, ControlLabel, FormControl, Image, Button, Alert } from 'react-bootstrap';
import Logo from '../../img/logoChico.png';
// import { Link } from 'react-router-dom';
import firebase from 'firebase';

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
          this.props.history.push('/main');
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
    const firstContainer = {
      backgroundImage: `url(${imgBlur})`,
      minHeight: height - 40,
      backgroundPositionX: '50%',
      backgroundPositionY: '50%',
      backgroundPosition: '50% 50%',
      alignItems: 'center',
      display: 'flex',
    };
    return (
      <div style={firstContainer} >
        <Col md={8} mdOffset={2} xs={10} xsOffset={1} style={{ backgroundColor: 'rgba(81,80,94,0.7)', padding: '5%', borderRadius: 20 }}>
          <Form onSubmit={a => this.login(a)} horizontal>
            <center>
              <Image src={Logo} responsive style={{ padding: '3%' }} />
            </center>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2} style={{ color: 'white' }} >
                Email
              </Col>
              <Col sm={9}>
                <FormControl type="email" placeholder="Email" value={this.state.email} onChange={email => this.setState({ email: email.target.value })} />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2} style={{ color: 'white' }}>
                Contraseña
              </Col>
              <Col sm={9}>
                <FormControl type="password" placeholder="Contraseña" value={this.state.password} onChange={password => this.setState({ password: password.target.value })} />
              </Col>
            </FormGroup>


            <FormGroup>
              <Col smOffset={2} sm={10}>
                {/* <Link to="main" > */}
                <Button type="submit" bsStyle="success" disabled={loading}>
                  {loading ? 'Ingresando' : 'Ingresar'}
                </Button>
                {/* </Link> */}
              </Col>
            </FormGroup>
            <Col xs={12} mdOffset={1} md={10}>
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
