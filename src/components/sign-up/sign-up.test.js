import React from 'react';
import ReactDOM from 'react-dom';
import Signup from './sign-up';
import { BrowserRouter as Router } from 'react-router-dom';

it('sign-up renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render( <Router><Signup/></Router> , div);
    ReactDOM.unmountComponentAtNode(div);
});
