import React, { Component } from 'react';
import Loan from './Loan.jsx';
import AddLoan from './Add-Loan.jsx';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

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

  getLoans() {
    fetch('/api/loans').then(res => res.json())
    .then(this.updateLoans)
    .catch(err =>
      console.log('Error while getting loans from db:', err)
    );
  }

  componentDidMount() {
    this.getLoans();
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
        <AddLoan updateLoans={this.updateLoans} />
      </div>
    )
  }
}

const mapStateToProps = state => { userId: state.store.userInfo.userId }

export default connect(mapStateToProps)(Loans);