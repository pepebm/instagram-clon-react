import React from 'react';
import ReactDOM from 'react-dom';
import AddFriend from './addFriend';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render( <AddFriend/> , div);
    ReactDOM.unmountComponentAtNode(div);
});
