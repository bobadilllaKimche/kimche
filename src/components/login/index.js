import React, { Component } from 'react';
import imgBlur from '../../img/schoolBlur.png';
import PropTypes from 'prop-types';
import { Form, FormGroup, Col, ControlLabel, FormControl, Image, Button } from 'react-bootstrap';
import Logo from '../../img/logoChico.png';
import { Link } from 'react-router-dom';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.handleResize());
  }

  handleResize() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    const { height } = this.state;
    const firstContainer = {
      backgroundImage: `url(${imgBlur})`,
      minHeight: height - 40,
      backgroundPositionX: '50%',
      backgroundPositionY: '50%',
      backgroundPosition: '50% 50%',
      alignItems: 'center',
      display: 'flex',
      // filter: 'grayscale(70%) blur(4px)',
      // zIndex: -1,
    };
    return (
      <div style={firstContainer} >
        <Col md={8} mdOffset={2} xs={10} xsOffset={1}>
          <Form horizontal style={{ backgroundColor: 'rgba(81,80,94,0.7)', padding: 20, borderRadius: 20 }}>
            <center>
              <Image src={Logo} responsive style={{ padding: 40 }} />
            </center>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2} style={{ color: 'white' }}>
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
                <FormControl type="password" placeholder="Contraseña" />
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
