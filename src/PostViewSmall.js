import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './libs/bootstrap/dist/css/bootstrap.min.css';
import './Readable.css';

class PostViewSmall extends Component {
    render() {
        return (
            <div className="panel panel-default post-panel">
                <div className="row">
                    <div className="col-xs-4 text-left">Category: category1</div>
                    <div className="col-xs-4 text-center">posted by: Someone</div>
                    <div className="col-xs-4 text-right">11 August 2017 21:45:12</div>
                </div>

                <div>
                    <h4 className="text-center"> Heading of the post</h4>
                    <p>
                        text of the post asdfkjk asdkl fjksa;j flasj f
                        ksadjf kasd;lj fasl;kdj dflasfj ;lkjsdf k;lasjd fkl;
                        aksdlf jasd;lj fkasdl;fj kla;sjdf ;lasfj ;adsjfl
                        alksdf ;asfjk lasfj;alsjdf l;asdfj
                    </p>

                </div>
                <div className="row">
                    <div className="col-xs-6 text-left">
                        <span>Likes: 23</span>
                        <button className="btn btn-default"><span className="glyphicon glyphicon-arrow-up"></span></button>
                        <button href="#" className="btn btn-default"><span className="glyphicon glyphicon-arrow-down"></span></button>
                    </div>
                    <div className="col-xs-6 text-right">
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