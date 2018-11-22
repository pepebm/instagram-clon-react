import React from 'react';
import ReactDOM from 'react-dom';
import Profile from './profile';
import { BrowserRouter as Router } from 'react-router-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render( <Router><Profile/></Router> , div);
    ReactDOM.unmountComponentAtNode(div);
});
