import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { authOperations } from './redux/auth';
import Container from './Components/Container';
import AppBar from './Components/AppBar';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';

const HomeView = lazy(() =>
  import('./views/HomeView' /* webpackChunkName: "HomeView" */),
);
const RegisterView = lazy(() =>
  import('./views/RegisterView' /* webpackChunkName: "RegisterView" */),
);
const LoginView = lazy(() =>
  import('./views/LoginView' /* webpackChunkName: "LoginView" */),
);
const ContactsView = lazy(() =>
  import('./views/ContactsView' /* webpackChunkName: "ContactsView" */),
);

class App extends Component {
  componentDidMount() {
    this.props.onGetCurrentUser();
  }
  render() {
    return (
      <div>
        <AppBar />

        <Container>
          <Suspense fallback={<p>...loading</p>}>
            <Switch>
              <Route exact path="/" component={HomeView} />
              <PublicRoute
                path="/register"
                restricted
                component={RegisterView}
              />
              <PublicRoute path="/login" restricted component={LoginView} />
              <PrivateRoute path="/contacts" component={ContactsView} />
            </Switch>
          </Suspense>
        </Container>
      </div>
    );
  }
}

const mapDispatchToProps = {
  onGetCurrentUser: authOperations.getCurrentUser,
};

export default connect(null, mapDispatchToProps)(App);
