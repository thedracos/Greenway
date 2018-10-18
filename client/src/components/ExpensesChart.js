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
          '#ed472a',
          '#49484d',
          '#4f0656',
          '#840d0d',
          '#b3b4b7',
          '#ddc271',
          '#9b009b',
          '#5198db',
          '#01528c',
          '#bc8907'
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
          width={540}
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
          tooltips={{
            bodyFontColor: 'ffd87c',
            borderWidth: 0
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