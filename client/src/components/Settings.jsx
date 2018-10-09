import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchExpenses, deleteExpense } from '../redux/actions/actions';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      newName: '',
      newPass: '',
      newIncome: ''
    }
    this.styles = {
      width: '180px'
    }
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.confirmPasswordChangeHandler = this.confirmPasswordChangeHandler.bind(this);
  }

  onSubmitHandler (event) {
    console.log('hello');
    console.log(this.state);
    fetch('/api/users/update', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    event.preventDefault();
    this.props.history.push("/signup");
    console.log('Your updates have been stored');
  }

  onChangeHandler(event) {
    this.setState({
      [event.target.name] : event.target.value
    });
  }

  confirmPasswordChangeHandler(event) {
    if (event.target.value !== this.state.newPass) {
      event.target.setCustomValidity("Please confirm the password fields match");
    } else {
      event.target.setCustomValidity("");
    }
  }

  render() {
    return (
      <div>
        <h4>Update details</h4>
        <form onSubmit={this.onSubmitHandler}>
          <div>
            <label>Update username:</label><br/>
            <input value={this.state.newName} onChange={this.onChangeHandler} placeholder="Enter new username (optional)" type="text" name="newName" style={this.styles}/>
          </div><br/>
          <div>
            <label>Update monthly income</label><br/>
            <input value={this.state.newIncome} type="number" onChange={this.onChangeHandler} name="newIncome" min="0.00" step="0.01" placeholder="Enter updated income (optional)" style={this.styles}/>
          </div><br/>
          <div>
            <label>Update password:</label><br/>
            <input name="password" value={this.state.newPass} placeholder="Update password (optional)" type="password" name="newPass" onChange={this.onChangeHandler} style={this.styles}/>
          </div><br/>
          <div>
            <label>Re-enter updated password:</label><br/>
            <input onChange={this.confirmPasswordChangeHandler} type="password" name="confirmPass" placeholder="Confirm password" style={this.styles}/>
          </div><br/>

          <input type="submit" value="Save changes" />
        </form>
      </div>
    )
  }
}

Settings.propTypes = {
  user: PropTypes.number.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.store.userInfo.username
  }
};

export default connect(mapStateToProps, {})(Settings);