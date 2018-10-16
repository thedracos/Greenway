import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';

class SavingsChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    }
  }

  componentDidUpdate(prevProps) {
    console.log('prevProps', prevProps);
    console.log('currentProps', this.props);
  }

  render() {
    return (
      <div>
        <Line data={this.state}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('this is state', state)
  return {
    savings: state.store.savings
  }
}

export default connect(mapStateToProps)(SavingsChart);