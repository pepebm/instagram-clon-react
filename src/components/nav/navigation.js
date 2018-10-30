import React from 'react';
import { Link } from 'react-router-dom';
import SignOut from '../sign-out/sign-out';
import * as routes from '../../constants/routes';

import './navigation.css';

import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { Toolbar } from '@material-ui/core';

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

const Navigation = ({ authUser }) => 
    <div>
        { authUser ? <NavigationAuth /> : <NavigationNonAuth /> }
    </div>

export default Navigation;