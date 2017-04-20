import React, { Component } from 'react';
import { Col, Panel, Grid, Button, Collapse, Well, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import PropTypes from 'prop-types';

import FaWrench from 'react-icons/lib/fa/wrench';
import FaRefresh from 'react-icons/lib/fa/refresh';
import FaMedkit from 'react-icons/lib/fa/medkit';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';

const lista = [
  {
    type: 'Felicitar',
    date: '17-05-2017',
    comment: 'Buenas noticias profesor. Felicite a Juan Fuenzalida y Beatriz Godoy por su excelente asistencia en Abril. Nunca Faltaron !',
    teacher: 'Mr.Jackson',
    class: 'III A',
    Students: [
    ],
  },
  {
    type: 'Conservar',
    date: '10-05-2017',
    comment: 'Ánimo! No descuidemos los buenos resultados en historia de Marcela Rojas, esperemos que siga asi.',
    teacher: 'Mr.Jackson',
    class: 'I B',
    Students: [
      // 'Juanita de los Andes', 'Jorge Belmar', 'Ignacia Llanos',
    ],
  },
  {
    type: 'Apoyar',
    date: '03-05-2017',
    comment: 'Atención! A 03 de Mayo, el 4°A presenta 5 niños con un alta tasa de inasistencia. Revísalos acá:',
    teacher: 'Mr.Jackson',
    class: 'III A',
    Students: [
      'Andrea Montero', 'Pedro Mesa', 'Juan Molina', 'Francisca Riquelme', 'Luis Paredes',
    ],
  },
  {
    type: 'Corregir',
    date: '03-04-2017',
    comment: 'Precaución con Pedro Moraga y Julián Pino. Sus reiteradas inasistencias del mes anterior porían afectar su rendimiento en la siguiente prueba del mes.',
    teacher: 'Mr.Jackson',
    class: 'III A',
    Students: [
      // 'Andrea Montero', 'Jorge Belmar', 'Pedro Mesa',
    ],
  },
];

const data = [
  { name: 'Marzo', Asistencia: 0.92 },
  { name: 'Abril', Asistencia: 0.88 },
  { name: 'Mayo', Asistencia: 0.91 },
];


export default class Profesor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: [false, false, false, false],
    };
  }

  selectType(type) {
    if (type === 'Felicitar') return 'success';
    else if (type === 'Conservar') return 'info';
    else if (type === 'Apoyar') return 'warning';
    else return 'danger';
  }

  handleCollapse(i) {
    const { open } = this.state;
    open[i] = !this.state.open[i];
    this.setState({ open });
  }

  renderLista() {
    const { width, height } = this.props;
    return (
      lista.map((element, i) =>
        <Grid key={i} fluid style={{ padding: 0, alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
          <Col xs={2} style={{ padding: 0 }}>
            <center>
              {element.type === 'Felicitar' && <FaWrench size={50} />}
              {element.type === 'Conservar' && <FaRefresh size={50} />}
              {element.type === 'Apoyar' && <FaMedkit size={50} />}
              {element.type === 'Corregir' && <FaThumbsOUp size={50} />}
            </center>
          </Col>
          <Col xs={10}>
            <Panel header={`${element.class} - ${element.type} / ${element.date}`} bsStyle={this.selectType(element.type)}>
              <h5>{element.teacher},</h5>
              <p>{element.comment} {element.Students.map(student => `${student}, `)}</p>
              <Button className="pull-right" onClick={() => this.handleCollapse(i)} bsStyle={this.selectType(element.type)}>
                Ver mas [+]
              </Button>
              <Collapse in={this.state.open[i]}>
                <div>
                  <br />
                  <hr />
                  <Well>
                    <FormGroup controlId="formControlsTextarea">
                      <ControlLabel>¿Porque Ocurrio?</ControlLabel>
                      <FormControl componentClass="textarea" placeholder="Escribe aqui..." />
                    </FormGroup>
                    <FormGroup controlId="formControlsTextarea">
                      <ControlLabel>¿Qué acción realizaste para resolver esto?</ControlLabel>
                      <FormControl componentClass="textarea" placeholder="Escribe aqui..." />
                    </FormGroup>
                    <BarChart width={width * 0.45} height={height * 0.35} data={data}>
                      <XAxis dataKey="name" />
                      {/* <YAxis domain={domain} ticks={ticks} tickCount={10} /> */}
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Asistencia" fill="#8884d8" label />
                    </BarChart>
                  </Well>
                </div>
              </Collapse>
            </Panel>
          </Col>
        </Grid>
      )
    );
  }

  render() {
    const { isDirector } = this.props;
    return (
      isDirector ?
        <Col style={{ paddingTop: '5%', paddingBottom: '5%' }}>
          <h2>Lista de Anuncios</h2>
          <hr />
          {this.renderLista()}
        </Col>
        :
        <Col xs={12} md={8} mdOffset={2} style={{ paddingTop: '5%', paddingBottom: '5%' }}>
          <h2>Lista de Anuncios</h2>
          <hr />
          {this.renderLista()}
        </Col>
    );
  }
}

Profesor.propTypes = {
  isDirector: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
};
