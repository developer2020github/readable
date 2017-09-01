import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom'
 import MainView from './MainView'; 
import PostDetails from './PostDetails';
import DefaultPage from './DefaultPage';


class App extends Component {
  render() {
    //console.log(this.props);
    //serverApiTestMain(); 
    return (
        <Switch>

            <Route exact path="/"><MainView/></Route>
            <Route path ="/posts/:postID"component={PostDetails}/>

            <Route component={DefaultPage}/>

        </Switch>
    );
  }
}

export default App;
//export default connect()(App)
