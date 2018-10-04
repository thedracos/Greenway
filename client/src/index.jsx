// Entry Point

import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root.js';

import store from './redux/store.js';

ReactDOM.render(<Root store={store}/>, document.getElementById('app'));