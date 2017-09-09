//========================================================
//Readable: React content and comments application
//2017
//Author:  developer2020 
//e-mail:  dev276236@gmail.com
//========================================================

//========================================================================================
//This component displays comment in all views. 
//There is no header.
//Footer shows
// - voting score
// - button to edit comment 
// - button to delete comment 
// - author 
// - date and time 
// If comment edit view is active, component returns item update view, passing comment data 
// to be displayed as paremers.
//========================================================================================

import React, { Component } from 'react';
import '../libs/bootstrap/dist/css/bootstrap.min.css';
import './Readable.css';
import { timeStampToDateAndTime } from '../utils/lib'
import { connect } from 'react-redux';
import { deleteComment, upvoteComment, downvoteComment } from "../actions/actions"
import Vote from "./Vote"
import EditDeleteButtons from "./EditDeleteButtons"
import { editComment } from "../actions/actions"
import  UpdateItem  from "./UpdateItem"
import { asyncEditComment, asyncDeleteComment, asyncUpVoteComment,  asyncDownVoteComment} from "../actions/asyncActions"

class CommentView extends Component {

    state = {
        showEditComment: false
    }

    commentConfimedDeleteClick = ()=>{
        this.props.dispatch(asyncDeleteComment(this.props.comment.id, this.props.comment.parentId));
    }
  
    handleCommentEditCancel = () => {
        this.setState({ showEditComment: false })
    }

    handleCommentEditClick = () => {
        this.setState({ showEditComment: true })
    }

    updateComment = (values) =>{

        this.props.dispatch(asyncEditComment(this.props.comment.id, values.body))
        this.handleCommentEditCancel(); 
    }

    render() {

        if (this.state.showEditComment) {
            return <UpdateItem update={this.updateComment} 
            cancel={this.handleCommentEditCancel} 
            itemId={this.props.comment.id} 
            parentId={this.props.comment.parentId}
            showTitleEntryField={false} 
            showAuthorEntryField={false}
            showCategories={false}
            bodyHeader="Your comment :" 
            submitButtonName="Update comment"/>
        }
        
        return (
                <div className="panel panel-default post-panel">
                    <div>
                        <pre id="post-body">{this.props.comment.body}</pre>
                    </div>
                    <div className="row post-footer">
                        <div className="col-xs-6 text-left post-sub-header">
                            <Vote   upvoteAction={asyncUpVoteComment} downvoteAction={asyncDownVoteComment} voteScore={this.props.comment.voteScore} id={this.props.comment.id} parentId={this.props.comment.parentId}/>
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