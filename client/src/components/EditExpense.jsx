import React, { Component } from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';

class EditExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.editExpense.id,
      expense: this.props.editExpense.expense,
      cost: this.props.editExpense.cost,
      category: this.props.editExpense.category,
      frequency: this.props.editExpense.frequency,
      date: this.props.editExpense.date
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value}, () => {console.log(this.state)});
  }

  onSubmit(e) {
    
    // e.preventDefault();
    const updatedExpense = {
      id: this.state.id,
      expense: this.state.expense,
      cost: this.state.cost,
      category: this.state.category,
      frequency: this.state.frequency,
      date: this.state.date
    }
    fetch('/updateExpense', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(updatedExpense)
    })
    .then(res => res.json())
    .then(data => console.log(data));
  }

  render() {
    return (
      <div>
        <h3>Edit Expense</h3>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Expense: </label><br />
            <input type="text" name={"expense"} onChange={this.onChange} defaultValue={this.props.editExpense.expense} />
          </div>
          <div>
            <label>Cost: </label><br />
            <input type="text" name={"cost"} onChange={this.onChange} defaultValue={this.props.editExpense.cost} />
          </div>
          <div>
            <label>Category: </label><br />
            <input type="text" name={"category"} onChange={this.onChange} defaultValue={this.props.editExpense.category} />
          </div>
          <div>
            <label>Frequency: </label><br />
            <input type="text" name={"frequency"} onChange={this.onChange} defaultValue={this.props.editExpense.frequency} />
          </div>
          <div>
            <label>Date: </label><br />
            <input type="text" name={"date"} onChange={this.onChange} defaultValue={this.props.editExpense.date} />
          </div><br />
          <button type="submit">Save</button>
          {/* <button type="submit">Cancel</button> */}
        </form>
      </div>
    )
  }
}

export default EditExpense;