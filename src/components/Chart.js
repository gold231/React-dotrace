import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: [0, 1, 2, 3, 4, 5],
        datasets: [
          {
            label: "Red's Token",
            data: [
              617594, 181045, 153060, 106519, 105162, 95072
            ],
            fill: false,
            borderColor: "red",
            pointBorderColor: "transparent",
            pointHoverBackgroundColor: "red"
          },
          {
            label: "Blue's Token",
            data: [
              123345, 378422, 234563, 678234, 133464, 785245
            ],
            fill: false,
            borderColor: "Blue",
            pointBorderColor: "transparent",
            pointHoverBackgroundColor: "Blue"
          }
        ]
      }      
    }
  }
  
  render () {
    let options = {
      legend: {
        display: true
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false
            },
            scaleLabel: {
              display: true
            },
            ticks: {
              autoSkip: true,
              autoSkipPadding: 20
            }
          }
        ],
        yAxes: [{
          display: true,
          gridLines: {
            drawOnChartArea: false
          },
          ticks: {
              suggestedMax: 10,
              beginAtZero: true
          }
        }]
      },
      elements: {
        line: {
          fill: false
        }
      }
    };
    return (
        <>
          <div className="chart">
            <Line 
              data={this.state.chartData}
              options={options}
              width={800}
              height={500}
            />
          </div>
        </>
    )
  }
}

export default Chart;