import React from 'react';
import ReactDOM from 'react-dom';
import {createStore } from 'redux'
import reducers from './reducers'
import { Provider } from 'react-redux'
import Department from './containers/App'


ReactDOM.render(
    <Department />,
    document.getElementById('root')
);