import React, { Component } from 'react';
import '../libs/bootstrap/dist/css/bootstrap.min.css'
import './Readable.css';
import ApplicationHeader from './ApplicationHeader';
import PostViewSmall from './PostViewSmall';
import { connect } from 'react-redux';
import * as lib from '../utils/lib'
import * as SortSelectItems from './SortSelect'
import SortSelect from './SortSelect'
import UpdateItem from "./UpdateItem"
import { addPost } from "../actions/actions"

function addNumberOfComments(posts, comments){
	for (let i = 0; i< posts.length; i++){
		posts[i]["numberOfComments"] = comments.reduce(

			(numberOfCommments, comment)=>{ 

				if (comment.parentId===posts[i].id){
					return numberOfCommments+1; 
				}
				return numberOfCommments; 
				}, 
			0)
	}
	return posts; 
}


class MainView extends Component {
	constructor(){
		super(); 
		
		this.sortComparator = SortSelectItems.getSortComparator(SortSelectItems.SORT_BY_DATE_DESC); //get default
		this.sortOptions = [SortSelectItems.SORT_BY_DATE_DESC, 
							SortSelectItems.SORT_BY_DATE_ASC, 
							SortSelectItems.SORT_BY_SCORE_DESC, 
							SortSelectItems.SORT_BY_SCORE_ASC, 
							SortSelectItems.SORT_BY_COMMENTS_DESC, 
							SortSelectItems.SORT_BY_COMMENTS_ASC]
	  }

	state={
		 selectedCategory: "all", 
		 sortBy: SortSelectItems.SORT_BY_DATE_DESC, 
		 showNewPostForm: false
	}

	createNewPost =(values)=>{
		  this.props.dispatch(addPost(values.author, values.body, values.category, values.title)); 
          this.setHideShowNewPostForm(); 
	}

	setShowNewPostForm = ()=>{
        this.setState({showNewPostForm: true})
	}

	setHideShowNewPostForm=()=>{
		this.setState({showNewPostForm: false})
	}
	
	handleCategorySelect=(e)=>{ 
		this.setState({selectedCategory: e.target.value}); 
	}
	 
	setSortComparator = (sortComparator, activeSortOption)=>{
		this.sortComparator=sortComparator; 
		this.setState({sortBy: activeSortOption}); //need this to force rendering after sort comparator was updated
		                                           //this is a better option than keeping the entire list of posts in state - there is no need for this. 
	}
	

	render(){
		
		let comments = this.props.comments; 
		let posts = addNumberOfComments(this.props.posts, comments);
		let categories = ["all", ...this.props.categories]; 
		let filteredPosts = posts.filter(
			(p)=>{
					return (p.category===this.state.selectedCategory||this.state.selectedCategory==="all")
				 }
		)

		let sortedPosts = filteredPosts.sort(this.sortComparator);
		let newPostForm = null; 
		if (this.state.showNewPostForm) {
			newPostForm = <UpdateItem update={this.createNewPost} 
			 						  cancel={this.setHideShowNewPostForm} 
									  itemId={null} 
									  showTitle={true} 
									  showCategories={true}
									  bodyHeader="Post :" 
									  submitButtonName="Create post"
									  />
		}
		
		return (

			<div className="container">
				<ApplicationHeader />
				<div className="row">

					<div className="col-md-2 col-md-offset-2">
						<div className="btn-panel control-style">
							<span className="control-style">Category: </span>
							<select className="selectpicker" onChange={this.handleCategorySelect}>
								{categories.map((category)=>{
								  return <option key={category} value={category}>{category}</option>
								})}
							</select>
						</div>
					</div>
					<div className="col-md-4">
					       <SortSelect setSortComparator={this.setSortComparator} sortOptions={this.sortOptions}/>
					</div>
					<div className="col-md-2 text-right">
						<btn className="btn btn-default control-style btn-add" onClick={this.setShowNewPostForm}>Add new post</btn>
					</div>
				</div>
				<div className="row">
					<div className="col-md-8 col-md-offset-2">
						<hr></hr>
					</div>
				</div>
				<div className="row">
					<div className="col-md-10 col-md-offset-1">
					{newPostForm}
                    </div> 
				</div>
				<div className="row">
					<div className="col-md-10 col-md-offset-1">
					
						{sortedPosts.map((p)=> {
							return <PostViewSmall mainView={true} key={p.id} post={p}/>;
						})}
			
					</div>
				</div>

			</div>
		);
	}
}


const mapStateToProps = (state, props) => { 
	let listOfPosts = lib.listOfObjectsToArray(state.posts).filter(
		(post)=>{return !post.deleted}
	)

	let listOfComments = lib.listOfObjectsToArray(state.comments).filter(
		(comment)=>{return !comment.deleted}
	)

	return {
	categories: state.categories,
	posts: listOfPosts, 
	comments: listOfComments
  }};
//ref https://classroom.udacity.com/nanodegrees/nd019/parts/7b1b9b53-cd0c-49c9-ae6d-7d03d020d672/modules/c278315d-f6bd-4108-a4a6-139991a50314/lessons/c7a8f8a7-3922-473d-abc0-52870f9fac67/concepts/ee2b83a1-6f39-4392-be7f-acaaa0719f64export {MainView};

export default connect(mapStateToProps)(MainView);
//export {MainView}