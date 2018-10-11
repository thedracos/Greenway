import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchSavings, editSavings } from '../redux/actions/actions';

import AddSaving from './AddSaving.jsx';

class Savings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remaining: 200
    }
    this.updateSavings = this.updateSavings.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchSavings(this.props.userId);
  }

  updateSavings(savingItem) {
    const cost = savingItem.cost - this.state.editedItem;
    const editedItem = {
      userId: this.props.userId,
      item: savingItem.item,
      cost: cost
    }
    console.log(editedItem);
    this.props.editSavings(editedItem);
  }

  onChange(e) {
    console.log('this is e.target.name', e.target.name);
    console.log('this is e.target.value', e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div>
        <h2>Savings</h2>
        Total Remaining: {`$${this.state.remaining}`}< br/>
        < br/>
        <tr>
          <th>Goal</th>
          <th>Remaining</th>
          <th>Amount Saving</th>
          <th>Months Remaining</th>
          <th>Submit</th>
        </tr>
        {this.props.savings.map(item => {
          return (
            <tr>
              <td>{item.item}</td>
              <td>{`$${item.cost}`}</td>
              <td>
                <form>
                  <label>$</label>
                  <input type="number" name="editedItem" onChange={this.onChange} />
                </form>
              </td>
              <td>{item.cost / 19}</td>
              <td><button type="submit" onClick={() => {this.updateSavings(item)}}>Save!</button></td>
            </tr>
          )
        })}
        <AddSaving />
      </div>
    )
  }
}

Savings.propTypes = {
  savings: PropTypes.array.isRequired,
  fetchSavings: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    savings: state.store.savings,
    userId: state.store.userInfo.userId
  }
}

export default connect(mapStateToProps, { fetchSavings, editSavings })(Savings);