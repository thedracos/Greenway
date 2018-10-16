import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';

class ExpensesChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: ['Rent/Mortgage', 'Utilities', 'Transportation', 'Groceries', 'Dining Out', 'Entertainment', 'Health/Fitness', 'Shopping', 'Miscellaneous', 'Loans'],
      datasets: [{
        data: [50, 100, 200],
        backgroundColor: [
          '#ff0000',
          '#0066ff',
          '#009900',
          '#9900cc',
          '#ff9900',
          '#000000',
          '#800000',
          '#669999',
          '#333399',
          '#ffff00'
        ]
      }]
    }
    this.generateData = this.generateData.bind(this);
  }

  generateData(array) {
    let result = [];
    for (var i = 0; i < this.state.labels.length; i++) {
      let totalPerCategory = array.filter(expense => {
        return expense.category === this.state.labels[i];
      })
      .reduce((total, expense) => {
        return total + expense.cost;
      }, 0);
      result.push(totalPerCategory);
    }
    this.setState({
      datasets: [{
        data: result
      }]
    })
  }

  componentDidUpdate(prevProps) {
    console.log('prevProps', prevProps);
    console.log('currentProps', this.props);
    if (prevProps.monthExpenses !== this.props.monthExpenses) {
      this.generateData(this.props.monthExpenses);
    }
    
  }

  render() {
    return (
      <div>
        <Doughnut 
          data={this.state} 
          width={300}
          height={300}
          options={{
            maintainAspectRatio: false
          }}
          legend={{
            //display: false
            position: 'right',
            fullWidth: false
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('this is state', state)
  return {
    monthExpenses: state.store.monthExpenses
  }
}

export default connect(mapStateToProps)(ExpensesChart);