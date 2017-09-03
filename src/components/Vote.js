import React, { Component } from 'react';
import '../libs/bootstrap/dist/css/bootstrap.min.css';
import './Readable.css';
import { connect } from 'react-redux';

class Vote extends Component {
   

    handleUpvote = () => {
            this.props.dispatch(this.props.upvoteAction(this.props.id, this.props.parentId))
    }

    handleDownvote = () => {
        this.props.dispatch(this.props.downvoteAction(this.props.id, this.props.parentId))
    }

    render() {
        return(
        <span>
            <span className="vote-score">Score: {this.props.voteScore}</span>
            <button className="btn btn-xs vote-button" onClick={this.handleUpvote}><span className="glyphicon glyphicon-arrow-up readables-arrow-button"></span></button>
            <button className="btn btn-xs vote-button" onClick={this.handleDownvote}><span className="glyphicon glyphicon-arrow-down readables-arrow-button"></span></button>
        </span>)
    }
}

//export default PostViewSmall;
export default connect()(Vote);