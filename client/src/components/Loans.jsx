import React, { Component } from 'react';
import Loan from './Loan.jsx';
import AddLoan from './Add-Loan.jsx';

import { BrowserRouter as Router, Route } from 'react-router-dom';

class Loans extends Component {
  constructor(props) {
    super(props);
    this.state= {
      loans: [
        {name: 'Discover',
        minimumPayment: 100.00,
        balance: 2000.00,
        dayBillDue: 5,
        apr: '19.99',
        autopay: false,
        website: 'www.discovercard.com'},
        {name: 'Discover',
        minimumPayment: 100.00,
        balance: 2000.00,
        dayBillDue: 5,
        apr: '19.99',
        autopay: false,
        website: 'www.discovercard.com'},
        {name: 'Discover',
        minimumPayment: 100.00,
        balance: 2000.00,
        dayBillDue: 5,
        apr: '19.99',
        autopay: false,
        website: 'www.discovercard.com'}
    ]
    }
    // this.getLoans = this.getLoans.bind(this);
    this.updateLoans = this.updateLoans.bind(this);
  }

  updateLoans(loans) {
    this.setState({loans: loans})
  }

  // getLoans() {
  //   fetch('/api/loans')
  //   .then(this.updateLoans)
  //   .catch(err =>
  //     console.log('Error while getting loans from db:', err)
  //   );
  // }

  // componentDidMount() {
  //   this.getLoans();
  // }

  render() {
    return (
      <div>
      <ul className="flex-container">
        {
          this.state.loans.map((loan, index) => <Loan {...loan} key={index}/>)
        }
      </ul>
        <AddLoan />
      </div>
    )
  }
}

export default Loans;