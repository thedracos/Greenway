import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSavings } from '../redux/actions/actions';

class AddSaving extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    const savingsItem = {
      userId: this.props.userId,
      item: this.state.item,
      cost: this.state.cost
    }
    this.props.createSavings(savingsItem);
  }

  render() {
    return (
      <div className="add-save">
        <form onSubmit={this.onSubmit}>
        <div className="add-save-header">Add goal:</div>
          <div className="pad-exp">
            <label>Saving Goal: </label><br />
            <input type="text" name="item" onChange={this.onChange} required/>
          </div>
          <div className="pad-exp">
            <label>Cost ($): </label><br />
            <input type="number" name="cost" onChange={this.onChange} min="0.00" step="0.01" placeholder="e.g. 1000.00" required/>
          </div>
          {/* <div>
            <label>Start Date: </label><br />
            <input type="date" name="date" onChange={this.onChange} required />
          </div><br /> */}
          <button className="add-save-btn" type="submit">Save</button>
        </form>
      </div>
    )
  }
}

AddSaving.propTypes = {
  createSavings: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  userId: state.store.userInfo.userId
})

export default connect(mapStateToProps, { createSavings })(AddSaving);