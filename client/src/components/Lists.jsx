import React, { Component } from 'react';
import PropTypes from 'prop-types';

//connects component to redux
import { connect } from 'react-redux';
import { fetchExpenses, deleteExpense } from '../redux/actions/actions';

//React Router
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      }
    }
  }

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    return (
      <Router>
        <div>
          Lists
        </div>
      </Router>
    )
  }
}

Lists.propTypes = {
}

//Similar to setState within this component, grabs contents in store
//and defines our state to the data we want to use
const mapStateToProps = state => {
  return {
  }
};

//https://reacttraining.com/react-router/web/guides/redux-integration
// export default withRouter(connect(mapStateToProps, {})(Lists));