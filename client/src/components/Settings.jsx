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
    fetch('/api/users/update', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    event.preventDefault();
    this.props.history.push("/signup");
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
      <div class="info">
        <form class="big-form" onSubmit={this.onSubmitHandler}>
          <div >
            <input value={this.state.newName} onChange={this.onChangeHandler} placeholder="   Update username (optional)" type="text" name="newName" class="big-field" />
          </div><br/>
          <div>
            <input value={this.state.newIncome} type="number" onChange={this.onChangeHandler} name="newIncome" min="0.00" step="0.01" placeholder="   Update monthly income (optional)" class="big-field" />
          </div><br/>
          <div>
            <input name="password" value={this.state.newPass} placeholder="   Update password (optional)" type="password" name="newPass" onChange={this.onChangeHandler} class="big-field" />
          </div><br/>
          <div>
            <input onChange={this.confirmPasswordChangeHandler} type="password" name="confirmPass" placeholder="   Confirm new password" class="big-field" />
          </div><br/>

          <input type="submit" value="Save changes" class="big-btn"/>
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