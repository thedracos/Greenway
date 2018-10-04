import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Expenses from './Expenses.jsx';
import AddExpense from './AddExpense.jsx';
import Login from './Login.jsx';

const App = ({ match }) => {
  return (
    <Router>
      <div>
        <h1>Slytherin</h1>
        <Route path='/home' component={Expenses} />
      </div>
    </Router>
  )
}

export default App;