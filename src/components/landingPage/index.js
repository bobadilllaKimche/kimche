import React, { Component } from 'react';
import { Col, Image, Form, FormGroup, FormControl, ControlLabel, Button, Grid } from 'react-bootstrap';
import { Element } from 'react-scroll';
import landingImage from '../../img/landingImage.png';
import Logo from '../../img/logoChico.png';
import FaCubes from 'react-icons/lib/fa/cubes';
import FaStreetView from 'react-icons/lib/fa/street-view';
import FaCommentsO from 'react-icons/lib/fa/comments-o';
import PropTypes from 'prop-types';

export default class LandingPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      navbarButton: false,
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

  renderMain() {
    const { height, width } = this.state;
    const firstContainer = {
      backgroundImage: `url(${landingImage})`,
      minHeight: height,
      backgroundSize: width > 900 ? '100% 100%' : 'cover',
      backgroundPositionX: width > 900 ? '50%' : '80%',
      backgroundPositionY: width > 900 ? '50%' : '80%',
      backgroundPosition: width > 900 ? '50% 50%' : '80% 80%',
      alignItems: 'center',
      display: 'flex',
    };
    return (
      <div style={firstContainer}>
        <Col xs={10} md={4} mdOffset={3} style={{ color: 'white', alignItems: 'center' }}>
          <Image src={Logo} />
          <br />
          <br />
          <h1>Big-Data en Educación</h1>
          <br />
          <p>Plataforma colaborativa de Big-Data & Recomendaciones. Desarrollada para reducir los ciclos de feedback de información crítica de las escuelas.</p>
        </Col>
      </div>
    );
  }

  renderFuncionalidades() {
    return (
      <Grid fluid style={{ backgroundColor: 'rgb(69, 110, 114)', paddingTop: '10%', paddingBottom: '10%' }}>
        <Col xs={12}>
          <h3 style={{ color: 'white', textAlign: 'center', marginBottom: 20 }}>~QUE HACEMOS~</h3>
        </Col>
        <Col xs={12} md={10} mdOffset={1}>
          <Col md={4}>
            <div>
              <hr />
              <h4>
                <FaCubes size={30} style={{ marginRight: 10 }} />
                BIG DATA
              </h4>
              <hr />
            </div>
            <div>
              <p style={{ color: 'white', textAlign: 'justify' }}>
                Consolidamos los datos de los alumnos de todos los  establecimientos educacionales y el feedback de los resultados
                de las acciones realizadas por los profesores, inspectores y directores.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div>
              <hr />
              <h4>
                <FaCommentsO size={30} style={{ marginRight: 10 }} />
                COLABORACIÓN
              </h4>
              <hr />
              <p style={{ color: 'white', textAlign: 'justify' }}>
                Usamos el conocimiento colectivo de la comunidad usuaria de profesores, inspectores y directores para retroalimentar nuestro
                motor de análisis predictivo y mejora continua.
              </p>
            </div>
          </Col>
          <Col md={4}>
            <div>
              <hr />
              <h4>
                <FaStreetView size={30} style={{ marginRight: 10 }} />
                RECOMENDACIONES
              </h4>
              <hr />
              <p style={{ color: 'white', textAlign: 'justify' }}>
                Desarrollamos un sistema de recomendaciones basado en las mejores prácticas y acciones efectivas que permite a los profesionales de
                la educación realizar un trabajo eficiente y efectivo con los alumnos.
              </p>
            </div>
          </Col>
        </Col>
      </Grid>
    );
  }

  renderContact() {
    return (
      <Grid fluid style={{ backgroundColor: 'rgb(94, 102, 130)', paddingTop: '10%', paddingBottom: '10%' }}>
        <Col style={{ color: 'white', textAlign: 'center' }} xs={12} mdOffset={2} md={8}>
          <h3>|CONTÁCTANOS|</h3>
          <hr />
          <h3>Recibe una Asesoria Gratis</h3>
          <p>En Kimche estamos comprometidos con la educación y ofrecemos una asesoría gratis para mostrar como puede optimizar la gestión de su establecimiento.</p>
          <hr />
        </Col>
        <Col mdOffset={4} md={4} xs={10} xsOffset={1}>
          <Form>
            <FormGroup controlId="formInlineName" >
              <ControlLabel style={{ color: 'white' }} >Nombre</ControlLabel>
              <FormControl type="text" />
            </FormGroup>
            {' '}
            <FormGroup controlId="formInlineEmail">
              <ControlLabel style={{ color: 'white' }} >Email</ControlLabel>
              <FormControl type="email" />
            </FormGroup>
          </Form>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel style={{ color: 'white' }} >Comentario</ControlLabel>
            <FormControl componentClass="textarea" />
          </FormGroup>
        </Col>
        <Col xsOffset={2} xs={8} mdOffset={6} md={2}>
          <Button bsStyle="success" block>Enviar</Button>
        </Col>
      </Grid>
    );
  }

  render() {
    const { height } = this.state;
    return (
      <div>
        <Element name="Home">{this.renderMain()}</Element>
        <Element name="Caracteristicas">{this.renderFuncionalidades(height)}</Element>
        <Element name="Contacto">{this.renderContact(height)}</Element>
      </div>
    );
  }
}

LandingPage.propTypes = {
  height: PropTypes.int,
  width: PropTypes.int,
};
