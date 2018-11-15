import React from 'react';
import ReactDOM from 'react-dom';
import Profile from './profile';
import {
    BrowserRouter as Router
} from 'react-router-dom';
import { mount } from 'enzyme';
import withAuthorization from '../withAuthorization';



it('renders without crashing', () => {
    const div = document.createElement('div');
    const app = mount(<Router>< Profile / ></Router>);
    ReactDOM.render(app, div);
    ReactDOM.unmountComponentAtNode(div);
});
