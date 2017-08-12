import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { serverApiTestMain } from './ServerApiTest'; 

class MainView extends Component {
  render() {
    //serverApiTestMain(); 
    return (
      <div>
       <h1>hello from main view!</h1>
      </div>
    );
  }
}

export default MainView;