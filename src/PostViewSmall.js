import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './libs/bootstrap/dist/css/bootstrap.min.css';
import './Readable.css';
import {timeStampToDateAndTime} from './lib'

class PostViewSmall extends Component {
    render() {
        
        return (
            <div className="panel panel-default post-panel">
                <div className="row">
                    <div className="col-xs-4 text-left">Category: {this.props.post.category}</div>
                    <div className="col-xs-4 text-center">posted by: {this.props.post.author}</div>
                    <div className="col-xs-4 text-right">{timeStampToDateAndTime(this.props.post.timestamp)}</div>
                </div>

                <div>
                    <h4 className="text-center">{this.props.post.title}</h4>
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