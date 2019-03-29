import React, { Component } from 'react';
import Header from './components/header';
import Switch from './components/switch';
import Doorchart from './components/doorchart';


class App extends Component {
  
  
  render() {
    
    return (
      <div>
      <Header />
      <Switch />
      <Doorchart />
       
        
               
      </div>
    );
  }
}

export default App;
