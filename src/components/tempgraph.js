import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import './tempgraph.css';
import './switch';



class Temp_graph extends Component {
  constructor(props){
    super(props);
    this.state={
        chartGraph: props.chartTemp
        
    }
  }
  
  render() {
    return (
      <div className="temp_graph">
        <h1>Temperaturos grafikas</h1>
        <Line
            data={this.state.chartGraph}
            options={{
              title:{
                display: true,
                text: "Reali temperaturos diagrama",
                fontSize: 22,
              },
              legend:{
                display: true,
                position: 'right'
              }
            }}
        />
        
      </div>
      
      
    );
  }
}

export default Temp_graph;