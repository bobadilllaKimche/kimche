import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Panel, Grid, Button, Collapse, Well, FormGroup, FormControl, ControlLabel, NavItem, Nav } from 'react-bootstrap';
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Select from 'react-select';
import Profesor from '../profesor';

import FaWrench from 'react-icons/lib/fa/wrench';
import FaRefresh from 'react-icons/lib/fa/refresh';
import FaMedkit from 'react-icons/lib/fa/medkit';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';

const lista = [
  {
    type: 'Felicitar',
    date: '17-05-2017',
    comment: 'Buenas noticias, la asistencia de mayo ha aumetado 3 pts especto al mes anterior. 3A y IV B, los mejores cursos!',
    teacher: 'Sr. Joaquin Garmendia',
    class: 'III A',
    Students: [
    ],
  },
  {
    type: 'Conservar',
    date: '10-05-2017',
    comment: 'Ánimo! No descuidemos los buenos resultados en historia de Marcela Rojas, esperemos que siga asi.',
    teacher: 'Sr. Joaquin Garmendia',
    class: 'I B',
    Students: [
      // 'Juanita de los Andes', 'Jorge Belmar', 'Ignacia Llanos',
    ],
  },
  {
    type: 'Apoyar',
    date: '03-05-2017',
    comment: 'Director, le informamnos que en Mayo no se alcanzó la meta de asistencia escolar, faltaron sólo un pt.',
    teacher: 'Sr. Joaquin Garmendia',
    class: 'III A',
    Students: [
      // 'Andrea Montero', 'Pedro Mesa', 'Juan Molina', 'Francisca Riquelme', 'Luis Paredes',
    ],
  },
  {
    type: 'Corregir',
    date: '03-04-2017',
    comment: 'Precaución: Hemos detectado cursos en riesgo (8° C y 4°A) la elevada inacistencia del mes enterior podría afectar el rendimiento general.',
    teacher: 'Sr. Joaquin Garmendia',
    class: 'III A',
    Students: [
      // 'Andrea Montero', 'Jorge Belmar', 'Pedro Mesa',
    ],
  },
];

const teachers = [
  { value: 'Sr. Rodrigo Fuentes', label: 'Sr. Rodrigo Fuentes' },
  { value: 'Srta. Josefina Perez', label: 'Srta. Josefina Perez' },
  { value: 'Sr. Juan Molina', label: 'Sr. Juan Molina' },
  { value: 'Sr. Francisco Marquez', label: 'Sr. Francisco Marquez' },
  { value: 'Srta. Marta Lopez', label: 'Srta. Marta Lopez' },
  { value: 'Sr. Marco Silva', label: 'Sr. Marco Silva' },
  { value: 'Srta. Paula Raffo', label: 'Srta. Paula Raffo' },
];

const data = [
  { name: 'Marzo', Asistencia: 0.92 },
  { name: 'Abril', Asistencia: 0.88 },
  { name: 'Mayo', Asistencia: 0.91 },
];

export default class Director extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: [false, false, false, false],
      tab: 1,
    };
  }

  selectType(type) {
    if (type === 'Felicitar') return 'success';
    else if (type === 'Conservar') return 'info';
    else if (type === 'Apoyar') return 'danger';
    else return 'primary';
  }

  handleCollapse(i) {
    const { open } = this.state;
    open[i] = !this.state.open[i];
    this.setState({ open });
  }

  handleSelect(e) {
    event.preventDefault();
    this.setState({ tab: e });
  }

  renderLista() {
    const { width, height } = this.props;
    return (
      lista.map((element, i) =>
        <Grid key={i} fluid style={{ padding: 0, alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
          <Col xs={2} style={{ padding: 0 }}>
            <center>
              {element.type === 'Felicitar' && <FaThumbsOUp size={50} />}
              {element.type === 'Conservar' && <FaRefresh size={50} />}
              {element.type === 'Apoyar' && <FaMedkit size={50} />}
              {element.type === 'Corregir' && <FaWrench size={50} />}
            </center>
          </Col>
          <Col xs={10}>
            <Panel header={`${element.class} - ${element.type} / ${element.date}`} bsStyle={this.selectType(element.type)}>
              {/* <h5>{element.teacher},</h5> */}
              <p>{element.comment} {element.Students.map(student => `${student}, `)}</p>
              <Button className="pull-right" onClick={() => this.handleCollapse(i)} bsStyle={this.selectType(element.type)}>
                {this.state.open[i] ? 'Ver menos [-]' : 'Ver mas [+]'}
              </Button>
              <Collapse in={this.state.open[i]}>
                <div>
                  <br />
                  <br />
                  <br />
                  <Well>
                    <FormGroup controlId="formControlsTextarea">
                      <ControlLabel>Comentarios</ControlLabel>
                      <FormControl componentClass="textarea" placeholder="Escribe aqui..." />
                      <br />
                      <Button>
                        Enviar
                      </Button>
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
    const { tab, teacherSelect } = this.state;
    return (
      <Col xs={12} md={8} mdOffset={2} style={{ paddingTop: '5%', paddingBottom: '5%' }}>
        <Nav bsStyle="tabs" activeKey={tab} onSelect={e => this.handleSelect(e)}>
          <NavItem eventKey={1} >Mis Avisos</NavItem>
          <NavItem eventKey={2} >Avisos de Profesores</NavItem>
        </Nav>
        {tab === 1 ?
          <div>
            <hr />
            {this.renderLista()}
          </div>
          :
          <div>
            <h4>Selecciona al Profesor que quieres ver:</h4>
            <Select
              value={teacherSelect}
              options={teachers}
              placeholder="Profesor..."
              onChange={val => this.setState({ teacherSelect: val.label })}
            />
            {teacherSelect && <Profesor teacher={teacherSelect} {...this.props} />}
          </div>
        }
      </Col>
    );
  }
}

Director.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};
