import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../libs/bootstrap/dist/css/bootstrap.min.css';
import './Readable.css';
import { timeStampToDateAndTime } from '../utils/lib'
import { connect } from 'react-redux';
import { deletePost,  deleteAllCommentsForPost, upvotePost,  downvotePost, editPost, deleteParentOfComments} from "../actions/actions"

import Vote from "./Vote"
import EditDeleteButtons from "./EditDeleteButtons"
import UpdateItem from "./UpdateItem"
import { asyncEditPost, asyncDeletePost} from "../actions/asyncActions"

//This component displays post in all views. 
//Post header and body are common for all views. 
//Post footer can display different links and information depending 
//on a particular view. 
//In default view post footer should show 
//- voding score with voting buttons 
//- link to post detailed view 
//- number of comments 
//- button to add comments (links to detailed view and opens comment form)

//In detailed post view post footer should show: 
//- voting score with voting buttons
//- button to edit post 
//- button to delete post 
//- number of comments 
//- button to add comments (opens comment form) 

class PostViewSmall extends Component {
    state = {
		showPostUpdateForm: false		
	}

    handlePostEditOn = ()=>{
		this.setState({showPostUpdateForm: true})
    }
    
    updatePost=(values)=>{

       // this.props.dispatch(editPost(this.props.post.id, values.author, values.body, values.category, values.title)); 
        this.props.dispatch(asyncEditPost(this.props.post.id, values.title, values.body))
        this.handlePostEditCancel(); 
    }

	handlePostEditCancel = ()=>{
		this.setState({showPostUpdateForm: false})
	}


    postConfimedDeleteClick = ()=>{
        this.props.dispatch(asyncDeletePost(this.props.post.id)); 
        /*this.props.dispatch(deletePost(this.props.post.id));
        this.props.dispatch(deleteAllCommentsForPost(this.props.post.id));
        this.props.dispatch(deleteParentOfComments(this.props.post.id));*/
    }


    render() {

       
        let comments = <span className="number-of-comments">Comments: {this.props.post.numberOfComments}</span>
      
        let postHeader = <div className="row post-header">

            <div className="col-xs-6 text-left post-sub-header">
                <span className="text-center post-title">{this.props.post.title}</span>
                <span className="post-author"> By: {this.props.post.author}</span>
            </div>
            <div className="col-xs-6 text-right  post-sub-header">
            <span className="post-category">Category: {this.props.post.category}</span>
                <span>[{timeStampToDateAndTime(this.props.post.timestamp)}]</span>
            </div>
        </div>

        //1. post in the main view 
        if (this.props.mainView) {
            let linkToPostDetailedView = <Link className="post-footer-link" to={"/posts/" + this.props.post.id}>details</Link>;
            let linkToAddComment = <Link className="post-footer-link" to={{
                pathname: "/posts/" + this.props.post.id,
                query: "addComment"
            }}>New comment</Link>;

            return (<div className="panel panel-default post-panel">

                {postHeader}
                <div>
                    <pre id="post-body">{this.props.post.body}</pre>
                </div>
                <div className="row post-footer">
                    <div className="col-xs-6 text-left post-sub-header">
                        <Vote   upvoteAction={upvotePost} downvoteAction={downvotePost} voteScore={this.props.post.voteScore} id={this.props.post.id}/>
                        {linkToPostDetailedView}
                       
                    </div>
                    <div className="col-xs-6 text-right post-sub-header">
                        {comments}
                        {linkToAddComment}
                    </div>

                </div>
            </div>
            );
        }

        //2. post in detailed view 
        if (this.props.detailedView) {
            if (this.state.showPostUpdateForm){
                 //return <UpdatePost postId ={this.props.post.id} handlePostEditCancel ={this.handlePostEditCancel}></UpdatePost>

                 return <UpdateItem update={this.updatePost} 
                                    cancel={this.handlePostEditCancel} 
                                    itemId={this.props.post.id} 
                                    showTitleEntryField={true} showCategoriesSelect={false} showAuthorEntryField={false}
                                    showInfoHeader={false}
                                    bodyHeader="Post :" 
									submitButtonName="Update post"
                        />
            }

            return (
               <div className="panel panel-default post-panel">
                {postHeader}
                <div>
                    <pre id="post-body">{this.props.post.body}</pre>
                </div>
                <div className="row post-footer">
                    <div className="col-xs-6 text-left post-sub-header">
                        <Vote   upvoteAction={upvotePost} downvoteAction={downvotePost} voteScore={this.props.post.voteScore} id={this.props.post.id}/>
                        <EditDeleteButtons handleEditRequest={this.handlePostEditOn} confimedDeleteAction={this.postConfimedDeleteClick}/>
                    </div>
                    <div className="col-xs-6 text-right post-sub-header">
                        {comments}
                    </div>

                </div>
                
            </div>
            );
        }
    }
}

//export default PostViewSmall;
export default connect()(PostViewSmall);