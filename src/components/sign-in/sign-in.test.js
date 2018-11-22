import React from 'react';
import ReactDOM from 'react-dom';
import Signin from './sign-in';
import { BrowserRouter as Router } from 'react-router-dom';


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render( <Router><Signin/></Router> , div);
    ReactDOM.unmountComponentAtNode(div);
});
