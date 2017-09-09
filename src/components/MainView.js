//========================================================
//Readable: React content and comments application
//2017
//Author:  developer2020 
//e-mail:  dev276236@gmail.com
//========================================================

//========================================================================================
//Main view component; shows list of posts. List can be sorted and filtered.
//Also shows new post form if user requests to add a new post. 
//========================================================================================
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
import { asyncFetchAllPosts, asyncFetchAllCategories, asyncAddPost } from "../actions/asyncActions"

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

	componentDidMount(){
			this.props.dispatch(asyncFetchAllPosts())
			this.props.dispatch(asyncFetchAllCategories())
	}

	createNewPost =(values)=>{

		  this.props.dispatch(asyncAddPost(values.author, values.body, values.category, values.title))
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
		let dataAvailable = this.props.posts&&this.props.categories; 
		
		if (!dataAvailable){
			return (	
				<div className="container">
				<ApplicationHeader />
					<div className="row">
					<div className="col-md-8 col-md-offset-2 text-center">
						<h1>Awaiting for server to respond....</h1>
					</div>
					</div>
				</div>
				)
		}

	
        let posts = this.props.posts; 
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
									  showTitleEntryField={true} 
									  showCategories={true}
									  showAuthorEntryField={true}
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
	
	let listOfPosts = null; 
	if (state.posts){ 
		listOfPosts = lib.listOfObjectsToArray(state.posts).filter(
			(post)=>{return !post.deleted}
		)
   }

	return {
	categories: state.categories,
	posts: listOfPosts, 
	comments: state.comments
  }};

export default connect(mapStateToProps)(MainView);
