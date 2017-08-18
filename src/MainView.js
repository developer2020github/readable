import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import logo from './logo.svg';
import './libs/bootstrap/dist/css/bootstrap.min.css'
import './Readable.css';
import { serverApiTestMain } from './ServerApiTest';
import ApplicationHeader from './ApplicationHeader';
import PostViewSmall from './PostViewSmall';
import {getArrayOfExampleObjects} from './ServerApiTest'

class MainView extends Component {
	render() {
		let posts = getArrayOfExampleObjects(); 
		return (
			<div className="container">
				<ApplicationHeader />
				<div className="row">

					<div className="col-md-2 col-md-offset-2">
						<div className="btn-panel control-style">
							<span className="control-style">Category: </span>
							<select className="selectpicker">
								<option>All</option>
								<option>Category1</option>
								<option>Category2</option>
							</select>
						</div>
					</div>
					<div className="col-md-2">
						<div className="btn-panel">
							<span className="control-style">Sort by: </span>
							<select className="selectpicker">
								<option>Date</option>
								<option>Score</option>
								<option>Category</option>
							</select>
						</div>
					</div>
					<div className="col-md-4 text-right">
						<Link className="btn btn-default control-style" to="/NewPost">Add new post</Link>
					</div>
				</div>
				<div className="row">
					<div className="col-md-8 col-md-offset-2">
						<hr></hr>
					</div>
				</div>
				<div className="row">
					<div className="col-md-10 col-md-offset-1">
						{posts.map((p)=> {
							return <PostViewSmall mainView={true} post={p}/>;
						})}
			
					</div>
				</div>

			</div>
		);
	}
}

export default MainView;