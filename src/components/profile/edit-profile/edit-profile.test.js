import React from 'react';
import ReactDOM from 'react-dom';
import EditProfile from './edit-profile';
import { BrowserRouter as Router } from 'react-router-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render( <Router><EditProfile/></Router> , div);
    ReactDOM.unmountComponentAtNode(div);
});
