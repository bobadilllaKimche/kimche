import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Col, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Logo from '../../img/logoChico.png';
import PropTypes from 'prop-types';
import firebase from 'firebase';

class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  logOut() {
    firebase.auth().signOut().then(() => this.setState({ logout: true }));
  }

  renderLanding() {
    const { user } = this.props;
    return (
      <Nav pullRight>
        <LinkContainer to={user ? '/admin' : '/login'}>
          <NavItem>Mi Sesion</NavItem>
        </LinkContainer>
      </Nav>
    );
  }

  renderMain() {
    return (
      <Nav pullRight>
        <MenuItem >Mensajes</MenuItem>
        <NavDropdown title="Mi Usuario" id="basic-nav-dropdown">
          <MenuItem>
            Mi Sesión
          </MenuItem>
          <MenuItem divider />
          <LinkContainer to="/login">
            <MenuItem onClick={() => this.logOut()}>Cerrar Sesión</MenuItem>
          </LinkContainer>
        </NavDropdown>
      </Nav>
    );
  }

  renderAdmin() {
    return (
      <div>
        <Nav>
          <NavDropdown title="Usuarios" id="basic-nav-dropdown">
            <LinkContainer to={'/admin/viewUsers'}>
              <MenuItem>Ver Usuarios</MenuItem>
            </LinkContainer>
            <MenuItem divider />
            <LinkContainer to={'/admin/createUser'}>
              <MenuItem>Crear Usuarios</MenuItem>
            </LinkContainer>

          </NavDropdown>
          <NavDropdown title="Colegios" id="basic-nav-dropdown">
            <MenuItem>Ver Colegios</MenuItem>
            <MenuItem divider />
            <MenuItem>Crear Colegio</MenuItem>
          </NavDropdown>
          <NavDropdown title="Avisos" id="basic-nav-dropdown">
            <MenuItem>Ver avisos</MenuItem>
            <MenuItem divider />
            <MenuItem>Crear Avisos</MenuItem>
          </NavDropdown>
        </Nav>
        <Nav pullRight>
          <NavDropdown title="Mi Usuario" id="basic-nav-dropdown">
            <MenuItem>Mi Sesión</MenuItem>
            <MenuItem divider />
            <LinkContainer to="/login">
              <MenuItem onClick={() => this.logOut()}>Cerrar Sesión</MenuItem>
            </LinkContainer>
          </NavDropdown>
        </Nav>
      </div>
    );
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
            {location.pathname === '/' && this.renderLanding()}
            {location.pathname.includes('/main') && this.renderMain()}
            {location.pathname.includes('/admin') && this.renderAdmin()}
          </Navbar.Collapse>
        </Col>
      </Navbar>
    );
  }
}

NavBar.propTypes = {
  location: PropTypes.object,
  user: PropTypes.object,
  history: PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(NavBar);


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
