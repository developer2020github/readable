import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { serverApiTestMain } from './ServerApiTest'; 
import MainView from './MainView'; 

class App extends Component {
  render() {
    //serverApiTestMain(); 
    return (
      <MainView/>
    );
  }
}

export default App;
