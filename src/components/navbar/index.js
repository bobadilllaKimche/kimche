import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Col, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Logo from '../../img/logoChico.png';
import PropTypes from 'prop-types';
import firebase from 'firebase';

// TODO: agregar colegio en navbar #next
// TODO: agregar tipo de usuario navbar #next

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
    const { userData, user } = this.props;
    let redirect = '';
    if (!user) redirect = '/login';
    else if (userData.tipo === 'SA') redirect = '/admin';
    else if (userData.tipo === 'A') { redirect = '/main'; }
    return (
      <Nav pullRight>
        <LinkContainer to={redirect}>
          <NavItem>Mi Sesion</NavItem>
        </LinkContainer>
      </Nav>
    );
  }

  renderMain() {
    const { userData } = this.props;
    return (
      <div>
        <Nav>
          <Navbar.Text style={{ color: '#D9230F' }}>
            {userData.nombre}
          </Navbar.Text>
        </Nav>
        <Nav pullRight>
          <LinkContainer to="/main/messages">
            <MenuItem >Mensajes</MenuItem>
          </LinkContainer>
          <NavDropdown title="Mi Usuario" id="basic-nav-dropdown">
            <LinkContainer to="/main/myUser">
              <MenuItem>Mi Sesión</MenuItem>
            </LinkContainer>
            <MenuItem divider />
            <LinkContainer to="/login">
              <MenuItem onClick={() => this.logOut()}>Cerrar Sesión</MenuItem>
            </LinkContainer>
          </NavDropdown>
        </Nav>
      </div>
    );
  }

  renderAdmin() {
    const { userData } = this.props;
    return (
      <div>
        <Nav>
          <Navbar.Text style={{ color: '#D9230F' }}>
            {userData.nombre}
          </Navbar.Text>
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
            <LinkContainer to={'/admin/viewSchools'}>
              <MenuItem>Ver Colegios</MenuItem>
            </LinkContainer>
            <MenuItem divider />
            <LinkContainer to={'/admin/newSchool'}>
              <MenuItem>Crear Colegio</MenuItem>
            </LinkContainer>
          </NavDropdown>
          <NavDropdown title="Consejos" id="basic-nav-dropdown">
            <LinkContainer to={'/admin/viewConsejos'}>
              <MenuItem>Ver Consejos</MenuItem>
            </LinkContainer>
            <MenuItem divider />
            <LinkContainer to={'/admin/newConsejo'}>
              <MenuItem>Crear Consejo</MenuItem>
            </LinkContainer>
          </NavDropdown>
        </Nav>
        <Nav pullRight>
          <NavDropdown title="Mi Usuario" id="basic-nav-dropdown">
            <LinkContainer to="/admin/myUser">
              <MenuItem>Mi Sesión</MenuItem>
            </LinkContainer>
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
    let origin = '';
    if (location.pathname.includes('/main')) origin = '/main/messages';
    else if (location.pathname.includes('/admin')) origin = '/admin/viewConsejos';
    return (
      <Navbar fixedTop fluid>
        <Col xs={12} md={10} mdOffset={1}>
          <Navbar.Header style={{ alignItems: 'center' }}>
            <Link to={origin} >
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
  userData: PropTypes.object,
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
