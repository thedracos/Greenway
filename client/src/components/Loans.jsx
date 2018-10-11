import React, { Component } from 'react';
import Loan from './Loan.jsx';
import AddLoan from './Add-Loan.jsx';

class Loans extends Component {
  constructor(props) {
    super(props);
    this.state= {
      loans: []
    }
    this.getLoans = this.getLoans.bind(this);
    this.updateLoans = this.updateLoans.bind(this);
  }

  updateLoans(loans) {
    this.setState({loans: loans})
  }

  getLoans(userId) {
    console.log("from getLoans", userId);
    fetch(`/api/loans/${userId}`)
    .then(res => res.json())
    .then(this.updateLoans)
    .catch(err =>
      console.log('Error while getting loans from db:', err)
    );
  }

  render() {
    return (
      <div>
        <div className="loans-title">Loans</div>
        <ul className="flex-container">
          {
            this.state.loans.map((loan, index) => <Loan {...loan} key={index} />)
          }
        </ul>
        <AddLoan className="add-loan" getLoans={this.getLoans} />
      </div>
    )
  }
}

export default Loans;