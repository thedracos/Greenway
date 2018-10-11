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
        <div className="site-head"><h3 className="head-text">Slytherin&nbsp;</h3></div>
        <div className="signup">
          <form onSubmit={this.onSubmitHandler}>
            <div className="signup-header">Sign up:</div>
            <div>
              <label>Username</label><br/>
              <input value={this.state.name} onChange={this.onChangeHandler} placeholder="   Username" type="text" name="name" className="big-field" required />
            </div><br/>
            <div>
              <label>Password</label><br/>
              <input name="password" value={this.state.password} placeholder="   Password" type="password" onChange={this.onChangeHandler} className="big-field" required />
            </div><br/>
            <div>
              <label>Confirm password</label><br/>
              <input onChange={this.confirmPasswordChangeHandler} type="password" placeholder="   Confirm password" className="big-field" required />
            </div><br/>
            <div>
              <label>Monthly income ($)</label><br/>
              <input value={this.state.income} type="number" onChange={this.onChangeHandler} name="income" min="0.00" step="0.01" placeholder="   e.g. 1000" className="big-field" required />
            </div><br/>
            <div>
              <label>Deposit date</label><br/>
              <input value={this.state.date} type="date" onChange={this.onChangeHandler} name="date" placeholder="    Date:" className="big-field" required />
            </div><br/>
            <div>
              <label>Deposit frequency</label><br/>
              <select name="frequency" onChange={this.onChangeHandler} className="big-field" required>
                <option value="">&nbsp;&nbsp;Please select a frequency</option>
                <option value="biweekly">&nbsp;&nbsp;Biweekly</option>
                <option value="weekly">&nbsp;&nbsp;Weekly</option>
                <option value="monthly">&nbsp;&nbsp;Monthly</option>
              </select>
            </div><br/>
            <input type="submit" className="big-btn" value="Sign up" />
          </form>
        </div>
      </div>
    );
  }
}


export default withRouter(SignUp);