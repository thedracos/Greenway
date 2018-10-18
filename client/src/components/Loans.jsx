import React, { Component } from 'react';
import Loan from './Loan.jsx';
import AddLoan from './Add-Loan.jsx';
import UpdateLoan from './Update-Loan.jsx';
import axios from 'axios';
import { connect } from 'react-redux';

class Loans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loans: [],
      upcomingPayments: [],
      addLoan: 'button',
      loan: {}
    }
    this.getLoans = this.getLoans.bind(this);
    this.updateLoans = this.updateLoans.bind(this);
    this.deleteLoan = this.deleteLoan.bind(this);
    this.showAddLoanForm = this.showAddLoanForm.bind(this);
    this.cancelAddLoan = this.cancelAddLoan.bind(this);
    this.AddUpdateOrButtonView = this.AddUpdateOrButtonView.bind(this);
    this.showUpdateLoanForm = this.showUpdateLoanForm.bind(this);
  }

  updateLoans(loans) {
    console.log(loans.data);
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
    axios.delete('/api/loans/', {data: loanIdAndUserId})
    .then(results => this.updateLoans(results))
    .catch(err =>
      console.log('Error while getting loans from db. Line 34 getLoans', err)
    );
  }

  showAddLoanForm() {
    this.setState({
      addLoan: 'add'
    });
  }

  showUpdateLoanForm(loan) {
    this.setState({
      addLoan: 'update',
      loan: loan
    });
  }

  cancelAddLoan() {
    this.setState({
      addLoan: 'button'
    })
  }


  AddUpdateOrButtonView() {
    if (this.state.addLoan === 'add') {
      return (<AddLoan className="add-loan" cancelAddLoan={this.cancelAddLoan} updateLoans={this.updateLoans} userId={this.props.userId} />)
    } else if (this.state.addLoan === 'update') {
      return (<UpdateLoan className="add-loan" {...this.state.loan} cancelAddLoan={this.cancelAddLoan} updateLoans={this.updateLoans} userId={this.props.userId} />)
    } else if (this.state.addLoan === 'button') {
      return (<button onClick={this.showAddLoanForm}>Add New Loan</button>)
    }
  }

  componentDidMount() {
    this.getLoans();
  }

  render() {
    return (
      <div>
        <div className="component-title">Loans</div>
        <ul className="flex-container">
          {
            this.state.loans.map(loan => <Loan {...loan} deleteLoan={this.deleteLoan} showUpdateLoanForm={this.showUpdateLoanForm} key={loan.id}/>)
          }
        </ul>
        <div className="add-loan">
          {this.AddUpdateOrButtonView()}
        </div>
        <div className="loans-title">Upcoming Payments</div>
        <ul className="flex-container">
          {
            this.state.loans.map(loan => <Loan {...loan} deleteLoan={this.deleteLoan} showUpdateLoanForm={this.showUpdateLoanForm} key={loan.id}/>)
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.store.userInfo.userId
})

export default connect(mapStateToProps)(Loans);