import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import Papa from 'papaparse';

class Chart extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      xlabels: [],
      redToken: [],
      blueToken: []
    };
    this.GetData = this.GetData.bind(this);
    this.fetchCsv = this.fetchCsv.bind(this);
  }

  async GetData(artist) {
    const data = Papa.parse(await this.fetchCsv());
    let xlabels = [];
    let redToken = [];
    let blueToken = [];
    for(let i=1; i<100;i++) {
      xlabels.push(data.data[i][0]);
      redToken.push(data.data[i][1]);
      blueToken.push(data.data[i][2]);
    }  
    this.setState({xlabels: xlabels, redToken: redToken, blueToken: blueToken});
    return data;
  }
  
  async fetchCsv() {
    const response = await fetch('data/Scenario2.csv');
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    const csv = await decoder.decode(result.value);
    return csv;
  }

  render () {    
    this.GetData();
    console.log("xlabels",this.state.xlabels);

    let chartData = {
      labels: this.state.xlabels,
      datasets: [
        {
          label: "Red's Token",
          data: this.state.redToken,
          fill: false,
          borderColor: "red",
          pointBorderColor: "transparent",
          pointHoverBackgroundColor: "red"
        },
        {
          label: "Blue's Token",
          data: this.state.blueToken,
          fill: false,
          borderColor: "Blue",
          pointBorderColor: "transparent",
          pointHoverBackgroundColor: "Blue"
        }
      ]
    }  

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
              data={chartData}
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