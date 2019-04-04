import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import './switch';

const Graph =(props)=>{

  
  const data = {
    labels: [],
    datasets: [
      {
        label: '',
        fill: false,
        lineTension: 1,
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
        data: []
      }
    ]
  };
  return(
    <Line data={data} />
  )

}

class doorchart extends Component {
 


  render() {
    
    return (
      <div>
        <Graph />
        <h2>{this.props.name}</h2>
      </div>
    );
  }
}

export default doorchart;
