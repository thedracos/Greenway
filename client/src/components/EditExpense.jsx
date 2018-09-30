import React, { Component } from 'react';

class EditExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expense: 'Buffalo Wild Wings',
      cost: 20,
      category: 'Food',
      frequency: 'Once',
      date: '10/02/18'
    }
  }
  render() {
    return (
      <div>
      <h3>Edit Expense</h3>
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
          <button type="submit">Save</button>
          <button type="submit">Cancel</button>
        </form>
      </div>
    )
  }
}

export default EditExpense;