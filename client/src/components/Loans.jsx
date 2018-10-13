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
  }

  updateLoans(loans) {
    this.setState({loans: loans.data});
  }

  getLoans(userId) {
    console.log("from getLoans", userId);
    axios.get(`/api/loans/${userId}`)
    .then(this.updateLoans)
    .catch(err =>
      console.log('Error while getting loans from db. Line 26 getLoans', err)
    );
  }
  
  componentDidMount() {
    console.log('in componemtDidMount of Loans component')
    this.getLoans(this.props.userId);
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