import React, { Component } from 'react';
import logo from './logo.svg';
import { Link } from 'react-router-dom'
import './libs/bootstrap/dist/css/bootstrap.min.css'
import './Readable.css';
import { serverApiTestMain } from './ServerApiTest';
import DefaultPage from './DefaultPage';
import NewComment from './NewComment.js';
import ApplicationHeader from './ApplicationHeader';
import PostViewSmall from './PostViewSmall';
import { exampleObject } from './ServerApiTest';

function doesPostExist(postId) {

	if (postId == "6ni6ok3ym7mf1p33lnez") {
		return true;
	}
	return false;
}


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
		console.log(this.props);
		let post = null;
		if (doesPostExist(this.props.match.params.postID)) {
			post = exampleObject;
		}
		else {
			return (<DefaultPage />)
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

export default PostDetails; 