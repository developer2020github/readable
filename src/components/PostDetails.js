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
import UpdateComment from "./UpdateComment"; 
import * as lib from '../utils/lib'
import * as SortSelectItems from './SortSelect'
import SortSelect from './SortSelect'

class PostDetails extends Component {
	constructor(){
		super(); 
		
		this.sortComparator = SortSelectItems.getSortComparator(SortSelectItems.SORT_BY_DATE_DESC); //get default
		this.sortOptions = [SortSelectItems.SORT_BY_DATE_DESC, 
							SortSelectItems.SORT_BY_DATE_ASC, 
							SortSelectItems.SORT_BY_SCORE_DESC, 
							SortSelectItems.SORT_BY_SCORE_ASC]
	  }

	state = {
		showNewCommentForm: false, 
		showPostUpdateForm: false, 
		showCommentUpdateForm: false, 
		sortBy: "date_desc", 
		postWasDeleted: false, 
		sortBy: SortSelectItems.SORT_BY_DATE_DESC
		
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
	
	setSortComparator = (sortComparator, activeSortOption)=>{
		this.sortComparator=sortComparator; 
		this.setState({sortBy: activeSortOption}); //need this to force rendering after sort comparator was updated
		                                           //this is a better option than keeping the entire list of posts in state - there is no need for this. 
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

        let sortedComments = comments.sort(this.sortComparator);



		return (
			<div className="container">
				<ApplicationHeader />

				<div className="row">
					
					<div className="col-md-4 col-md-offset-2">
			
					     <SortSelect setSortComparator={this.setSortComparator} sortOptions={this.sortOptions}/>
						
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