import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Col, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import Logo from '../../img/logoChico.png';
import PropTypes from 'prop-types';
import firebase from 'firebase';

export default class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      logout: false,
      viewUser: false,
      createUser: false,
      viewColegio: false,
      createColegio: false,
      viewAvisos: false,
      createAvisos: false,
    };
  }

  sesionOptions(user, location) {
    if (location.pathname === '/') {
      if (user) return ('/main');
      else return ('/login');
    }
    if (location.pathname === '/main') return ('/main/user');
    else return (location.pathname);
  }

  logOut() {
    firebase.auth().signOut().then(() => this.setState({ logout: true }));
  }

  renderLanding(user, location) {
    return (
      <Nav pullRight>
        <NavItem>
          <Link to={this.sesionOptions(user, location)} >
            Mi Sesion
          </Link>
        </NavItem>
      </Nav>
    );
  }

  renderMain() {
    return (
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
        <NavDropdown title="Mi Usuario" id="basic-nav-dropdown">
          <MenuItem>
            Mi Sesión
          </MenuItem>
          <MenuItem divider />
          <MenuItem onClick={() => this.logOut()}>Cerrar Sesión</MenuItem>
        </NavDropdown>
      </Nav>
    );
  }

  renderAdmin() {
    return (
      <Nav pullRight>
        <NavDropdown title="Usuarios" id="basic-nav-dropdown">
          <MenuItem onClick={() => this.setState({ viewUser: true })}>Ver Usuarios</MenuItem>
          <MenuItem divider />
          <MenuItem onClick={() => this.setState({ createUser: true })}>Crear Usuarios</MenuItem>
        </NavDropdown>
        <NavDropdown title="Colegios" id="basic-nav-dropdown">
          <MenuItem onClick={() => this.setState({ viewColegio: true })}>Ver Colegios</MenuItem>
          <MenuItem divider />
          <MenuItem onClick={() => this.setState({ createColegio: true })}>Crear Colegio</MenuItem>
        </NavDropdown>
        <NavDropdown title="Avisos" id="basic-nav-dropdown">
          <MenuItem onClick={() => this.setState({ viewAvisos: true })}>Ver avisos</MenuItem>
          <MenuItem divider />
          <MenuItem onClick={() => this.setState({ createAvisos: true })}>Crear Avisos</MenuItem>
        </NavDropdown>
        <NavDropdown title="Mi Usuario" id="basic-nav-dropdown">
          <MenuItem>Mi Sesión</MenuItem>
          <MenuItem divider />
          <MenuItem onClick={() => this.logOut()}>Cerrar Sesión</MenuItem>
        </NavDropdown>
      </Nav>
    );
  }

  render() {
    const { user } = this.props;
    if (this.state.logout) {
      this.setState({ logout: false });
      return <Redirect to="/" />;
    } else if (this.state.viewUser) {
      this.setState({ viewUser: false });
      return <Redirect to="/admin/viewUser" />;
    } else if (this.state.createUser) {
      this.setState({ createUser: false });
      return <Redirect to="/admin/createUser" />;
    } else if (this.state.viewColegio) {
      this.setState({ viewColegio: false });
      return <Redirect to="/admin/viewColegio" />;
    } else if (this.state.createColegio) {
      this.setState({ createColegio: false });
      return <Redirect to="/admin/createColegio" />;
    } else if (this.state.viewAvisos) {
      this.setState({ viewAvisos: false });
      return <Redirect to="/admin/viewAvisos" />;
    } else if (this.state.createAvisos) {
      this.setState({ createAvisos: false });
      return <Redirect to="/admin/createAvisos" />;
    } else {
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
              {location.pathname === '/' && this.renderLanding(user, location)}
              {location.pathname.includes('/main') && this.renderMain(user, location)}
              {location.pathname.includes('/admin') && this.renderAdmin(user, location)}
            </Navbar.Collapse>
          </Col>
        </Navbar>
    ); }
  }
}

NavBar.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  user: PropTypes.object,
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
