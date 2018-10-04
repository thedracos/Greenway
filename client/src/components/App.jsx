import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Expenses from './Expenses.jsx';
import Login from './Login.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
         <h1>Slytherin</h1>
         <Expenses />
      </div>
    )
  }
}

export default App;