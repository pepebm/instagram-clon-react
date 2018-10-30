import React, { Component } from 'react';
import './landing.css';
import Typography from '@material-ui/core/Typography';


class Landing extends Component { 
    render(){
        return(
            <Typography component= "h1" variant= "h5">
                Hello World
            </Typography>
        );
    }
}

export default Landing;