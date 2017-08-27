import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../libs/bootstrap/dist/css/bootstrap.min.css';
import './Readable.css';
import { timeStampToDateAndTime } from '../utils/lib'
import { connect } from 'react-redux';
import { deletePost, deleteComment, deleteAllCommentsForPost, upvotePost, upvoteComment, downvotePost, downvoteComment} from "../actions/actions"
import UpdateComment from "./UpdateComment"

//This component displays post and comments in all views. 
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
// since differences are rather small, there is no point to create separate component for post 
// footer. Instead, different elements will be just conditionally rendered depending on what 
// parent component is asking for. 

//In comment view comment there should be no header

//In comment view comment footer shouls show
// - voting score
// - button to edit comment 
// - button to delete comment 
//- author 
//- date and time 


class PostViewSmall extends Component {
    state={
        deletePostConfirmRequested : false, 
        showEditComment : false
    }

    handlePostConfirmDeleteClick=()=>{
        if (this.props.commentView) {
            this.props.dispatch(deleteComment(this.props.post.id));
        } else {
            this.props.dispatch(deletePost(this.props.post.id)); 
            this.props.dispatch(deleteAllCommentsForPost(this.props.post.id)); 
        }
    }

    handlePostDeleteRequestClick=()=>{
        this.setState({deletePostConfirmRequested: true})
    }

    handlePostDeleteRequesCancelClick=()=>{
        this.setState({deletePostConfirmRequested: false})
    }

    componentWillUnmount(){
        this.setState({deletePostConfirmRequested: false})
    } 

    handleCommentEditCancel=()=>{ 
        this.setState({showEditComment: false})
    }

    handleCommentEditClick=()=>{
        this.setState({showEditComment: true})
    }

    handleUpvote=()=>{
        if (this.props.commentView){
             this.props.dispatch(upvoteComment(this.props.post.id))
        }else{
            this.props.dispatch(upvotePost(this.props.post.id))
        }
    }

    handleDownvote=()=>{
        if (this.props.commentView){
            this.props.dispatch(downvoteComment(this.props.post.id))
       }else{
           this.props.dispatch(downvotePost(this.props.post.id))
       }
    }

    render() {
        let linkToPostDetailedView = null; 
        let addComment = null; 
        let editPostButton = null; 
        let deletePostButton = <span><button onClick={this.handlePostDeleteRequestClick} className="post-footer-button">Delete</button></span>; 
        let title = this.props.post.title; 
        let category = <span className="post-category">Category: {this.props.post.category}</span>
        let comments =  <span className="number-of-comments">Comments: {this.props.post.numberOfComments}</span>
        let author = <span className="post-author"> By: {this.props.post.author}</span>

        let header  =                 <div className="row post-header">
        
        <div className="col-xs-6 text-left post-sub-header">
                <span className="text-center post-title">{title}</span>
                {author}
            </div>
        <div className="col-xs-6 text-right  post-sub-header">
             {category}
             <span>[{timeStampToDateAndTime(this.props.post.timestamp)}]</span>
            </div>
    </div>
     
      

        if (this.props.mainView){
            linkToPostDetailedView = <Link className="post-footer-link" to={"/posts/"+this.props.post.id}>details</Link>; 
            addComment = <Link className="post-footer-link" to={{pathname:"/posts/"+this.props.post.id, 
                                                                 query: "addComment"
                                                                }}>New comment</Link>;
            deletePostButton = null; 
        }

        if (this.props.detailedView){
            addComment = <span><button className="post-footer-button" onClick={this.props.addCommentClickHandler}>Add comment</button></span>
            editPostButton = <span><button className="post-footer-button" onClick={this.props.handlePostEditOn}>Edit</button></span>
            
        }
      
        let commentAuthor = null; 
        let commentTimeAndDate = null; 

        if (this.props.commentView){
            title = null; 
            category = null; 
            comments = null; 
            header = null; 
            commentAuthor = <span className="post-author"> Commented by: {this.props.post.author}</span>
            commentTimeAndDate = <span className="comment-date-time">[{timeStampToDateAndTime(this.props.post.timestamp)}]</span>
            editPostButton = <span onClick={this.handleCommentEditClick}><button className="post-footer-button">Edit</button></span>
        }

        let confirmDelete = <div className="confirm-delete">
                                 <span><button onClick={this.handlePostConfirmDeleteClick} className="btn btn-default control-style">Confirm delete</button></span>
                                 <span><button onClick={this.handlePostDeleteRequesCancelClick} className="btn btn-default control-style">Cancel</button></span>
                            </div>
        if (this.state.deletePostConfirmRequested){
            editPostButton = null; 
            addComment = null; 
            deletePostButton = null;

        }else{
            confirmDelete = null; 
        }

        if (this.state.showEditComment){
			return <UpdateComment handleCancelCommentEdit={this.handleCommentEditCancel} commentId={this.props.post.id}> </UpdateComment>;
        }

        return (

                <div className="panel panel-default post-panel">

                {header}
                <div>
                    <pre id="post-body">{this.props.post.body}</pre>
                </div>
                <div className="row post-footer">
                    <div className="col-xs-6 text-left post-sub-header">
                        <span className="vote-score">Likes: {this.props.post.voteScore}</span>
                        <button className="btn btn-xs vote-button" onClick={this.handleUpvote}><span className="glyphicon glyphicon-arrow-up readables-arrow-button"></span></button>
                        <button className="btn btn-xs vote-button" onClick={this.handleDownvote}><span className="glyphicon glyphicon-arrow-down readables-arrow-button"></span></button>
                        {linkToPostDetailedView}
                        {editPostButton}
                        {deletePostButton}
                    </div>
                    <div className="col-xs-6 text-right post-sub-header">
                        {comments}
                        {addComment}
                        {commentAuthor}
                        {commentTimeAndDate}
                    </div>
                        
                </div>
                {confirmDelete}
            </div>
        );
    }
}

//export default PostViewSmall;
export default connect()(PostViewSmall);