import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Savings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remaining: 200,
      wishlist: [
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
        {this.state.wishlist.map(item => {
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
              <th>{item.amountRemaining / 19}</th>
              <td><button type="submit">Save!</button></td>
            </tr>
          )
        })}
      </div>
    )
  }
}

export default Savings;