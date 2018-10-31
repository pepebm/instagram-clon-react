import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import './App.css';
import withAuthorization from './withAuthorization';
import * as routes from '../constants/routes';
import Forgot from './forgot/forgot';
import Home from './home/home';
import Landing from './landing/landing';
import Navigation from './nav/navigation';
import Profile from './profile/profile';
import Signin from './sign-in/sign-in';
import Singup from './sign-up/sign-up';


const App = () =>
      <Router>
        <div>
            <Navigation />
            <Route
              exact path={routes.LANDING}
              component={Landing}
            />
            <Route
              exact path={routes.SIGN_UP}
              component={Singup}
            />
            <Route
              exact path={routes.SIGN_IN}
              component={Signin}
            />
            <Route
              exact path={routes.PASSWORD_FORGET}
              component={Forgot}
            />
            <Route
              exact path={routes.HOME}
              component={Home}
            />
            <Route
              exact path={routes.ACCOUNT}
              component={Profile}
            />
        </div>
      </Router>

export default withAuthorization(App);