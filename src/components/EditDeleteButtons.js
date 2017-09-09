//========================================================
//Readable: React content and comments application
//2017
//Author:  developer2020 
//e-mail:  dev276236@gmail.com
//========================================================

//========================================================================================
//Generic component, handling edit and delete GUI buttons.
//There is a confirmation of delete; actual actions to perform are passed with 
//props from parenf component. 
//========================================================================================
import React, { Component } from 'react';
import '../libs/bootstrap/dist/css/bootstrap.min.css';
import './Readable.css';
import { connect } from 'react-redux';

class EditDeleteButtons extends Component {
    constructor() {
        super();
        this.editButton = <span><button className="post-footer-button" onClick={this.handleEditClick}>Edit</button></span>;
        this.deleteButton = <span><button onClick={this.handleDeleteRequestClick} className="post-footer-button">Delete</button></span>;
        this.confirmDelete = <span className="confirm-delete">
                                <span><button onClick={this.handleConfimedDeleteClick} id="confirm-delete-btn">Confirm delete</button></span>
                                <span><button onClick={this.handleDeleteRequestCanceledClick} id="cancel-delete-btn">Cancel delete</button></span>
                            </span>

    }

    state = {
        deleteConfirmRequested: false
    }

    handleDeleteRequestClick = () => {
        this.setState({ deleteConfirmRequested: true });
    }

    handleDeleteRequestCanceledClick = () => {
        this.setState({ deleteConfirmRequested: false });
    }

    handleEditClick = () => {
        this.setState({ deleteConfirmRequested: false });
        this.props.handleEditRequest();
    }

    handleConfimedDeleteClick = () => {
        this.props.confimedDeleteAction(); 
    }

    render() {

        if (this.state.deleteConfirmRequested){
            return this.confirmDelete; 
        }else{
            return <span>
                        {this.editButton}
                        {this.deleteButton}
                    </span>
        }

    }

}

export default connect()(EditDeleteButtons);