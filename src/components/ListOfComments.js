import React, { Component } from 'react';
import '../libs/bootstrap/dist/css/bootstrap.min.css'
import './Readable.css';
//import { serverApiTestMain } from '../utils/ServerApiTest';
import { connect } from 'react-redux';
import * as lib from '../utils/lib'
import * as SortSelectItems from './SortSelect'
import SortSelect from './SortSelect'
import CommentView from "./CommentView"
import UpdateItem from "./UpdateItem"
import { addComment } from "../actions/actions"

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

    createNewComment =(values)=>{
        this.props.dispatch(addComment(this.props.parentPostID, values.body, values.author)); 
        this.handleCancelNewComment(); 
    }

	render() {
		//ref https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf


		let NewCommentForm = null;
		if (this.state.showNewCommentForm) {
            //NewCommentForm = <NewComment handleCancelNewComment={this.handleCancelNewComment} parentPostId={this.props.parentPostID}> </NewComment>;
            NewCommentForm = <UpdateItem update={this.createNewComment} 
                                         cancel={this.handleCancelNewComment} 
                                         itemId={null} 
                                         showTitle={false} 
                                         showCategories={false}
                                         bodyHeader="Your comment :" 
                                         submitButtonName="Create comment"
           />
		}

        let sortedComments = this.props.comments.sort(this.sortComparator);

		return (
				<div>
				    <div className="row header-row">
						<div className="col-md-4 col-md-offset-1">
							<SortSelect setSortComparator={this.setSortComparator} sortOptions={this.sortOptions} name="Sort comments by: "/>
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

//export default PostDetails; 
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
//ref https://classroom.udacity.com/nanodegrees/nd019/parts/7b1b9b53-cd0c-49c9-ae6d-7d03d020d672/modules/c278315d-f6bd-4108-a4a6-139991a50314/lessons/c7a8f8a7-3922-473d-abc0-52870f9fac67/concepts/ee2b83a1-6f39-4392-be7f-acaaa0719f64export {MainView};

export default connect(mapStateToProps)(ListOfComments);