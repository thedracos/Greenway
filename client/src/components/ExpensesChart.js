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
          '#7a0000',
          '#7a007a',
          '#7a7a00',
          '#007a00',
          '#007a7a',
          '#00007a',
          '#800000',
          '#669999',
          '#333399',
          '#ffff00'
        ],
        borderColor: [
          '#ffd87c',
          '#ffd87c',
          '#ffd87c',
          '#ffd87c',
          '#ffd87c',
          '#ffd87c',
          '#ffd87c',
          '#ffd87c',
          '#ffd87c',
          '#ffd87c'
        ],
        borderWidth: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        hoverBorderWidth: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        cutoutPercentage: [80]
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
          width={400}
          height={300}
          options={{
            maintainAspectRatio: true,
            cutoutPercentage: 62
          }}
          legend={{
            // display: false,
            position: 'right',
            fullWidth: false,
            labels: {
              fontColor: '#ffd87c',
              boxWidth: 18
            }
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