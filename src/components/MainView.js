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
import * as lib from '../utils/lib'

function addNumberOfComments(posts, comments){
	for (let i = 0; i< posts.length; i++){
		posts[i]["numberOfComments"] = comments.reduce(

			(numberOfCommments, comment)=>{ 

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

	state={
		 selectedCategory: "all", 
		 sortBy: "date_desc"
	}

	
	handleCategorySelect=(e)=>{ 
		this.setState({selectedCategory: e.target.value}); 
	}
	 
	handleSortSelect = (e)=>{
		
		this.setState({sortBy: e.target.value})
	}

	sortByDateAscComparator=(p1, p2)=>{
		if (p1.timestamp>p2.timestamp){
			return 1; 
		}else if (p1.timestamp<p2.timestamp){
			return -1; 
		}
		return 0; 
	}
	
	sortByDateDescComparator=(p1, p2)=>{
		return -this.sortByDateAscComparator(p1, p2); 
	}

	sortByScoreAscComparator=(p1, p2)=>{
		if(p1.voteScore>p2.voteScore){
			return 1; 
		}else if (p1.voteScore<p2.voteScore){
			return -1; 
		}
		return 0; 
	}

	sortByScoreDescComparator=(p1, p2)=>{
		return -this.sortByScoreAscComparator(p1, p2); 
	}

	sortByNumberOfCommentsAscComparator=(p1, p2)=>{

		if(p1.numberOfComments>p2.numberOfComments){
			return 1; 
		}else if (p1.numberOfComments<p2.numberOfComments){
			return -1; 
		}
		return 0; 
	}

	sortByNumberOfCommentsDescComparator=(p1,p2)=>{
		return -this.sortByNumberOfCommentsAscComparator(p1, p2); 
	}

    
	getSortComparator=()=>{

		switch (this.state.sortBy){
			case "date_desc": 
				return this.sortByDateDescComparator; 
			case "date_asc":
				return this.sortByDateAscComparator; 
			case "score_desc": 
				return this.sortByScoreDescComparator; 
			case "score_asc":
				return this.sortByScoreAscComparator; 
			case "comments_desc": 
				return this.sortByNumberOfCommentsDescComparator; 
			case "comments_asc":
				return this.sortByNumberOfCommentsAscComparator; 
			default: 
				return this.sortByDateDescComparator; 
		}
	}

	render(){
		
		let comments = this.props.comments; 
		let posts = addNumberOfComments(this.props.posts, comments);
		let categories = ["all", ...this.props.categories]; 
		let filteredPosts = posts.filter(
			(p)=>{
					return (p.category===this.state.selectedCategory||this.state.selectedCategory==="all")
				 }
		)

		let sortComparator = this.getSortComparator(); 
		let sortedPosts = filteredPosts.sort(sortComparator);

		return (
			<div className="container">
				<ApplicationHeader />
				<div className="row">

					<div className="col-md-2 col-md-offset-2">
						<div className="btn-panel control-style">
							<span className="control-style">Category: </span>
							<select className="selectpicker" onChange={this.handleCategorySelect}>
								{categories.map((category)=>{
								  return <option key={category} value={category}>{category}</option>
								})}
							</select>
						</div>
					</div>
					<div className="col-md-2">
						<div className="btn-panel">
							<span className="control-style">Sort by: </span>
							<select className="selectpicker" onChange={this.handleSortSelect}>

								<option value="date_desc">Latest first</option>
								<option value="date_asc">Oldest first</option>
								<option value="score_desc">Score high to low</option>
								<option value="score_asc">Score low to high</option>
								<option value="comments_desc">Number of comments high to low</option>
								<option value="comments_asc">Number of comments low to high</option>
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
					
						{sortedPosts.map((p)=> {
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
	posts: lib.listOfObjectsToArray(state.posts), 
	comments: lib.listOfObjectsToArray(state.comments)
  }};
//ref https://classroom.udacity.com/nanodegrees/nd019/parts/7b1b9b53-cd0c-49c9-ae6d-7d03d020d672/modules/c278315d-f6bd-4108-a4a6-139991a50314/lessons/c7a8f8a7-3922-473d-abc0-52870f9fac67/concepts/ee2b83a1-6f39-4392-be7f-acaaa0719f64export {MainView};

export default connect(mapStateToProps)(MainView);
//export {MainView}