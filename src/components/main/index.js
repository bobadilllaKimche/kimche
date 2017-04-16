import React, { Component } from 'react';
import { Col, Panel, Grid, Button } from 'react-bootstrap';
import FaCalendarCheckO from 'react-icons/lib/fa/calendar-check-o';
import FaExclamationTriangle from 'react-icons/lib/fa/exclamation-triangle';
import FaArrowCircleODown from 'react-icons/lib/fa/arrow-circle-o-down';
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down';

const lista = [
  {
    type: 'Asistencia',
    date: '03-10-2017',
    comment: 'Se ha registrado una disminucion en la asistencia durante los ultimos 3 meses de: ',
    teacher: 'Mr.Jackson',
    class: 'III A',
    Students: [
      'Andrea Montero', 'Francisco Abalos', 'Pedro Mesa',
    ],
  },
  {
    type: 'Calificaciones',
    date: '15-11-2017',
    comment: 'Cuidado, las notas en Matematicas han bajado para los siguietes alumnos: ',
    teacher: 'Mr.Fred',
    class: 'I B',
    Students: [
      'Juanita de los Andes', 'Jorge Belmar', 'Ignacia Llanos',
    ],
  },
  {
    type: 'Atencion Especial',
    date: '08-09-2017',
    comment: 'Hemos detectado una disminucion general en el desempeño de:',
    teacher: 'Mr.Jackson',
    class: 'III A',
    Students: [
      'Andrea Montero', 'Pedro Mesa',
    ],
  },
  {
    type: 'Comportamiento',
    date: '03-10-2017',
    comment: 'En las ultimas semanas, se ha detectado que ha habido un mal comportamiento de: ',
    teacher: 'Mr.Jackson',
    class: 'III A',
    Students: [
      'Andrea Montero', 'Jorge Belmar', 'Pedro Mesa',
    ],
  },
];
export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  selectType(type) {
    if (type === 'Asistencia' || type === 'Comportamiento') return 'warning';
    else return 'danger';
  }

  renderLista() {
    return (
      lista.map((element, i) =>
        <Grid key={i} fluid style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
          <Col xs={2}>
            {element.type === 'Asistencia' && <FaCalendarCheckO size={50} />}
            {element.type === 'Calificaciones' && <FaArrowCircleODown size={50} />}
            {element.type === 'Atencion Especial' && <FaExclamationTriangle size={50} />}
            {element.type === 'Comportamiento' && <FaThumbsODown size={50} />}
          </Col>
          <Col xs={10}>
            <Panel header={`${element.class} - ${element.type} / ${element.date}`} bsStyle={this.selectType(element.type)}>
              <h5>{element.teacher},</h5>
              <p>{element.comment} {element.Students.map(student => `${student}, `)}</p>
              <Button style={{ display: 'flex', justifyContent: 'flex-end' }} bsStyle="success">
                Entendido
              </Button>
            </Panel>
          </Col>
        </Grid>
      )
    );
  }

  render() {
    return (
      <Col xs={12} md={8} mdOffset={2} style={{ paddingTop: '5%', paddingBottom: '5%' }}>
        <h2>Lista de Anuncios</h2>
        <hr />
        {this.renderLista()}
        <a href='http://recharts.org'>Ejemplo de Graficos</a>
      </Col>
    );
  }
}
