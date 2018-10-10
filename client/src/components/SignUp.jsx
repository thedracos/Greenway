import React, {Component} from 'react';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      date: '',
      income: '',
      frequency: ''
    }
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.confirmPasswordChangeHandler = this.confirmPasswordChangeHandler.bind(this);
  }

  onSubmitHandler (event) {
    console.log('hello');
    fetch('/api/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    event.preventDefault();
    this.props.history.push("/");
  }

  onChangeHandler(event) {
    this.setState({
      [event.target.name] : event.target.value
    });
  }

  confirmPasswordChangeHandler(event) {
    if (event.target.value !== this.state.password) {
      event.target.setCustomValidity("Passwords Don't Match");
    } else {
      event.target.setCustomValidity("");
    }                
  }

  render () {
    return (
      <div>
        <h1>Slytherin</h1>
        <form onSubmit={this.onSubmitHandler}>
          <h2>Sign Up</h2>
            <div>
              <label>Username:</label><br/>
              <input value={this.state.name} onChange={this.onChangeHandler} placeholder="name" type="text" name="name" required />
            </div><br/>
            <div>
              <label>Password:</label><br/>
              <input name="password" value={this.state.password} placeholder="password" type="password" onChange={this.onChangeHandler} required />
            </div><br/>
            <div>
              <label>Re-enter Password:</label><br/>
              <input onChange={this.confirmPasswordChangeHandler} type="password" placeholder="confirm password" required />
            </div><br/>
            <div>
              <label>Monthly Income</label><br/>
              $<input value={this.state.income} type="number" onChange={this.onChangeHandler} name="income" min="0.00" step="0.01" placeholder="e.g. 1000.00" required />
            </div><br/>
            <div>
              <label>Payday</label><br/>
              <input value={this.state.date} type="date" onChange={this.onChangeHandler} name="date" required />
            </div><br/>
            <div>
              <label>Pay Frequency</label><br/>
              <select name="frequency" onChange={this.onChangeHandler} required>
                <option value="">Please select an option</option>
                <option value="biweekly">Biweekly</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div><br/>
            <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}


export default withRouter(SignUp);