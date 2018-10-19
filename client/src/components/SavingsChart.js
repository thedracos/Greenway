import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import moment from 'moment';
import { uniq, sortBy } from 'underscore';
import { Line } from 'react-chartjs-2';



class SavingsChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      line: {},
      savingsItems: []
    }

    this.getUniqueItems = this.getUniqueItems.bind(this);
    this.onChange = this.onChange.bind(this);
    this.displaySelectItemGraph = this.displaySelectItemGraph.bind(this);
  }

  getUniqueItems(array) {
    let allItems = array.map((savingsItem) => {
      return savingsItem.item;
    });
    let uniqueItems = uniq(allItems);
    let sortedItems = sortBy(uniqueItems);
    this.setState({
      savingsItems: sortedItems,
    })
  }

  displaySelectItemGraph(savingsItems) {
    let selectedItemDates = savingsItems.filter(savingsItem => {
      return savingsItem.item === this.state.savingsItem;
    })
    let sortedDates = sortBy(selectedItemDates, (savingsItem) => {
      return savingsItem.current_date;
    });
    let dropDownDates = sortedDates.map(savingsItem => {
      return moment(savingsItem.current_date).format('MMMM YYYY');
    });
    let costs = sortedDates.map(savingsItem => {
      return savingsItem.cost;
    });
    this.setState({
      line: {
        labels: dropDownDates,
        datasets: [
          {
            label: selectedItemDates[0].item,
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
            pointRadius: 3,
            pointHitRadius: 10,
            data: costs
          }
        ]
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.savings.length > 0 && this.state.savingsItems.length === 0) {
      this.getUniqueItems(this.props.savings);
    } else if (prevProps.savings !== this.props.savings) {
      this.getUniqueItems(this.props.savings);
    }
    if (this.state.savingsItem !== prevState.savingsItem) {
      this.displaySelectItemGraph(this.props.savings);
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div>
        <select className="goal-select" name="savingsItem" onChange={this.onChange}>
          <option>View a goal</option>
          {this.state.savingsItems.map((item)=> {
            return (
              <option>{item}</option>
            )
          })}
        </select>
        <div style={{width: '500px'}}>
          <Line
            data={this.state.line}
            height={250}
            options={{
              maintainAspectRatio: false,
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true,
                    min: 0
                  }
                }],
                xAxes: [{
                  ticks: {
                    maxRotation: 30,
                    minRotation: 30
                  }
                }]
              }
            }}
            legend={{
              display: false
            }}
          />
        </div>
      </div>
    );
  }
}

SavingsChart.propTypes = {
  savings: PropTypes.array.isRequired
}

const mapStateToProps = state => {
  console.log('this is state', state)
  return {
    savings: state.store.savings
  }
}

export default connect(mapStateToProps)(SavingsChart);