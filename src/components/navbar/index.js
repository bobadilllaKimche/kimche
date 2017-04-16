import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import Logo from '../../img/logoChico.png';
import { Link as ScrollLink, animateScroll } from 'react-scroll';
import './navbar.css';
import PropTypes from 'prop-types';
import FaAngleDoubleDown from 'react-icons/lib/fa/angle-double-down';

export default class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      navbarButton: false,
    };
  }

  login = () => {
    this.fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  }

  fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
      this.isAuthenticated = true;
      setTimeout(cb, 100); // fake async
    },
    signout(cb) {
      this.isAuthenticated = false;
      setTimeout(cb, 100);
    },
  };
  renderPc() {
    const { location } = this.props;
    if (location.pathname === '/') {
      return (
        <Col sm={6} className="title">
          <ScrollLink className="scrollLink" style={{ textDecoration: 'none', marginRight: 10 }} to="Caracteristicas" spy smooth duration={1500} >
            <p className="button">CONOCENOS</p>
          </ScrollLink>
          <ScrollLink to="Contacto" style={{ textDecoration: 'none', marginRight: 10 }} spy smooth duration={1500} >
            <p className="button">CONTACTO</p>
          </ScrollLink>
          <Link to="/login" style={{ textDecoration: 'none', marginRight: 10 }}>
            <span style={{ borderLeft: '1px solid #D3D3D3', height: '60%', top: '20%', position: 'absolute', paddingLeft: 5, paddingRight: 5 }}></span>
            <p className="button" style={{ marginLeft: 10 }}>INICIAR SESION </p>
          </Link>
        </Col>
      );
    } else if (location.pathname === '/main') {
      return (
        <Col sm={6} className="title">
          <Link to="/main" style={{ textDecoration: 'none', marginRight: 10 }}>
            <p style={{ marginRight: 10 }} className="button">ESTADISTICAS</p>
          </Link>
          <Link to="/main" style={{ textDecoration: 'none', marginRight: 10 }}>
            <p style={{ marginRight: 10 }} className="button">ANUNCIOS</p>
          </Link>
          <Link to="/login" style={{ textDecoration: 'none', marginRight: 10 }}>
            <span style={{ borderLeft: '1px solid #D3D3D3', height: '60%', top: '20%', position: 'absolute', paddingLeft: 5, paddingRight: 5 }}></span>
            <p className="button" style={{ marginLeft: 10 }}>MI SESION </p>
          </Link>
        </Col>
      );
    } else { return (null); }
  }

  renderMobile() {
    const { location } = this.props;
    if (location.pathname === '/') {
      return (
        <Col style={{ backgroundColor: 'rgba(81,80,94,0.9)', position: 'fixed', zIndex: 5, marginTop: 50, justifyContent: 'flex-end' }} xsOffset={4} xs={8}>
          <ScrollLink className="scrollLink" style={{ textDecoration: 'none', padding: 2 }} to="Caracteristicas" spy smooth duration={1500} >
            <p className="button">CONOCENOS</p>
          </ScrollLink>
          <ScrollLink to="Contacto" style={{ textDecoration: 'none', padding: 2 }} spy smooth duration={1500} >
            <p className="button">CONTACTO</p>
          </ScrollLink>
          <Link to="/login" style={{ textDecoration: 'none', padding: 2 }}>
            <p className="button" >INICIAR SESION </p>
          </Link>
        </Col>
      );
    } else { return (null); }
  }

  render() {
    const { width, location } = this.props;
    const { navbarButton } = this.state;
    return (
      <div className="navbarContainer">
        <Col smOffset={2} sm={2} xs={10}>
          <Link to="/" onClick={() => animateScroll.scrollToTop()} style={{ cursor: 'pointer' }}>
            <img
              src={Logo}
              alt={'Logo'}
              height={40}
            />
          </Link>
        </Col>
        {width < 900 ?
          location.pathname === '/' &&
            <Col sm={6} xs={2}>
              <FaAngleDoubleDown size={50} color={'#96969B'} onClick={() => this.setState({ navbarButton: !this.state.navbarButton })} />
            </Col>
        :
        this.renderPc()
        }
        {navbarButton && this.renderMobile()}
      </div>
    );
  }
}

NavBar.propTypes = {
  location: PropTypes.object,
  width: PropTypes.int,
};
