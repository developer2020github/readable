import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom'
import { connect } from 'react-redux';

import { serverApiTestMain } from '../utils/ServerApiTest'; 
import MainView from './MainView'; 
import PostDetails from './PostDetails';
import UpdatePost from './UpdatePost';
import NewPost from './NewPost';
import DefaultPage from './DefaultPage';


class App extends Component {
  render() {
    //console.log(this.props);
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
//export default connect()(App)
