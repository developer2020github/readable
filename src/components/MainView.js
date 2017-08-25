import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import logo from './logo.svg';
import '../libs/bootstrap/dist/css/bootstrap.min.css'
import './Readable.css';
import { serverApiTestMain } from '../utils/ServerApiTest';
import ApplicationHeader from './ApplicationHeader';
import PostViewSmall from './PostViewSmall';
import {getArrayOfExampleObjects} from '../utils/ServerApiTest'
import { connect } from 'react-redux';

function listOfObjectsToArray(listOfObjects){
	//this function converts a list of objects into an array 
	  return Object.keys(listOfObjects).map((key)=>{
		return listOfObjects[key]; 
	  })
	}

function addNumberOfComments(posts, comments){
	for (let i = 0; i< posts.length; i++){
		posts[i]["numberOfComments"] = comments.reduce(

			(numberOfCommments, comment)=>{ 
				
 
			//	console.log(comment.parentId)
				if (comment.parentId===posts[i].id){
					return numberOfCommments+1; 
				}
				return numberOfCommments; 
				}, 
			0)
	}
	return posts; 
}


class MainView extends Component {
	render() {
	
		//let posts = listOfObjectsToArray(this.props.posts); 

		
		let comments = this.props.comments; 
		let posts = addNumberOfComments(this.props.posts, comments);

		return (
			<div className="container">
				<ApplicationHeader />
				<div className="row">

					<div className="col-md-2 col-md-offset-2">
						<div className="btn-panel control-style">
							<span className="control-style">Category: </span>
							<select className="selectpicker">
								<option>All</option>
								<option>Category1</option>
								<option>Category2</option>
							</select>
						</div>
					</div>
					<div className="col-md-2">
						<div className="btn-panel">
							<span className="control-style">Sort by: </span>
							<select className="selectpicker">
								<option>Date</option>
								<option>Score</option>
								<option>Category</option>
							</select>
						</div>
					</div>
					<div className="col-md-4 text-right">
						<Link className="btn btn-default control-style" to="/NewPost">Add new post</Link>
					</div>
				</div>
				<div className="row">
					<div className="col-md-8 col-md-offset-2">
						<hr></hr>
					</div>
				</div>
				<div className="row">
					<div className="col-md-10 col-md-offset-1">
						{posts.map((p)=> {
							return <PostViewSmall mainView={true} key={p.id} post={p}/>;
						})}
			
					</div>
				</div>

			</div>
		);
	}
}


const mapStateToProps = (state, props) => { 
	
	return {
	categories: state.categories,
	posts: listOfObjectsToArray(state.posts), 
	comments: listOfObjectsToArray(state.comments)
  }};
//ref https://classroom.udacity.com/nanodegrees/nd019/parts/7b1b9b53-cd0c-49c9-ae6d-7d03d020d672/modules/c278315d-f6bd-4108-a4a6-139991a50314/lessons/c7a8f8a7-3922-473d-abc0-52870f9fac67/concepts/ee2b83a1-6f39-4392-be7f-acaaa0719f64export {MainView};

export default connect(mapStateToProps)(MainView);
//export {MainView}