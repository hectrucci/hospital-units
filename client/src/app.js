import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import AppContainer from './containers/AppContainer';
import store from './store/store';

window.React = React;

const appElement = document.querySelector('#app');

render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    appElement
);
