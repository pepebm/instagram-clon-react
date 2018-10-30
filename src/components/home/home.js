import React, { Component } from 'react';
import './home.css';

import Typography from '@material-ui/core/Typography';


class Home extends Component { 
    render(){
        return(
            <Typography component= "h1" variant= "h5">
                Hello World
            </Typography>
        );
    }
}

export default Home;