import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { serverApiTestMain } from './ServerApiTest'; 
import MainView from './MainView'; 
import PostDetails from './PostDetails';
import UpdatePost from './UpdatePost';


class App extends Component {
  render() {
    //serverApiTestMain(); 
    return (
      <UpdatePost/>
    );
  }
}

export default App;
