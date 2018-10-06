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
    this.toggleIsLoggedIn = this.toggleIsLoggedIn.bind(this);
  }

  onSubmitHandler(e) {
    e.preventDefault();
    const user = {  
      name: this.state.name,
      password: this.state.password
    }
    console.log(verifyUser);
    this.props.verifyUser(user);
  }

  toggleIsLoggedIn() {
    this.setState({
      isLoggedIn: !isLoggedIn
    })
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
    if (this.state.isLoggedIn) {
      return <Redirect to="/home" />
    }
    return (
      <div>
        <h1>Slytherin</h1>
        <form>
          <div>
            Login: <br/>
            <input value={this.state.name} type="text" name="name" placeholder="Username" onChange={this.onChangeHandler} required/>
          </div><br/>
          <div>
            Password: <br/>
            <input value={this.state.password} type="password" name="password" placeholder="Password" onChange={this.onChangeHandler} required/>
          </div><br/>
          <div>
            <button type="submit" onClick={this.onSubmitHandler}>Login</button>
            <button type="submit" onClick={this.onRegister}>Register</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    username: state.username
  }
}

export default withRouter(connect(mapStateToProps, { verifyUser })(Login));