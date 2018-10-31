import React, { Component } from 'react';
import './home.css';
import withAuthorization from '../withAuthorization';

import Typography from '@material-ui/core/Typography';


const authCondition = (authUser) => !!authUser;
class Home extends Component { 
    render(){
        return(
            <Typography component= "h1" variant= "h5">
                Hello World
            </Typography>
        );
    }
}

export default withAuthorization(authCondition)(Home);