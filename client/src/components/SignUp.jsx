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
    .then(data => {
      for(var state in this.state) {
        this.onChange({target: {name: state, value: ''}});
      }
      event.preventDefault();
    });
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
        <hr/>
        <form onSubmit={this.onSubmitHandler}>
          <h2>Sign Up</h2>
            
            <input value={this.state.name} onChange={this.onChangeHandler} placeholder="name" type="text" name="name" required />
            <br/>
            <br/>
            <label>
                Amount of last pay check: <br/>
                $<input value={this.state.income} type="number" onChange={this.onChangeHandler} name="income" min="0.00" step="0.01" placeholder="e.g. 1000.00" required />
            </label>
            <br/>
            <br/>
            <label>
                Date of next pay check: <br/>
                <input value={this.state.date} type="date" onChange={this.onChangeHandler} name="date" required />
            </label>
            <br/>
            <br/>
            <label>
                How often are you paid: <br/>
                <select name="frequency" onChange={this.onChangeHandler} required>
                    <option value="">Please select an option</option>
                    <option value="biweekly">Biweekly</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
            </label>
            <br/>
            <br/>
            <input name="password" value={this.state.password} placeholder="password" type="password" onChange={this.onChangeHandler} required />
            <br/>
            <br/>
            <input onChange={this.confirmPasswordChangeHandler} type="password" placeholder="confirm password" required />
            <br/>
            <br/>
            <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}


export default SignUp;