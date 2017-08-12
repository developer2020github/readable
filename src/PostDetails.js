import React, { Component } from 'react';
import logo from './logo.svg';
import './libs/bootstrap/dist/css/bootstrap.min.css'
import './Readable.css';
import { serverApiTestMain } from './ServerApiTest'; 


class PostDetails extends Component {
  render() {
    return (
<div className ="container">
	<div className="row">
	   <div className="col-md-8 col-md-offset-2 text-center">
	
		            <div className = "panel panel-header">
		      		   <h3>Readable: content and comments</h3>
		      		</div>
		

	   </div>
	</div>

	<div className="row">
		  
		    <div className="col-md-2 text-left col-md-offset-3"><a href="index.html">Main page</a></div>
		    <div className="col-md-2 text-center"><a href="post_edit.html">Edit</a></div>
		    <div className="col-md-2 text-right"><a href="post_delete.html">Delete</a></div>
		  
	</div>

	<div className ="row">
		  <div className = "col-md-8 col-md-offset-2">  
		   <hr></hr>
		  </div>
	</div>
	<div className="row">
		  <div className="col-md-10 col-md-offset-1">  
		     <div className="panel panel-default">
		     <div className="row">
		        <div className="col-xs-4 text-left">Category: category1</div>
		        <div className="col-xs-4 text-center">posted by: Someone</div>
		        <div className="col-xs-4 text-right">11 August 2017 21:45:12</div>
		      </div>
               
		        <div>
		            <h4  className="text-center"> Heading of the post</h4>
		            <p>
		        	text of the post asdfkjk asdkl fjksa;j flasj f
		        	ksadjf kasd;lj fasl;kdj dflasfj ;lkjsdf k;lasjd fkl;
		        	aksdlf jasd;lj fkasdl;fj kla;sjdf ;lasfj ;adsjfl
		        	alksdf ;asfjk lasfj;alsjdf l;asdfj
		        	</p>

		        </div>
		         <div className="row">
		            <div className="col-xs-6 text-left">
				        <span>Likes: 23</span> 
				        <button className="btn btn-default"><span className="glyphicon glyphicon-arrow-up"></span></button>
				        <button href="#" className="btn btn-default"><span className="glyphicon glyphicon-arrow-down"></span></button>
			        </div>
			        <div className="col-xs-6 text-right">
				        <span>Comments: 25</span>
				        <span className="margin1"><button className="btn btn-default">Add comment</button></span>
			        </div>
		        </div>
		     </div>
		     <div className="panel panel-default">
		        First comment 
		     </div>
		      <div className = "panel panel-default">
		        Second comment 
		     </div>
		  </div>
	</div>

</div>
)
}
}

export default PostDetails; 