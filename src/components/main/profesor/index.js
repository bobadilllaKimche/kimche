import React, { Component } from 'react';
import { Col, Panel, Grid, Button, Collapse, Well, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import PropTypes from 'prop-types';

import FaWrench from 'react-icons/lib/fa/wrench';
import FaRefresh from 'react-icons/lib/fa/refresh';
import FaMedkit from 'react-icons/lib/fa/medkit';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';

export default class Profesor extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  selectType(type) {
    if (type === 'felicitar') return 'success';
    else if (type === 'conservar') return 'info';
    else if (type === 'apoyar') return 'danger';
    else return 'primary';
  }

  handleCollapse(i) {
    const { open } = this.state;
    open[i] = !this.state.open[i];
    this.setState({ open });
  }

  renderLista() {
    const { userData } = this.props;
    console.log(this.props);
    return (
      userData.avisos === undefined ?
        <h2>Lo lamentamos pero actualmente no tienes mensajes</h2>
      :
      userData.avisos.map((element, i) =>
        <Grid key={i} fluid style={{ padding: 0, alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
          <Col xs={2} style={{ padding: 0 }}>
            <center>
              {element.tipo === 'felicitar' && <FaThumbsOUp size={50} />}
              {element.tipo === 'conservar' && <FaRefresh size={50} />}
              {element.tipo === 'apoyar' && <FaMedkit size={50} />}
              {element.tipo === 'corregir' && <FaWrench size={50} />}
            </center>
          </Col>
          <Col xs={10}>
            <Panel header={`${element.tipo} / ${element.createData}`} bsStyle={this.selectType(element.tipo)}>
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
                      <ControlLabel>¿Por qué paso?</ControlLabel>
                      <FormControl componentClass="textarea" placeholder="Escribe aqui..." />
                      <br />
                      <Button>
                        Enviar
                      </Button>
                    </FormGroup>
                    <FormGroup controlId="formControlsTextarea">
                      <ControlLabel>¿Qué acción tomaste?</ControlLabel>
                      <FormControl componentClass="textarea" placeholder="Escribe aqui..." />
                      <br />
                      <Button>
                        Enviar
                      </Button>
                    </FormGroup>
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
    const { userData } = this.props;
    return (
      userData ?
        <Col xs={12} md={8} mdOffset={2} style={{ paddingTop: '5%', paddingBottom: '5%' }}>
          <h2>Mensajes - {userData.nombre}</h2>
          {this.renderLista()}
        </Col>
        :
        <Col xs={12} md={8} mdOffset={2} style={{ paddingTop: '5%', paddingBottom: '5%' }}>
          {this.renderLista()}
        </Col>
    );
  }
}

Profesor.propTypes = {
  userData: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
};
