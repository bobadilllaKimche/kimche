import React, { Component } from 'react';
import imgBlur from '../../img/schoolBlur.png';
import PropTypes from 'prop-types';
import { Form, FormGroup, Col, ControlLabel, FormControl, Image, Button } from 'react-bootstrap';
import Logo from '../../img/logoChico.png';
import { Link } from 'react-router-dom';
import Firebase from 'firebase';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  login(e) {
    e.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;
    Firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
      // this.props.router.push(`/main/${user.uid}`);

      // let validador = '';
      // let data = [];
      // lista.forEach(element => {
      //   console.log(element);
      //   if (element.ID !== validador) {
      //     Firebase.database().ref(`/protocolos/${validador}`).set(data);
      //     console.log(data);
      //     data = [];
      //     validador = element.ID;
      //   }
      //   data.push({ nombre: element.Atributo, tipo: element.Tipo, clase: element.Clase });
      // });
      const data = [];
      // lista.forEach(element => data.push({ nombre: element.Atributo, tipo: element.Tipo, clase: element.Clase }));
      Firebase.database().ref('/protocolos/5-1-1').update(data);
    }, error =>
      this.setState({ error, loading: false })
    );
    // this.setState({ loading: false });
  }

  render() {
    const { height } = this.props;
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
        <Col md={8} mdOffset={2} xs={10} xsOffset={1}>
          <Form horizontal style={{ backgroundColor: 'rgba(81,80,94,0.7)', padding: '5%', borderRadius: 20 }}>
            <center>
              <Image src={Logo} responsive style={{ padding: '3%' }} />
            </center>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2} style={{ color: 'white' }} value={this.state.email} onChange={email => this.setState({ email: email.target.value })} >
                Email
              </Col>
              <Col sm={9}>
                <FormControl type="email" placeholder="Email" />
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
                <Link to="main" >
                  <Button type="submit" bsStyle="success">
                    Iniciar Sesión
                  </Button>
                </Link>
              </Col>
            </FormGroup>
          </Form>
        </Col>
      </div>
    );
  }
}

Login.propTypes = {
  height: PropTypes.int,
  width: PropTypes.int,
};
