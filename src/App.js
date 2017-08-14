import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import { serverApiTestMain } from './ServerApiTest'; 
import MainView from './MainView'; 
import PostDetails from './PostDetails';
import UpdatePost from './UpdatePost';
import NewPost from './NewPost';
import DefaultPage from './DefaultPage';


class App extends Component {
  render() {
    //serverApiTestMain(); 
    return (
        <Switch>

            <Route path="/NewPost"><NewPost/></Route>
            <Route exact path="/"><MainView/></Route>
            <Route path ="/posts/:postID"component={PostDetails}/>

            <Route component={DefaultPage}/>

        </Switch>
    );
  }
}

export default App;
