import React, { Component } from 'react';
import logo from './logo.svg';
import '../libs/bootstrap/dist/css/bootstrap.min.css'
import './Readable.css';

class UpdatePost extends Component {
  render() {
    return (

    <div className="container">
        <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center">
                <div className="panel panel-header">
                    <h3>Readable: content and comments</h3>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-2 text-left col-md-offset-3"><a href="index.html">Main page</a></div>
            <div className="col-md-2 text-center"></div>
            <div className="col-md-2 text-right"><a href="post_delete.html">Delete</a></div>
        </div>
        <div className="row">
            <div className="col-md-8 col-md-offset-2">
                <hr></hr>
            </div>
        </div>
        <div className="row">
            <div className="col-md-10 col-md-offset-1">
                <div className="row">
			        <div className="col-xs-4 text-left">Category: category1</div>
			        <div className="col-xs-4 text-center">posted by: Someone</div>
			        <div className="col-xs-4 text-right">11 August 2017 21:45:12</div>
		      </div>
            </div>
            <div className="col-md-10 col-md-offset-1">
                <form>
                    <div className="form-group">
                        <label for="PostTitle">Title:</label>
                        <input type="text" className="form-control" id="PostTitle" placeholder="Title of the post"></input>
                    
                    </div>
                    <div className="form-group">
                        <label for="postText">Post:</label>
                        <textarea className="form-control" id="postText" rows="10">current text of the post </textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                </form>
            </div>
        </div>
    </div>
)}}

export default UpdatePost; 