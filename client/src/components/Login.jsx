import React, {Component} from 'react';
import { BrowserRouter as Router, withRouter, Redirect} from 'react-router-dom';

import { connect } from 'react-redux';
import { verifyUser } from '../redux/actions/actions.js';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      isLoggedIn: false
    }
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onRegister = this.onRegister.bind(this);
  }

  onSubmitHandler(e) {
    e.preventDefault();
    const user = {
      name: this.state.name,
      password: this.state.password
    }
    this.props.verifyUser(user);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.userId) {
      this.props.history.push("/home");
    } else {
      alert('Incorrect Username and Password. Please refresh and try again');
    }
  }

  onChangeHandler(e) {
    this.setState({
      [e.target.name] : e.target.value
    }, () => console.log(this.state));
  }

  onRegister() {
    this.props.history.push("/signup");
  }

  render() {
    return (
      <div>
        <div className="site-head"><h3 className="head-text">Moneyway&nbsp;</h3></div>
        <div className="login">

          <form className="login-form">
            <div className="login-header">Log in:</div>
            <div>
              <input value={this.state.name} type="text" name="name" placeholder="   Username" onChange={this.onChangeHandler} className="big-field" required/>
            </div><br/>
            <div>
              <input value={this.state.password} type="password" name="password" placeholder="   Password" onChange={this.onChangeHandler} className="big-field" required/>
            </div><br/>
            <div className="login-btn-container">
              <button type="submit" onClick={this.onSubmitHandler} className="login-btn">Log in</button> <div className="login-btn-space"></div><button type="submit" onClick={this.onRegister} className="reg-btn">Sign up</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.store.userInfo.userId
  }
}

export default withRouter(connect(mapStateToProps, { verifyUser })(Login));