import React, { Component } from 'react';
import logo from './logo.svg';
import './libs/bootstrap/dist/css/bootstrap.min.css'
import './Readable.css';
import { serverApiTestMain } from './ServerApiTest'; 


class MainView extends Component {
  render() {
    //serverApiTestMain(); 
    return (
     <div className ="container">
	 <div className ="row">
	   <div className = "col-md-8 col-md-offset-2 text-center">
	
		            <div className = "panel panel-header">
		      		   <h3>Readable: content and comments</h3>
		      		</div>
		

	   </div>
	   </div>
	   </div>
    );
  }
}

export default MainView;