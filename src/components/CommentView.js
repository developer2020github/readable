import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../libs/bootstrap/dist/css/bootstrap.min.css';
import './Readable.css';
import { timeStampToDateAndTime } from '../utils/lib'
import { connect } from 'react-redux';
import { deletePost, deleteComment, deleteAllCommentsForPost, upvotePost, upvoteComment, downvotePost, downvoteComment } from "../actions/actions"
import UpdateComment from "./UpdateComment"
import Vote from "./Vote"
import EditDeleteButtons from "./EditDeleteButtons"

//This component displays comment in all views. 
//There is no header.

//Footer shows
// - voting score
// - button to edit comment 
// - button to delete comment 
//- author 
//- date and time 

//If comment edit view is active, component returns comment edit view. 

class CommentView extends Component {

    state = {
        showEditComment: false
    }

    commentConfimedDeleteClick = ()=>{
        this.props.dispatch(deleteComment(this.props.comment.id));
        //TODO: ensure number of comments of parent post gets updated in post detailed view
    }
  
    handleCommentEditCancel = () => {
        this.setState({ showEditComment: false })
    }

    handleCommentEditClick = () => {
        this.setState({ showEditComment: true })
    }

    render() {


       
        if (this.state.showEditComment) {
            return <UpdateComment handleCancelCommentEdit={this.handleCommentEditCancel} commentId={this.props.comment.id}> </UpdateComment>;
        }
         
        return (
                <div className="panel panel-default post-panel">
                    <div>
                        <pre id="post-body">{this.props.comment.body}</pre>
                    </div>
                    <div className="row post-footer">
                        <div className="col-xs-6 text-left post-sub-header">
                            <Vote   upvoteAction={upvoteComment} downvoteAction={downvoteComment} voteScore={this.props.comment.voteScore} id={this.props.comment.id}/>
                            <EditDeleteButtons handleEditRequest={this.handleCommentEditClick} confimedDeleteAction={this.commentConfimedDeleteClick}/>
                        </div>
                        <div className="col-xs-6 text-right post-sub-header">
                            <span className="post-author"> Commented by: {this.props.comment.author}</span>
                            <span className="comment-date-time">[{timeStampToDateAndTime(this.props.comment.timestamp)}]</span>
                        </div>
                    </div>
                </div>
            );

            }
}

        
export default connect()(CommentView);