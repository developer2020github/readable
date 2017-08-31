import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../libs/bootstrap/dist/css/bootstrap.min.css';
import './Readable.css';
import { connect } from 'react-redux';

class Delete extends Component {
 
    handleConfimedDeleteClick = () => {
            this.props.dispatch(this.props.confimedDeleteAction(this.props.id))
    }

    handleDownvote = () => {
        this.props.dispatch(this.props.downvoteAction(this.props.id))
    }

    render() {

        if (!this.props.deleteConfirmRequested){
            return null; 
        }

        return(
            <div className="confirm-delete">
            <span><button onClick={this.handleConfimedDeleteClick} className="btn btn-default control-style">Confirm delete</button></span>
            <span><button onClick={this.props.deleteRequestCanceled} className="btn btn-default control-style">Cancel</button></span>
            </div>
            )
    }
}

//export default PostViewSmall;
export default connect()(Delete);