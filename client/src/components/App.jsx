import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Expenses from './Expenses.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Slytherin</h1>
        <div>
          Bills
          Savings
          Loans
          Investments
          Settings
        </div>
        <Expenses />
      </div>
    )
  }
}

export default App;