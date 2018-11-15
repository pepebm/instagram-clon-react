import React from 'react';
import Profile from './profile';
import {
    BrowserRouter as Router
} from 'react-router-dom';
import withAuthorization from '../withAuthorization';



it('renders without crashing', () => {
    const div = document.createElement('div');
    const app = global.shallow(<Router>< Profile / ></Router>);
});
