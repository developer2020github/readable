import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../libs/bootstrap/dist/css/bootstrap.min.css';
import './Readable.css';
import { timeStampToDateAndTime } from '../utils/lib'
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
// since differences are rather small, there is no point to create separate component for post 
// footer. Instead, different elements will be just conditionally rendered depending on what 
// parent component is asking for. 

class PostViewSmall extends Component {
    render() {
        let linkToPostDetailedView = null; 
        let addComment = null; 
        let editPostButton = null; 
        let deletePostButton = null; 

        if (this.props.mainView){
            linkToPostDetailedView = <Link className="post-footer-link" to={"/posts/"+this.props.post.id}>details</Link>; 
            addComment = <Link className="post-footer-link" to={{pathname:"/posts/"+this.props.post.id, 
                                                                 query: "addComment"
                                                                }}>New comment</Link>;
        }

        if (this.props.detailedView){
            addComment = <span><button className="post-footer-button" onClick={this.props.addCommentClickHandler}>Add comment</button></span>
            editPostButton = <span><button className="post-footer-button">Edit</button></span>
            deletePostButton = <span><button className="post-footer-button">Delete</button></span>
        }


        return (
            <div className="panel panel-default post-panel">
                <div className="row post-header">
                    
                    <div className="col-xs-6 text-left post-sub-header">
                            <span className="text-center post-title">{this.props.post.title}</span>
                            <span className="post-author"> By: {this.props.post.author}</span>
                        </div>
                    <div className="col-xs-6 text-right  post-sub-header">
                         <span className="post-category">Category: {this.props.post.category}</span>
                         <span>[{timeStampToDateAndTime(this.props.post.timestamp)}]</span>
                        </div>
                </div>

                <div>
                    <p>{this.props.post.body}</p>
                </div>
                <div className="row post-footer">
                    <div className="col-xs-6 text-left post-sub-header">
                        <span className="vote-score">Likes: {this.props.post.voteScore}</span>
                        <button className="btn btn-xs vote-button"><span className="glyphicon glyphicon-arrow-up readables-arrow-button"></span></button>
                        <button className="btn btn-xs vote-button"><span className="glyphicon glyphicon-arrow-down readables-arrow-button"></span></button>
                        {linkToPostDetailedView}
                        {editPostButton}
                        {deletePostButton}
                    </div>
                    <div className="col-xs-6 text-right post-sub-header">
                        <span className="number-of-comments">Comments: 25</span>
                        {addComment}
                    </div>
                </div>
            </div>
        );
    }
}

export default PostViewSmall;