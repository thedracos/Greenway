import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Expenses from './Expenses.jsx';
import Savings from './Savings.jsx';
import Loans from './Loans.jsx';
import Retirement from './Retirement.jsx';
import Settings from './Settings.jsx';

const App = ({ match }) => {
  return (
    <Router>
      <div>
        <div class="site-head"><h3 class="head-text">Slytherin&nbsp;&nbsp;</h3></div>
        <ul class="nav-bar">
          <li class="nav-btn">
            <Link to="/home">Expenses</Link>
          </li>
          <li class="nav-btn">
            <Link to="/savings">Savings</Link>
          </li>
          <li class="nav-btn">
            <Link to="/loans">Loans</Link>
          </li>
          <li class="nav-btn">
            <Link to="/retirement">Retirement</Link>
          </li>
          <li class="nav-btn">
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
        <Route path='/home' component={Expenses} />
        <Route path='/savings' component={Savings} />
        <Route path='/loans' component={Loans} />
        <Route path='/retirement' component={Retirement} />
        <Route path='/settings' component={Settings} />
      </div>
    </Router>
  )
}

export default App;