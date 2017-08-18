import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import './libs/bootstrap/dist/css/bootstrap.min.css';
import './Readable.css';
import  ApplicationHeader  from './ApplicationHeader';

class NewComment extends Component {
  render() {
    return (   
                <div className="new-comment">
                <form>
                   
                    <div className="form-group">
                        <label for="AuthorName">Your name:</label>
                        <input type="text" className="form-control" id="AuthorName" placeholder="User name"></input>
                    </div>
               
                    <div className="form-group">
                        <label for="commentText">Post:</label>
                        <textarea className="form-control" id="commentText" rows="5"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Add comment</button>
                    <button type="submit" className="btn btn-primary">Cancel</button>
                </form>
                </div>
            
    )}}

export default NewComment; 