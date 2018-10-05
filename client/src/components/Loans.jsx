import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route } from 'react-router-dom';

class Loans extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div>
            Hello
        </div>
      </Router>
    )
  }
}

export default Loans;