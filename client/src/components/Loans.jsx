import React, { Component } from 'react';
import Loan from './Loan.jsx';
import AddLoan from './Add-Loan.jsx';
import axios from 'axios';
import { connect } from 'react-redux';

class Loans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loans: []
    }
    this.getLoans = this.getLoans.bind(this);
    this.updateLoans = this.updateLoans.bind(this);
    this.deleteLoan = this.deleteLoan.bind(this);
  }

  updateLoans(loans) {
    this.setState({loans: loans.data});
  }

  getLoans() {
    axios.get(`/api/loans/${this.props.userId}`)
    .then(this.updateLoans)
    .catch(err =>
      console.log('Error while getting loans from db. Line 26 getLoans', err)
    );
  }
  
  deleteLoan(loanIdAndUserId) {
    console.log('deleteLoan line 31 Loans.jsx. Return value', loanIdAndUserId)
    axios.delete('/api/loans/', {data: loanIdAndUserId})
    .then(results => {
      console.log('deleteLoan line 34 Loans.jsx. Return value', results)
      this.updateLoans(results);
    })
    .catch(err =>
      console.log('Error while getting loans from db. Line 26 getLoans', err)
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
            this.state.loans.map((loan, index) => <Loan {...loan} deleteLoan={this.deleteLoan} key={index} userId={this.props.userId}/>)
          }
        </ul>
        <div className="add-loan">
          <AddLoan className="add-loan" updateLoans={this.updateLoans} userId={this.props.userId} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.store.userInfo.userId
})

export default connect(mapStateToProps)(Loans);