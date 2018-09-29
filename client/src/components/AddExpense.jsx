import React, { Component } from 'react';

class AddExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expense: '',
      category: '',
      cost: '',
      frequency: '',
      date: ''
    }
  }
  render() {
    return (
      <div>
        <h3>Add Expense</h3>
        <form>
          <div>
            <label>Expense: </label><br />
            <input type="text"></input>
          </div>
          <div>
            <label>Cost: </label><br />
            <input type="text"></input>
          </div>
          <div>
            <label>Category: </label><br />
            <input type="text"></input>
          </div>
          <div>
            <label>Frequency: </label><br />
            <input type="text"></input>
          </div>
          <div>
            <label>Date: </label><br />
            <input type="text"></input>
          </div><br />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default AddExpense;