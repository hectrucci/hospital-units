import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store/store';

window.React = React;

const appElement = document.querySelector('#app');

render(
    <Provider store={store}>
        <App />
    </Provider>,
    appElement
);
