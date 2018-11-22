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

export const NavigationAuth = ({ authUser }) =>
    <AppBar position="sticky">
        <Toolbar>
            <Typography variant="h5" className='grow nav-title'>
                <Link to={routes.HOME} id="route-home">
                    <img src={logo} alt="Instagram" className="logo"/>
                </Link>
            </Typography>
            <Link to={routes.ACCOUNT} id="route-profile">
                <IconButton className='grow nav-title'>
                    <Typography variant="subtitle2" style={{marginRight: '0.5rem'}}>
                        {authUser.username}
                    </Typography>
                    <AccountCircleIcon/>
                </IconButton>
            </Link>
            <IconButton onClick={auth.signoutUser} className="nav-title" id="exitapp">
                <ExitToAppIcon />
            </IconButton>
        </Toolbar>
    </AppBar>

export const NavigationNonAuth = () =>
    <AppBar position="static">
        <Toolbar>
            <Typography variant="h5" color="textPrimary" className='grow nav-title'>
                <Link to={routes.SIGN_IN} id="route-sign-in">
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