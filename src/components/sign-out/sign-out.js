import React from 'react';

import { auth } from '../../firebase/index';

import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import './sign-out.css';

const SignOut = () =>
    <Button 
        variant="contained"
        color="secondary"
        onClick={auth.signoutUser}>
        Exit app
        <ExitToAppIcon />
    </Button>

export default SignOut;