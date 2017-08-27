import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../libs/bootstrap/dist/css/bootstrap.min.css'
import './Readable.css';
//import { serverApiTestMain } from '../utils/ServerApiTest';
import DefaultPage from './DefaultPage';
import NewComment from './NewComment.js';
import ApplicationHeader from './ApplicationHeader';
import PostViewSmall from './PostViewSmall';
import { exampleObject } from '../utils/ServerApiTest';
import { connect } from 'react-redux';
import UpdatePost from "./UpdatePost"; 
import * as lib from '../utils/lib'


class PostDetails extends Component {
	state = {
		showNewCommentForm: false, 
		showPostUpdateForm: false, 
		sortBy: "date_desc", 
		postWasDeleted: false
		
	}

    handlePostEditOn = ()=>{
		this.setState({showPostUpdateForm: true})
	}

	handlePostEditCancel = ()=>{
		this.setState({showPostUpdateForm: false})
	}

	handleSortSelect = (e)=>{
		
		this.setState({sortBy: e.target.value})
	}

	handleAddCommentClick = () => {
		this.setState({ showNewCommentForm: true});
	}

	handleCancelNewComment = () =>{
		this.setState({ showNewCommentForm: false}); 
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
					default: 
						return this.sortByDateDescComparator; 
				}
			}
	

	componentWillMount() {
		if (this.props.location.hasOwnProperty("query")) {
			if (this.props.location.query === "addComment") {
				this.setState({ showNewCommentForm: true });
			}
		}
	}

    
	render() {
		//ref https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf

		let post = this.props.post; 
		if (!post){
			return (<DefaultPage />); 
		}

		if (post.deleted){
			
						//this.setState({postWasJustDeleted: false})
						
						return (<div className="container">
							    	<ApplicationHeader />

									<div className="row">
										<div className="col-md-8 col-md-offset-2">
											<div className="post-deleted">
												Post {post.id} was deleted.<Link to="/">Back to main page</Link>
											</div>
										</div>
									</div>

								</div>
								)
		}


		let NewCommentForm = null;
		
		if (this.state.showNewCommentForm) {
			NewCommentForm = <NewComment handleCancelNewComment={this.handleCancelNewComment} parentPostId={post.id}> </NewComment>;
		}

		let PostUpdateForm = null; 
		let Post = <PostViewSmall post={post} detailedView={true} addCommentClickHandler={this.handleAddCommentClick} handlePostEditOn={this.handlePostEditOn}/>

		if (this.state.showPostUpdateForm){
			PostUpdateForm = <UpdatePost postId ={post.id} handlePostEditCancel ={this.handlePostEditCancel}></UpdatePost>
			Post=null; 
		}

		let comments = this.props.comments; 

		let sortComparator = this.getSortComparator(); 
		let sortedComments = comments.sort(sortComparator);




		return (
			<div className="container">
				<ApplicationHeader />

				<div className="row">
					
					<div className="col-md-4 col-md-offset-2">
			
					
						<div className="btn-panel">
							<span className="control-style">Sort comments by: </span>
							<select className="selectpicker" onChange={this.handleSortSelect}>

								<option value="date_desc">Latest first</option>
								<option value="date_asc">Oldest first</option>
								<option value="score_desc">Score high to low</option>
								<option value="score_asc">Score low to high</option>
				
							</select>
						</div>
					</div>
				
					<div className="col-md-4 text-right">
						<Link className="btn btn-default control-style" to="/">Main page</Link>
					</div>

				</div>

				<div className="row">
					<div className="col-md-8 col-md-offset-2">
						<hr></hr>
					</div>
				</div>

				<div className="row">
					<div className="col-md-8 col-md-offset-2">
						<hr></hr>
					</div>

				</div>
				<div className="row">
					<div className="col-md-10 col-md-offset-1">
						{Post}
						{PostUpdateForm}
						{NewCommentForm}
					</div>
				</div>
				<div className="row">
					<div className="col-md-10 col-md-offset-1">
					
						{sortedComments.map((c)=> {
							return <PostViewSmall commentView={true} key={c.id} post={c}/>;
						})}
			
				</div>
				</div>

			</div>
		)
	}
}

//export default PostDetails; 
const mapStateToProps = (state, props) => { 
    let commentsForPost = lib.listOfObjectsToArray(state.comments).filter(
		(comment)=>{
				return comment.parentId === props.match.params.postID && !comment.deleted
			}
	)

	return {
	categories: state.categories,
	post: state.posts[props.match.params.postID], 
	comments: commentsForPost
  }};
//ref https://classroom.udacity.com/nanodegrees/nd019/parts/7b1b9b53-cd0c-49c9-ae6d-7d03d020d672/modules/c278315d-f6bd-4108-a4a6-139991a50314/lessons/c7a8f8a7-3922-473d-abc0-52870f9fac67/concepts/ee2b83a1-6f39-4392-be7f-acaaa0719f64export {MainView};

export default connect(mapStateToProps)(PostDetails);