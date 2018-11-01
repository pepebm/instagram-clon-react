import React from 'react';
import { Link } from 'react-router-dom';
import { Toolbar } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import * as routes from '../../constants/routes';
import AuthUserContext from '../AuthUserContext';
import './navigation.css';
import { auth } from '../../firebase/index';
import logo from './logo.png';

const NavigationAuth = ({ authUser }) =>
    <AppBar position="sticky">
        <Toolbar>
            <Typography variant="headline" className='grow nav-title'>
                <Link to={routes.HOME}>
                    <img src={logo} alt="Instagram" className="logo"/>
                </Link>
            </Typography>
            <Link to={routes.ACCOUNT}>
                <IconButton className='grow nav-title'>
                    <AccountCircleIcon/>
                </IconButton>
            </Link>
            <IconButton onClick={auth.signoutUser} className="nav-title">
                <ExitToAppIcon />
            </IconButton>
        </Toolbar>
    </AppBar>

const NavigationNonAuth = () =>
    <AppBar position="static">
        <Toolbar>
            <Typography variant="headline" color="textPrimary" className='grow nav-title'>
                <Link to={routes.SIGN_IN}>
                    <img src={logo} alt="Instagram" className="logo"/>
                </Link>
            </Typography>
        </Toolbar>
    </AppBar>

const Navigation = () => 
    <AuthUserContext.Consumer>
        { authUser => authUser ? <NavigationAuth authUser={authUser}/> : <NavigationNonAuth/> }
    </AuthUserContext.Consumer>

export default Navigation;