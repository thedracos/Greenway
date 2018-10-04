import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Expenses from './Expenses.jsx';
import Login from './Login.jsx';

const App = ({ match }) => {
  return (
    <div>
      <h1>Slytherin</h1>
      <Expenses />
    </div>
  )
}

export default App;