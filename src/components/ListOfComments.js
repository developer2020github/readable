//========================================================
//Readable: React content and comments application
//2017
//Author:  developer2020 
//e-mail:  dev276236@gmail.com
//========================================================

//========================================================================================
//This component displays list of comments with sorting control and, if 
//requested, returns a form to addnew comment.
//Comments are sorted in user-selected sort order. 
//========================================================================================

import React, { Component } from 'react';
import '../libs/bootstrap/dist/css/bootstrap.min.css'
import './Readable.css';
import { connect } from 'react-redux';
import * as lib from '../utils/lib'
import * as SortSelectItems from './SortSelect'
import SortSelect from './SortSelect'
import CommentView from "./CommentView"
import UpdateItem from "./UpdateItem"
import { fetchCommentsForPost, asyncAddComment }  from "../actions/asyncActions"

class ListOfComments extends Component {
	constructor(){
		super(); 
		
		this.sortComparator = SortSelectItems.getSortComparator(SortSelectItems.SORT_BY_DATE_DESC); //get default
		this.sortOptions = [SortSelectItems.SORT_BY_DATE_DESC, 
							SortSelectItems.SORT_BY_DATE_ASC, 
							SortSelectItems.SORT_BY_SCORE_DESC, 
							SortSelectItems.SORT_BY_SCORE_ASC]
	  }

	state = {
		showNewCommentForm: false, 
		sortBy: SortSelectItems.SORT_BY_DATE_DESC
	}

	handleSortSelect = (e)=>{
		this.setState({sortBy: e.target.value})
	}

	handleAddCommentClick = () => {
		this.setState({ showNewCommentForm: true});
	}

	handleCancelNewComment = () =>{
		this.setState({ showNewCommentForm: false}); 
	}
	
	setSortComparator = (sortComparator, activeSortOption)=>{
		this.sortComparator=sortComparator; 
		this.setState({sortBy: activeSortOption}); //need this to force rendering after sort comparator was updated
		                                           //this is a better option than keeping the entire list of posts in state - there is no need for this. 
	}

	componentWillMount() {

			if (this.props.showNewCommentForm) {
				this.setState({ showNewCommentForm: true });
			}
	
	}

	componentDidMount(){
		this.props.dispatch(fetchCommentsForPost(this.props.parentPostID)); 
	}

    createNewComment =(values)=>{
        this.props.dispatch(asyncAddComment(this.props.parentPostID, values.body, values.author)); 
        this.handleCancelNewComment(); 
    }

	render() {
		//ref https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf

		let NewCommentForm = null;
		if (this.state.showNewCommentForm) {
            NewCommentForm = <UpdateItem update={this.createNewComment} 
                                         cancel={this.handleCancelNewComment} 
                                         itemId={null} 
                                         showTitleEntryField={false} 
                                         showCategories={false}
										 showAuthorEntryField={true}
                                         bodyHeader="Your comment :" 
                                         submitButtonName="Create comment"
           />
		}

		let sortedComments = this.props.comments.sort(this.sortComparator);
		let sortSelect = null;
		if (this.props.comments && this.props.comments.length>0){
			sortSelect=<SortSelect setSortComparator={this.setSortComparator} sortOptions={this.sortOptions} name="Sort comments by: "/>
		}
			
		return (
				<div>
				    <div className="row header-row">
						<div className="col-md-4 col-md-offset-1">
								{sortSelect}
						</div>
						<div className="col-md-6 text-right">
							<btn className="btn btn-default control-style btn-add" onClick={this.handleAddCommentClick}>Add new comment</btn>
						</div>
				    </div>
					<div className="row">
						<div className="col-md-10 col-md-offset-1">
							{NewCommentForm}
							{sortedComments.map((c)=> {
								return <CommentView key={c.id} comment={c}/>;
							})}
				
					</div>
					</div>
				</div>
		)
	}
}


const mapStateToProps = (state, props) => { 

	let commentsForPost = []; 

	if (state.comments.hasOwnProperty(props.parentPostID))
    commentsForPost = lib.listOfObjectsToArray(state.comments[props.parentPostID]).filter(
		(comment)=>{
				return !comment.deleted
			}
	)
		
	return {
	comments: commentsForPost
  }};


export default connect(mapStateToProps)(ListOfComments);