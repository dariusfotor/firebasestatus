import React, { Component } from 'react';
import Chart from "react-apexcharts";



class doorchart extends Component {
  constructor(props){
    super(props)
    this.state ={
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: this.props.time
        }
      },
      series: [{
        name: "series",
        data: []
      }]
     
    }
    
  }
  

  render() {
    console.log(this.state.options)
    return (
      <div>
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="line"
        width ="100%"
        height = "500"
        
      />    
        
      </div>
    );
  }
}

export default doorchart;
