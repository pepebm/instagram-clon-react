import React from 'react';
import ReactDOM from 'react-dom';
import AddPost from './addPost';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render( <AddPost/> , div);
    ReactDOM.unmountComponentAtNode(div);
});
