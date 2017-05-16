import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Panel, Grid, Button, Collapse, Well, FormGroup, FormControl, ControlLabel, NavItem, Nav, Alert } from 'react-bootstrap';
// import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Select from 'react-select';
import firebase from 'firebase';

import Profesor from '../profesor';

import FaWrench from 'react-icons/lib/fa/wrench';
import FaRefresh from 'react-icons/lib/fa/refresh';
import FaMedkit from 'react-icons/lib/fa/medkit';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';
import FaInfoCircle from 'react-icons/lib/fa/info-circle';

// TODO: Estado #urgent
// TODO: ordenar en FIFO #urgent
// TODO: agregar tabla #urgent

export default class Director extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tab: 1,
      loading: true,
      dataConsejo: [],
      open: [],
      send: [],
      porqueMessage: [],
      accionMessage: [],
    };
  }

  componentWillMount() {
    this.componentWillReceiveProps();
  }

  componentWillReceiveProps() {
    const { userData } = this.props;
    const dataConsejo = [];
    const porqueMessage = [];
    const accionMessage = [];
    if (userData.avisos !== undefined) {
      userData.avisos.forEach(aviso =>
        firebase.database().ref(`consejos/${aviso}`).on('value', consejo => {
          dataConsejo.push({ key: aviso, value: consejo.val() });
          porqueMessage.push(consejo.val().porque);
          accionMessage.push(consejo.val().accion);
          this.setState({ dataConsejo, loading: false, porqueMessage, accionMessage });
        }
      ));
    }
  }

  selectType(type) {
    if (type === 'felicitar') return 'success';
    else if (type === 'conservar' || type === 'soporte') return 'info';
    else if (type === 'apoyar') return 'danger';
    else return 'primary';
  }

  selectTextType(type) {
    if (type === 'felicitar') return 'Felicitar';
    else if (type === 'conservar') return 'Conservar';
    else if (type === 'apoyar') return 'Apoyar';
    else if (type === 'soporte') return 'Soporte';
    else return 'Corregir';
  }

  handleCollapse(consejo, i) {
    const { open } = this.state;
    open[i] = !this.state.open[i];
    this.setState({ open });
    firebase.database().ref(`consejos/${consejo.key}`).update({
      state: 2,
    });
  }

  handleSelect(e) {
    event.preventDefault();
    this.setState({ tab: e });
  }

  sendPorque(consejo, i) {
    const { porqueMessage, send } = this.state;
    firebase.database().ref(`consejos/${consejo.key}`).update({
      porque: porqueMessage[i],
      state: 3,
    });
    const sended = send;
    sended[i] = true;
    this.setState({ send: sended });
  }

  sendAccion(consejo, i) {
    const { accionMessage, send } = this.state;
    firebase.database().ref(`consejos/${consejo.key}`).update({
      accion: accionMessage[i],
      state: 3,
    });
    const sended = send;
    sended[i] = true;
    this.setState({ send: sended });
  }

  renderLista() {
    const { userData } = this.props;
    const { dataConsejo, porqueMessage, accionMessage, send } = this.state;
    return (
      userData.avisos === undefined ?
        <h2>Lo lamentamos pero actualmente no tienes mensajes</h2>
      :
      dataConsejo.map((consejo, i) =>
        <Grid key={i} fluid style={{ padding: 0, alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
          <Col xs={2} style={{ padding: 0 }}>
            <center>
              {consejo.value.tipo === 'felicitar' && <FaThumbsOUp size={50} />}
              {consejo.value.tipo === 'conservar' && <FaRefresh size={50} />}
              {consejo.value.tipo === 'apoyar' && <FaMedkit size={50} />}
              {consejo.value.tipo === 'corregir' && <FaWrench size={50} />}
              {consejo.value.tipo === 'soporte' && <FaInfoCircle size={50} />}
            </center>
          </Col>
          <Col xs={10}>
            <Panel header={`${this.selectTextType(consejo.value.tipo)} / ${consejo.value.createData}`} bsStyle={this.selectType(consejo.value.tipo)}>
              {/* <h5>{consejo.teacher},</h5> */}
              <small style={{ fontStyle: 'italic' }}>Estado: {'Visto'}</small>
              <h4 style={{ lineHeight: '130%' }}>{consejo.value.message}</h4>
              {consejo.value.tipo !== 'soporte' &&
                <div>
                  <Button className="pull-right" onClick={() => this.handleCollapse(consejo, i)} bsStyle={this.selectType(consejo.value.tipo)}>
                    {this.state.open[i] ? 'Ver menos [-]' : 'Ver mas [+]'}
                  </Button>
                  <Collapse in={this.state.open[i]}>
                    <div>
                      <br />
                      <br />
                      <br />
                      <Well>
                        <FormGroup controlId="formControlsTextarea">
                          <ControlLabel>¿Por qué paso?</ControlLabel>
                          <FormControl onChange={e => { const porque = porqueMessage; porqueMessage[i] = e.target.value; this.setState({ porqueMessage: porque }); }} value={porqueMessage[i]} placeholder="Escribe aqui..." />
                          <br />
                          <Button onClick={() => this.sendPorque(consejo, i)}>
                            Enviar
                          </Button>
                        </FormGroup>
                        <FormGroup controlId="formControlsTextarea">
                          <ControlLabel>¿Qué acción tomaste?</ControlLabel>
                          <FormControl onChange={e => { const accion = accionMessage; accionMessage[i] = e.target.value; this.setState({ accionMessage: accion }); }} value={accionMessage[i]} placeholder="Escribe aqui..." />
                          <br />
                          <Button onClick={() => this.sendAccion(consejo, i)}>
                            Enviar
                          </Button>
                        </FormGroup>
                        {send[i] &&
                          <Alert bsStyle="success" >
                            <h3>Mensaje enviado correctamente</h3>
                            <Button bsStyle="success" onClick={() => { const sended = send; send[i] = false; this.setState({ send: sended }); }}>
                              Aceptar
                            </Button>
                          </Alert>
                        }
                      </Well>
                    </div>
                  </Collapse>
                </div>
              }
            </Panel>
          </Col>
        </Grid>
      )
    );
  }

  render() {
    const { tab, teacherSelect } = this.state;
    return (
      <Col xs={12} md={8} mdOffset={2} style={{ paddingTop: '5%', paddingBottom: '5%' }}>
        <Nav bsStyle="tabs" activeKey={tab} onSelect={e => this.handleSelect(e)}>
          <NavItem eventKey={1} >Mis Avisos</NavItem>
          <NavItem eventKey={2} >Avisos de Profesores</NavItem>
          <NavItem eventKey={3} >Soporte</NavItem>
        </Nav>
        {tab === 1 &&
          <div>
            <br />
            {this.renderLista()}
          </div>
        }
        {tab === 2 &&
          <div>
            <h4>Selecciona al Profesor que quieres ver:</h4>
            <Select
              value={teacherSelect}
              // options={teachers}
              placeholder="Profesor..."
              onChange={val => this.setState({ teacherSelect: val.label })}
            />
            {teacherSelect && <Profesor teacher={teacherSelect} {...this.props} />}
          </div>
        }
        {tab === 3 &&
          <div>
            <h2>Soporte Kimche</h2>
            <p>Comunicate con nosotros a través del siguiente mail <a>soporte@kimche.co</a></p>
            <p>Tambien en nuestro numero de contacto +56 9 4426 9968</p>
          </div>
      }
      </Col>
    );
  }
}

Director.propTypes = {
  userData: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
};
