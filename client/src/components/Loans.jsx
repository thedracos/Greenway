import React, { Component } from 'react';
// import the different components to be displayed
import Loan from './Loan.jsx';
import UpcomingPayment from './Upcoming-Payment.jsx';
import Paid from './Paid.jsx';
import MissedPayment from './Missed-Payment.jsx';
// end of different components to be displayed
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
    this.makePayment = this.makePayment.bind(this);
  }

  updateLoans(loans) {
    console.log(loans.data);
    this.setState({loans: loans.data});
  }

  getLoans() {
    axios.get(`/api/loans/${this.props.userId}`)
    .then(this.updateLoans)
    .catch(err =>
      console.log('Error while getting loans from db. Line 35 getLoans', err)
    );

    axios.get(`/api/transactions/${this.props.userId}`)
    .then(payments => {
      this.setState({upcomingPayments: payments.data.filter(payment => payment !== null)});
    })
    .catch(err =>
      console.log('Error while getting payments from db. Line 44 getLoans', err)
    );
  }
  
  deleteLoan(loanIdAndUserId) {
    axios.delete('/api/loans/', {data: loanIdAndUserId})
    .then(() => this.getLoans())
    .catch(err =>
      console.log('Error while getting loans from db. Line 34 getLoans', err)
    );
  }

  makePayment(params) {
    axios.post('/api/transactions/', params)
    .then(() => axios.put('/api/loans', {id: params.loanId, balance: params.balance})
    .then(results => {
      this.getLoans();
    }))
    .catch(err =>
      console.log('Error makePayment. Line 64 getLoans', err)
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

  showPaymentStatus(payments, type) {
    // needs payment
    if (type === 'needs payment') {
      if (payments.length) {
        return (<ul className="flex-container">
        {
          payments.map(payment => <UpcomingPayment {...payment} makePayment={this.makePayment} key={payment.loan.id} />) 
        }
        </ul>)
      } 
      return <h5 style={{margin: '10px'}}>No upcoming payments at the moment.</h5>
    } // close if for needs payment
    
    // paid
    if (type === 'paid') {
      if (payments.length) {
        return (<ul className="flex-container">
        {
          payments.map(payment => <Paid {...payment} key={payment.loan.id} />) 
        }
        </ul>)
      } 
      return <h5 style={{margin: '10px'}}>No payments made yet.</h5>
    }  // close if for paid

    // missed
    if (type === 'missed') {
      if (payments.length) {
        return (<ul className="flex-container">
        {
          payments.map(payment => <MissedPayment {...payment} makePayment={this.makePayment} key={payment.loan.id} />) 
        }
        </ul>)
      } 
      return <h5 style={{margin: '10px'}}>Congratulations! You currently have no missed payments.</h5>
    } // close if for missed
  }

  AddUpdateOrButtonView() {
    if (this.state.addLoan === 'add') {
      return (<AddLoan className="add-loan" cancelAddLoan={this.cancelAddLoan} getLoans={this.getLoans} userId={this.props.userId} />)
    } else if (this.state.addLoan === 'update') {
      return (<UpdateLoan className="add-loan" {...this.state.loan} cancelAddLoan={this.cancelAddLoan} updateLoans={this.updateLoans} getLoans={this.getLoans} userId={this.props.userId} />)
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
        <div className="component-title">Upcoming Payments</div>
        {this.showPaymentStatus(this.state.upcomingPayments.filter(payment => payment.type === 'needs payment'), 'needs payment')}
        <div className="component-title">Made Payments</div>
        {this.showPaymentStatus(this.state.upcomingPayments.filter(payment => payment.type === 'paid'), 'paid')}
        <div className="component-title">Missed Payments</div>
        {this.showPaymentStatus(this.state.upcomingPayments.filter(payment => payment.type === 'missed'), 'missed')}    
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: state.store.userInfo.userId
})

export default connect(mapStateToProps)(Loans);