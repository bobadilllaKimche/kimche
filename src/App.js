import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/navbar';
import LandingPage from './components/landingPage';
import Login from './components/login';
import Main from './components/main';

// TODO: Crear Firebase user login
// TODO: Crear Usuarios - tipos (Director, Profe, Admin)
// TODO: Crear vista Admin
// TODO: validar login Firebase

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
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
          <NavBar history={history} location={location} width={this.state.width} />
          <div style={{ paddingTop: 40 }}>
            <Route exact path="/" component={LandingPage} />
            <Route path="/login" component={Login} />
            <Route path="/main" component={Main} />
            {/* <Route path="/public" component={Public} />
            <PrivateRoute path="/protected" component={Protected} /> */}
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
