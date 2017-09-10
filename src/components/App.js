//========================================================
//Readable: React content and comments application
//2017
//Author:  developer2020 
//e-mail:  dev276236@gmail.com
//========================================================

//========================================================================================
//Root React component
//========================================================================================

import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom'
import MainView from './MainView'; 
import PostDetails from './PostDetails';
import DefaultPage from './DefaultPage';


class App extends Component {
  render() {

    return (
        <Switch>

            <Route exact path="/"><MainView/></Route>
            <Route path="/:category" component={MainView}/>
            <Route path ="/posts/:postID"component={PostDetails}/>
            <Route component={DefaultPage}/>

        </Switch>
    );
  }
}

export default App;
