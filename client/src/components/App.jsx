import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Glue between React and Redux
import { Provider } from 'react-redux';
//Import store that holds all state
import store from '../redux/store.js';

import Expenses from './Expenses.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
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
      </Provider>
    )
  }
}

export default App;