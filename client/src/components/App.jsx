import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Expenses from './Expenses.jsx';
import AddExpense from './AddExpense.jsx';
import Login from './Login.jsx';

const App = ({ match }) => {
  return (
    <Router>
      <div>
        <h1>Slytherin</h1>
        <ul>
          <li>
            <Link to="/home">Expenses</Link>
          </li>
          <li>
            <Link to="/savings">Savings</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
        <Route path='/home' component={Expenses} />
      </div>
    </Router>
  )
}

export default App;