import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../libs/bootstrap/dist/css/bootstrap.min.css';
import './Readable.css';
import { timeStampToDateAndTime } from '../utils/lib'
import { connect } from 'react-redux';
import { deletePost, deleteComment, deleteAllCommentsForPost, upvotePost, upvoteComment, downvotePost, downvoteComment } from "../actions/actions"
import UpdateComment from "./UpdateComment"
import Vote from "./Vote"

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

//In any view post or comment are "assembled" from small sub-components; since they are not 
//relevant to any other module/component and are really small they are all kept in this module. 


class PostViewSmall extends Component {
    constructor() {
        super();


        this.subComponents = {
            deleteButton: <span><button onClick={this.handleDeleteRequestClick} className="post-footer-button">Delete</button></span>
        }

    }

    state = {
        deleteConfirmRequested: false,
        showEditComment: false
    }

    handlePostConfirmDeleteClick = () => {
        if (this.props.commentView) {
            this.props.dispatch(deleteComment(this.props.post.id));
        } else {
            this.props.dispatch(deletePost(this.props.post.id));
            this.props.dispatch(deleteAllCommentsForPost(this.props.post.id));
        }
    }

    handleDeleteRequestClick = () => {
        this.setState({ deleteConfirmRequested: true })
    }

    handleDeleteRequesCancelClick = () => {
        this.setState({ deleteConfirmRequested: false })
    }

    componentWillUnmount() {
        this.setState({ deleteConfirmRequested: false })
    }

    handleCommentEditCancel = () => {
        this.setState({ showEditComment: false })
    }

    handleCommentEditClick = () => {
        this.setState({ showEditComment: true })
    }

    render() {
       

        //common between post and comment 
        
        let deleteButton = <span><button onClick={this.handleDeleteRequestClick} className="post-footer-button">Delete</button></span>;

        let confirmDelete = <div className="confirm-delete">
            <span><button onClick={this.handlePostConfirmDeleteClick} className="btn btn-default control-style">Confirm delete</button></span>
            <span><button onClick={this.handleDeleteRequesCancelClick} className="btn btn-default control-style">Cancel</button></span>
        </div>

        if (this.state.showEditComment) {
            return <UpdateComment handleCancelCommentEdit={this.handleCommentEditCancel} commentId={this.props.post.id}> </UpdateComment>;
        }


        //there are three possible scenarios to consider: 
        //1. this is a comment; 
        if (this.props.commentView) {
            let commentAuthor = <span className="post-author"> Commented by: {this.props.post.author}</span>
            let commentTimeAndDate = <span className="comment-date-time">[{timeStampToDateAndTime(this.props.post.timestamp)}]</span>
            let editCommentButton = <span onClick={this.handleCommentEditClick}><button className="post-footer-button">Edit</button></span>
            if (this.state.deleteConfirmRequested) {
                editCommentButton = null;
                deleteButton = null;
    
            } else {
                confirmDelete = null;
            }
         
            return (
                <div className="panel panel-default post-panel">

                    <div>
                        <pre id="post-body">{this.props.post.body}</pre>
                    </div>
                    <div className="row post-footer">
                        <div className="col-xs-6 text-left post-sub-header">
                            <Vote   upvoteAction={upvoteComment} downvoteAction={downvoteComment} voteScore={this.props.post.voteScore} id={this.props.post.id}/>
                            {editCommentButton}
                            {deleteButton}
                        </div>
                        <div className="col-xs-6 text-right post-sub-header">
                            {commentAuthor}
                            {commentTimeAndDate}
                        </div>

                    </div>
                    {confirmDelete}
                </div>
            );

        }


        //post only 
       
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

        //2. post in the main view 
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

        //3. post in detailed view 
        if (this.props.detailedView) {
            let addComment = <span><button className="post-footer-button" onClick={this.props.addCommentClickHandler}>Add comment</button></span>
            let editPostButton = <span><button className="post-footer-button" onClick={this.props.handlePostEditOn}>Edit</button></span>

            if (this.state.deleteConfirmRequested) {
                editPostButton = null;
                addComment = null;
                deleteButton = null;
    
            } else {
                confirmDelete = null;
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
                        {editPostButton}
                        {deleteButton}
                    </div>
                    <div className="col-xs-6 text-right post-sub-header">
                        {comments}
                        {addComment}
                    </div>

                </div>
                {confirmDelete}
            </div>
            );
        }
    }
}

//export default PostViewSmall;
export default connect()(PostViewSmall);