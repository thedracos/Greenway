import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { fetchSavings } from '../redux/actions/actions';

import AddSaving from './AddSaving.jsx';

class Savings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remaining: 200,
      savings: [
        {
          id: 1,
          name: 'PS4',
          amountRemaining: 220,
        },
        {
          id: 2,
          name: 'Hawaii',
          amountRemaining: 3010,
        },
        {
          id: 3,
          name: 'Dragon Egg',
          amountRemaining: 1120,
        }
      ]
    }
  }

  componentDidMount() {
    //this.props.fetchSavings(this.props.userId);
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
        {this.state.savings.map(item => {
          return (
            <tr>
              <td>{item.name}</td>
              <td>{`$${item.amountRemaining}`}</td>
              <td>
                <form>
                  <label>$</label>
                  <input type="text" name= {item.id}/>
                </form>
              </td>
              <td>{item.amountRemaining / 19}</td>
              <td><button type="submit">Save!</button></td>
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

export default connect(mapStateToProps, { fetchSavings })(Savings);