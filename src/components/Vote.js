import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../libs/bootstrap/dist/css/bootstrap.min.css';
import './Readable.css';

class Vote extends Component {
   

    handleUpvote = () => {
            this.props.dispatch(this.props.upvoteAction(this.props.id))
    }

    handleDownvote = () => {
        this.props.dispatch(this.props.downvoteAction(this.props.id))
    }

    render() {
        return(
        <span>
            <span className="vote-score">Likes: {this.props.voteScore}</span>
            <button className="btn btn-xs vote-button" onClick={this.handleUpvote}><span className="glyphicon glyphicon-arrow-up readables-arrow-button"></span></button>
            <button className="btn btn-xs vote-button" onClick={this.handleDownvote}><span className="glyphicon glyphicon-arrow-down readables-arrow-button"></span></button>
        </span>)
    }
}

//export default PostViewSmall;
export default connect()(PostViewSmall);