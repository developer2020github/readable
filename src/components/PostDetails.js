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


class PostDetails extends Component {
	state = {
		showNewCommentForm: false
	}

	handleAddCommentClick = () => {
		this.setState({ showNewCommentForm: !this.state.showNewCommentForm });
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

		let NewCommentForm = null;
		if (this.state.showNewCommentForm) {
			NewCommentForm = <NewComment />;
		}

		return (
			<div className="container">
				<ApplicationHeader />

				<div className="row">

					<div className="col-md-2 text-left col-md-offset-3"><Link className="btn btn-default control-style" to="/">Main page</Link></div>
					<div className="col-md-2 text-center"><a href="post_edit.html">Edit</a></div>
					<div className="col-md-2 text-right"><a href="post_delete.html">Delete</a></div>

				</div>

				<div className="row">
					<div className="col-md-8 col-md-offset-2">
						<hr></hr>
					</div>

				</div>
				<div className="row">
					<div className="col-md-10 col-md-offset-1">
				         
						<PostViewSmall post={post} detailedView={true} addCommentClickHandler={this.handleAddCommentClick}/>
						{NewCommentForm}
						<div className="panel panel-default">
							First comment
		     </div>
						<div className="panel panel-default">
							Second comment
		     </div>
					</div>
				</div>

			</div>
		)
	}
}

//export default PostDetails; 
const mapStateToProps = (state, props) => { 

	return {
	categories: state.categories,
	post: state.posts[props.match.params.postID], 
	comments: state.comments
  }};
//ref https://classroom.udacity.com/nanodegrees/nd019/parts/7b1b9b53-cd0c-49c9-ae6d-7d03d020d672/modules/c278315d-f6bd-4108-a4a6-139991a50314/lessons/c7a8f8a7-3922-473d-abc0-52870f9fac67/concepts/ee2b83a1-6f39-4392-be7f-acaaa0719f64export {MainView};

export default connect(mapStateToProps)(PostDetails);