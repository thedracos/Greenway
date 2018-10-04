import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App.jsx';
import Login from './Login.jsx';
import SignUp from './Sign-Up.jsx';

const Root = ({ store }) => {
  return (
    <Provider store = {store}>
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route path="/home" component={App} />
          <Route path="/signup" component={SignUp} />
        </div>
      </Router>
    </Provider>
  )
}

export default Root;