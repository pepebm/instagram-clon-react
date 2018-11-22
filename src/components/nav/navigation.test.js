import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation, { NavigationNonAuth, NavigationAuth } from './navigation';

it('nav renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render( <Router><Navigation/></Router> , div);

    ReactDOM.unmountComponentAtNode(div);
});

it('nav renders with non auth user', () => {
    const div = document.createElement('div');
    ReactDOM.render( <Router><NavigationNonAuth/></Router> , div);
    ReactDOM.unmountComponentAtNode(div);
});

it('nav renders with auth user', () => {
    const div = document.createElement('div');
    const user = {
        username: 'TEST',
        description: 'TEST',
        firstname: 'TE',
        lastname: 'ST'
    };
    ReactDOM.render(<Router><NavigationAuth authUser={user}/></Router> , div);

    ReactDOM.unmountComponentAtNode(div);
});