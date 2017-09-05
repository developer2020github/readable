import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../libs/bootstrap/dist/css/bootstrap.min.css'
import './Readable.css';
import DefaultPage from './DefaultPage';
import ApplicationHeader from './ApplicationHeader';
import PostViewSmall from './PostViewSmall';
import { connect } from 'react-redux';
import ListOfComments from "./ListOfComments"
import { fetchPost, fetchCommentsForPost, asyncFetchAllCategories } from "../actions/asyncActions"


class PostDetails extends Component {

	state = {
		postWasDeleted: false
	}
	
    getShowNewCommentFormOnLoad=()=>{
		if (this.props.location.hasOwnProperty("query")) {
			if (this.props.location.query === "addComment") {
				return true
			}
		}
		return false; 
	}

    componentDidMount(){
		this.props.dispatch(fetchPost(this.props.match.params.postID)); 
		this.props.dispatch(asyncFetchAllCategories());
	}

	render() {
		//ref https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf

		let post = this.props.post; 
		if (!post){
			return (<DefaultPage />); 
		}

		if (post.deleted){

						return (<div className="container">
							    	<ApplicationHeader includeLink={true}/>

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

		let requestNewCommentForm = this.getShowNewCommentFormOnLoad(); 
		return (
			<div className="container">
				<ApplicationHeader includeLink={true}/>
				<div className="row">
					<div className="col-md-10 col-md-offset-1">
						<PostViewSmall post={post} detailedView={true}/>
					</div>
				</div>
		        <ListOfComments showNewCommentForm={requestNewCommentForm} parentPostID={post.id}/>
			</div>
		)
	}
}

//export default PostDetails; 
const mapStateToProps = (state, props) => { 
	
	let currentPost = null; 

	if (state.posts && state.posts.hasOwnProperty(props.match.params.postID)){
		currentPost = state.posts[props.match.params.postID]; 
	}
	return {
	categories: state.categories,
	post: currentPost
  }};
//ref https://classroom.udacity.com/nanodegrees/nd019/parts/7b1b9b53-cd0c-49c9-ae6d-7d03d020d672/modules/c278315d-f6bd-4108-a4a6-139991a50314/lessons/c7a8f8a7-3922-473d-abc0-52870f9fac67/concepts/ee2b83a1-6f39-4392-be7f-acaaa0719f64export {MainView};

export default connect(mapStateToProps)(PostDetails);