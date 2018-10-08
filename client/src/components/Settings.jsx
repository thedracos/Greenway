import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchExpenses, deleteExpense } from '../redux/actions/actions';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
// import AddExpense from './AddExpense.jsx';
// import EditExpense from './EditExpense.jsx';

class Settings extends Component {
  constructor(props) {
    super(props);
    // this.state?
    // this.functions?
  }

  componentWillMount() {
    console.log(props);
    // this.props.fetchExpenses();
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.expense) {
  //     this.props.expenses.push(nextProps.expense);
  //   }
  // }

  updateInfo(details) {
    console.log(details);
    const updatedInfo = {
      name: details.name,
      income: details.income
    }
    this.setState({
      info: updatedInfo
    })
  }

  render() {
    return (
      <Router>
        <div>
          Hello
        </div>
      </Router>
    )


//   render () {
//     return (
//       <div>
//         <h1>Slytherin</h1>
//         <form onSubmit={this.onSubmitHandler}>
//           <h2>Sign Up</h2>
//             <div>
//               <label>Username:</label><br/>
//               <input value={this.state.name} onChange={this.onChangeHandler} placeholder="name" type="text" name="name" required />
//             </div><br/>
//             <div>
//               <label>Password:</label><br/>
//               <input name="password" value={this.state.password} placeholder="password" type="password" onChange={this.onChangeHandler} required />
//             </div><br/>
//             <div>
//               <label>Re-enter Password:</label><br/>
//               <input onChange={this.confirmPasswordChangeHandler} type="password" placeholder="confirm password" required />
//             </div><br/>
//             <div>
//               <label>Monthly Income</label><br/>
//               $<input value={this.state.income} type="number" onChange={this.onChangeHandler} name="income" min="0.00" step="0.01" placeholder="e.g. 1000.00" required />
//             </div><br/>
//             <div>
//               <label>Payday</label><br/>
//               <input value={this.state.date} type="date" onChange={this.onChangeHandler} name="date" required />
//             </div><br/>
//             <div>
//               <label>Pay Frequency</label><br/>
//               <select name="frequency" onChange={this.onChangeHandler} required>
//                 <option value="">Please select an option</option>
//                 <option value="biweekly">Biweekly</option>
//                 <option value="weekly">Weekly</option>
//                 <option value="monthly">Monthly</option>
//               </select>
//             </div><br/>
//             <input type="submit" value="Submit" />
//         </form>
//       </div>
//     );
//   }
// }





  // render() {
  //   return (
  //     <Router>
  //       <div>
  //         <h2>Expenses</h2>
  //         Income: {this.state.income}<br />
  //         Expenses: {this.state.bills}<br />
  //         Remainder: {this.state.income - this.state.bills}<br /><br />
  //         <tr>
  //           <th>Expense</th>
  //           <th>Cost</th>
  //           <th>Category</th>
  //           <th>Frequency</th>
  //           <th>Date</th>
  //           <th>Edit/Delete</th>
  //         </tr>
  //         {this.props.expenses.map(expense => {
  //           return (
  //             <tr>
  //               <td>{expense.expense}</td>
  //               <td>{`$${expense.cost}`}</td>
  //               <td>{expense.category}</td>
  //               <td>{expense.frequency}</td>
  //               <td>{expense.date}</td>
  //               <td>
  //                 <button onClick={() => {this.updateExpense(expense)}}>Edit</button>
  //                 <button onClick={() => {this.props.deleteExpense(expense)}}>Delete</button>
  //               </td>
  //             </tr>
  //           )
  //         })}
  //         <AddExpense />
  //         {/* <EditExpense editExpense={this.state.editExpense}/> */}
  //       </div>
  //     </Router>
  //   )
  // }

  }
}





// Settings.propTypes = {
//   // fetchExpenses: PropTypes.func.isRequired,
//   // deleteExpense: PropTypes.func.isRequired,
//   // expenses: PropTypes.array.isRequired,
//   // expense: PropTypes.object.isRequired
// };

// const mapStateToProps = state => {
//   return {
//     // expenses: state.expenses.expenses,
//     // expense: state.expenses.expense
//   }
// };

export default Settings;

// // https://reacttraining.com/react-router/web/guides/redux-integration
// export default withRouter(connect(mapStateToProps, {
// //   // fetchExpenses, deleteExpense
// })(Settings));


    // return (
    //   <Router>
    //     <div>
    //       Hello
    //     </div>
    //   </Router>
    // )
