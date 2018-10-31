import React from 'react';
import { Link } from 'react-router-dom';
import { Toolbar } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

import SignOut from '../sign-out/sign-out';
import * as routes from '../../constants/routes';
import AuthUserContext from '../AuthUserContext';
import './navigation.css';

const NavigationAuth = () =>
    <AppBar position="static">
        <Toolbar>
            <Typography variant="headline" className='grow nav-title'>
                <Link to={routes.HOME}>Instagram</Link>
            </Typography>
            <Typography variant="headline" className='grow nav-title'>
                <Link to={routes.ACCOUNT}>Profile</Link>
            </Typography>
            <SignOut />
        </Toolbar>
    </AppBar>

const NavigationNonAuth = () =>
    <AppBar position="static">
        <Toolbar>
            <Typography variant="headline" color="textPrimary" className='grow nav-title'>
                <Link to={routes.LANDING}>Instagram</Link>
            </Typography>
            <Typography variant="headline" color="textSecondary" className='grow nav-title'>
                <Link to={routes.SIGN_IN}>Sign in</Link>
            </Typography>
            <Typography variant="headline" color="textSecondary" className='grow nav-title'>
                <Link to={routes.SIGN_UP}>Sign up</Link>
            </Typography>
        </Toolbar>
    </AppBar>

const Navigation = () => 
    <AuthUserContext.Consumer>
        { authUser => authUser ? <NavigationAuth/> : <NavigationNonAuth/> }
    </AuthUserContext.Consumer>

export default Navigation;