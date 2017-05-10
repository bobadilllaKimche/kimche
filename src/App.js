import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import firebase from 'firebase';

import NavBar from './components/navbar';
import LandingPage from './components/landingPage';
import Login from './components/login';
import Main from './components/main';
import Admin from './components/admin';

import NewUser from './components/admin/newUser';
import ViewUsers from './components/admin/viewUsers';
import EditUser from './components/admin/editUser';

import Director from './components/director';
import Profesor from './components/profesor';

// TODO: Crear Usuarios - tipos (Director, Profe, Admin)
// TODO: Crear vista Admin
// TODO: validar login Firebase

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const config = {
      apiKey: 'AIzaSyBY-ObbJit9RFBoZfFObPvhcwUE15X46ME',
      authDomain: 'kimche-cf3a2.firebaseapp.com',
      databaseURL: 'https://kimche-cf3a2.firebaseio.com',
      projectId: 'kimche-cf3a2',
      storageBucket: 'kimche-cf3a2.appspot.com',
      messagingSenderId: '113879070712',
    };
    firebase.initializeApp(config);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
      user: false,
      secondaryApp: firebase.initializeApp(config, 'Secondary'),
    };
  }

  componentWillMount() {
    this.setState({ loading: true });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: false });
      }
    });
    this.setState({ loading: false });
  }
  componentDidMount() {
    window.addEventListener('resize', () => this.handleResize());
  }
  handleResize() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    return (
      <Router>
        <div>
          <NavBar history={history} {...this.state} />
          <div style={{ paddingTop: 40 }}>
            <Route exact path="/" render={props => <LandingPage {...this.state} {...props} />} />
            <Route path="/login" render={props => <Login {...this.state} {...props} />} />
            <Route path="/main" render={props => <Main {...this.state} {...props} />} />
            <Route path="/admin" render={props => <Admin {...this.state} {...props} />} />
            <Route path="/admin/createUser" render={props => <NewUser {...this.state} {...props} />} />
            <Route path="/admin/viewUsers" render={props => <ViewUsers {...this.state} {...props} />} />
            <Route path="/admin/editUser/:editableUser" render={props => <EditUser {...this.state} {...props} />} />
            <Route path="/main/profesor" render={props => <Profesor {...this.state} {...props} />} />
            <Route path="/main/director" render={props => <Director {...this.state} {...props} />} />
          </div>
        </div>
      </Router>
    );
  }
}

// const fakeAuth = {
//   isAuthenticated: false,
//   authenticate(cb) {
//     this.isAuthenticated = true;
//     setTimeout(cb, 100); // fake async
//   },
//   signout(cb) {
//     this.isAuthenticated = false;
//     setTimeout(cb, 100);
//   },
// };
//
// const AuthButton = withRouter(({ history }) => (
//   fakeAuth.isAuthenticated ? (
//     <p>
//       Welcome!
//       <button onClick={() => { fakeAuth.signout(() => history.push('/')); }}>
//         Sign out
//       </button>
//     </p>
//   ) : (
//     <p>You are not logged in.</p>
//   )
// // ));
//
// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={props => (
//     fakeAuth.isAuthenticated ? (
//       <Component {...props}/>
//     ) : (
//       <Redirect to={{
//         pathname: '/login',
//         state: { from: props.location }
//       }} />
//     )
//   )} />
// );
//
// const Public = () => <h3>Public</h3>;
// const Protected = () => <h3>Protected</h3>;

// class Login extends React.Component {
//   state = {
//     redirectToReferrer: false,
//   }
//
//   login = () => {
//     fakeAuth.authenticate(() => {
//       this.setState({ redirectToReferrer: true });
//     });
//   }
//
//   render() {
//     const { from } = this.props.location.state || { from: { pathname: '/' } }
//     const { redirectToReferrer } = this.state
//     return (
//       redirectToReferrer ?
//         <Redirect to={from} />
//         :
//         <div>
//           <p>You must log in to view the page at {from.pathname}</p>
//           <button onClick={this.login}>Log in</button>
//         </div>
//       );
//     }
//   }
