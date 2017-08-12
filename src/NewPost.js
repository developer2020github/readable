import React, { Component } from 'react';
import './libs/bootstrap/dist/css/bootstrap.min.css'
import './Readable.css';

class NewPost extends Component {
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
                <form>
                    <div className="form-group">
                        <label for="selectCategory">Select category:</label>
                        <select className="form-control" id="selectCategory">
                            <option>Category1</option>
                            <option>Category2</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label for="AuthorName">Your name:</label>
                        <input type="text" className="form-control" id="AuthorName" placeholder="User name"></input>
                    </div>
                    <div className="form-group">
                        <label for="PostTitle">Title:</label>
                        <input type="text" className="form-control" id="PostTitle" placeholder="Title of the post"></input>
                    </div>
                    <div className="form-group">
                        <label for="postText">Post:</label>
                        <textarea className="form-control" id="postText" rows="10"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Create post</button>
                </form>
            </div>
        </div>
    </div>
    )}}

export default NewPost; 