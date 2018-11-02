import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import './App.css';
import withAuthentication from './withAuthentication';
import * as routes from '../constants/routes';
import Home from './home/home';
import Navigation from './nav/navigation';
import Profile from './profile/profile';
import Signin from './sign-in/sign-in';
import Singup from './sign-up/sign-up';
import AddPost from './add-post/addPost';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffffff'
    },
    secondary: {
      main: '#000000'
    }
  }
});

const App = () =>
      <Router>
        <div>
            <MuiThemeProvider theme={theme}>
              <Navigation />
              <Route
                exact path={routes.SIGN_UP}
                component={Singup}
              />
              <Route
                exact path={routes.SIGN_IN}
                component={Signin}
              />
              <Route
                exact path={routes.HOME}
                component={Home}
              />
              <Route
                exact path={routes.ACCOUNT}
                component={Profile}
              />
              <AddPost/>
            </MuiThemeProvider>
        </div>
      </Router>

export default withAuthentication(App);