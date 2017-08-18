import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './libs/bootstrap/dist/css/bootstrap.min.css';
import './Readable.css';
import {timeStampToDateAndTime} from './lib'


class PostViewSmall extends Component {
    render() {
        
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
                <div className="row">
                    <div className="col-xs-6 text-left">
                        <span>Likes: {this.props.post.voteScore}</span>
                        <button className="btn btn-default"><span className="glyphicon glyphicon-arrow-up"></span></button>
                        <button href="#" className="btn btn-default"><span className="glyphicon glyphicon-arrow-down"></span></button>
                    </div>
                    <div className="col-xs-6 text-right">
                        <Link className="btn btn-default control-style" to={"/posts/"+this.props.post.id}>details</Link>
                        <span><a href="post_details.html">Comments:</a>25</span>
                        <span><a href="post_edit.html">Edit</a></span>
                        <span><a href="post_delete.html">Delete</a></span>
                    </div>
                </div>
            </div>
        );
    }
}

export default PostViewSmall;