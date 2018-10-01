import React, { Component } from 'react';

class AddExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expense: '',
      cost: '',
      category: '',
      frequency: '',
      date: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    console.log(e.target.name);
    this.setState({ [e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.expense.length === 0 || this.state.cost.length === 0 || this.state.category === 0 || this.state.frequency.length === 0 || this.state.date.length === 0) {
      alert('Please Complete All Forms');
    } else {
      const newExpense = {
        expense: this.state.expense,
        cost: this.state.cost,
        category: this.state.category,
        frequency: this.state.frequency,
        date: this.state.date
      }

      fetch('/addExpense', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(newExpense)
      })
      .then(res => res.json())
      .then(data => console.log(data));
    }
  }

  render() {
    return (
      <div>
        <h3>Add Expense</h3>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Expense: </label><br />
            <input type="text" name="expense" onChange={this.onChange} />
          </div>
          <div>
            <label>Cost: </label><br />
            <input type="text" name="cost" onChange={this.onChange} />
          </div>
          <div>
            <label>Category: </label><br />
            <input type="text" name="category" onChange={this.onChange} />
          </div>
          <div>
            <label>Frequency: </label><br />
            <input type="text" name="frequency" onChange={this.onChange} />
          </div>
          <div>
            <label>Date: </label><br />
            <input type="text" name="date" onChange={this.onChange} />
          </div><br />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default AddExpense;