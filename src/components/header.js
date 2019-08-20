import React, { Component } from 'react';

import './header.css';
import './switch';

class Header extends Component {
  render() {
    return (
      <div className="header">
        <h1>Namu valdymo sistema</h1>
        <h3 className="time">{this.props.time}</h3>

        
      </div>
      
      
    );
  }
}

export default Header;