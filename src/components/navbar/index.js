import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Navbar, Nav, NavItem } from 'react-bootstrap';
import Logo from '../../img/logoChico.png';
import PropTypes from 'prop-types';

export default class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      navbarButton: false,
    };
  }

  render() {
    return (
      <Navbar fixedTop fluid>
        <Col xs={12} md={10} mdOffset={1}>
          <Navbar.Header style={{ alignItems: 'center' }}>
            <Link to="/" >
              <img src={Logo} alt={'Logo'} height={36} style={{ marginTop: 2 }} />
            </Link>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            {location.pathname === '/' &&
              <Nav pullRight>
                <NavItem>
                  <Link to="/login" >
                    Iniciar Sesion
                  </Link>
                </NavItem>
              </Nav>
            }
            {location.pathname === '/main' &&
              <Nav pullRight>
                <NavItem>
                  <Link to="/main" >
                    Estadisticas
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/main" >
                  Anuncios
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/login" >
                    Mi Sesion
                  </Link>
                </NavItem>
              </Nav>
            }
          </Navbar.Collapse>
        </Col>
      </Navbar>
    );
  }
}

NavBar.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
};

// renderPc() {
//   const { location } = this.props;
//   if (location.pathname === '/') {
//     return (
//       <Col sm={6} className="title">
//         <ScrollLink className="scrollLink" style={{ textDecoration: 'none', marginRight: 10 }} to="Caracteristicas" spy smooth duration={1500} >
//           <p className="button">CONOCENOS</p>
//         </ScrollLink>
//         <ScrollLink to="Contacto" style={{ textDecoration: 'none', marginRight: 10 }} spy smooth duration={1500} >
//           <p className="button">CONTACTO</p>
//         </ScrollLink>
//         <Link to="/loginD" style={{ textDecoration: 'none', marginRight: 10 }}>
//           <span style={{ borderLeft: '1px solid #D3D3D3', height: '60%', top: '20%', position: 'absolute', paddingLeft: 5, paddingRight: 5 }}></span>
//           <p className="button" style={{ marginLeft: 10 }}>INICIAR SESION </p>
//         </Link>
//       </Col>
//     );
//   } else if (location.pathname === '/main') {
//     return (
//       <Col sm={6} className="title">
//         <Link to="/main" style={{ textDecoration: 'none', marginRight: 10 }}>
//           <p style={{ marginRight: 10 }} className="button">ESTADISTICAS</p>
//         </Link>
//         <Link to="/main" style={{ textDecoration: 'none', marginRight: 10 }}>
//           <p style={{ marginRight: 10 }} className="button">ANUNCIOS</p>
//         </Link>
//         <Link to="/login" style={{ textDecoration: 'none', marginRight: 10 }}>
//           <span style={{ borderLeft: '1px solid #D3D3D3', height: '60%', top: '20%', position: 'absolute', paddingLeft: 5, paddingRight: 5 }}></span>
//           <p className="button" style={{ marginLeft: 10 }}>MI SESION </p>
//         </Link>
//       </Col>
//     );
//   } else { return (null); }
// }
//
// renderMobile() {
//   const { location } = this.props;
//   if (location.pathname === '/') {
//     return (
//       <Col style={{ backgroundColor: 'rgba(81,80,94,0.9)', position: 'fixed', zIndex: 5, marginTop: 50, justifyContent: 'flex-end' }} xsOffset={4} xs={8}>
//         <ScrollLink className="scrollLink" style={{ textDecoration: 'none', padding: 2 }} to="Caracteristicas" spy smooth duration={1500} >
//           <p className="button">CONOCENOS</p>
//         </ScrollLink>
//         <ScrollLink to="Contacto" style={{ textDecoration: 'none', padding: 2 }} spy smooth duration={1500} >
//           <p className="button">CONTACTO</p>
//         </ScrollLink>
//         <Link to="/login" style={{ textDecoration: 'none', padding: 2 }}>
//           <p className="button" >INICIAR SESION </p>
//         </Link>
//       </Col>
//     );
//   } else { return (null); }
// }
//
// render() {
//   const { width, location } = this.props;
//   const { navbarButton } = this.state;
//   return (
//     <div className="navbarContainer">
//       <Col smOffset={2} sm={2} xs={7}>
// <Link to="/" onClick={() => animateScroll.scrollToTop()} style={{ cursor: 'pointer' }}>
//   <img
//     src={Logo}
//     alt={'Logo'}
//     height={40}
//   />
// </Link>
//       </Col>
//       {width < 900 ?
//         location.pathname === '/' &&
//           <Col xs={5} style={{ alignItems: 'center', display: 'flex' }}>
//             <Link to="/login" style={{ textDecoration: 'none' }}>
//               <p className="button" >INICIAR SESION </p>
//             </Link>
//           </Col>
//       :
//       this.renderPc()
//       }
//       {navbarButton && this.renderMobile()}
//     </div>
//   );
// }
