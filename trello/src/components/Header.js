import React, { Component } from 'react';
import Typed from 'typed.js';
import './css/Header.css';

class Header extends Component {
  
  componentDidMount() {
    const options = {
      strings: [
        "Rain falls, waves rise.",
        "Autumn comes, summer dies.",
        "Petals weak, flowers hide.",
        "Time passes, love thrives.",
        "<strong>Home</strong>^10000"
      ],
      loop: true,
      typeSpeed: 50,
      backSpeed: 50,
      startDelay: 700,
      backDelay: 1300
    };
    this.typed = new Typed(this.refs["type-content"], options);
  }

  componentWillUnmount() {
    this.typed.destroy();
  }

  render() {
    return (
      <div className="header">
        <div className="header-title">
          <span className="header-content" ref="type-content"/>
        </div>
      </div>
    );
  }
}

export default Header;