import React from 'react';
import ReactDOM from 'react-dom';
import base64 from 'base-64';

const username = 'hamzeh.sheikhhasan@liferay.com';
const password = 'test';

class Announcements extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			categories:[], 
			articles: [],
			vocabularyId: '',
			structureId: '',
			apiType: '',
			preferredLocation: '',
			preferredRegion: '',
			selectedArticleId: '',
			selectedLocation: 'all'
		};
	  }

	componentDidMount() {
		//REST API: portlet preferences
		fetch('/o/salesdemo-rest/preferences')
			.then(res => res.json())
		 	.then((data) => {
				this.setState({ 
					vocabularyId: data[0].vocabularyId,
				 	structureId: data[1].structureId,
					apiType: data[2].apiType,
					preferredLocation: data[3].preferredLocation,
					preferredRegion: data[4].preferredRegion,
				})

				//REST API or Pre 7.2 Headles APIs
				fetch(
					this.state.apiType === 'pre' 
						? '/api/jsonws/assetcategory/get-vocabulary-categories/vocabulary-id/'+ this.state.vocabularyId +'/start/0/end/100/-obc'
						: '/o/salesdemo-rest/categories/locations'
					)
					.then(res => res.json())
					.then((data) => {
						this.setState({
							categories: data
						})

						// for DXP 7.2 Headless, we need to provide authorization
						let headers = new Headers({ 'Accept': 'application/json'});
						headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));

						this.state.apiType === 'post' && this.state.preferredLocation === 'all'
							? (
								fetch('/o/headless-delivery/v1.0/content-structures/' + this.state.structureId + '/structured-contents', 
									{method: 'GET', headers: headers,})
									.then(res => res.json())
									.then((data) => {
										this.setState({ articles: data.items })
									})
									.catch(console.log)
							) 
							:  (
								fetch('/o/salesdemo-rest/articles/'+  this.state.structureId + '/' + this.state.preferredLocation)
									.then(res => res.json())
									.then((data) => {
										this.setState({ articles: data, apiType: 'rest' })
									})
									.catch(console.log)
							) 
					})
					.catch(console.log)
			})
			.catch(console.log)
	}
	  
	handleShowClick(articleId) {
		this.setState({ selectedArticleId: articleId })
	}
	
	handleHideClick() {
		this.setState({ selectedArticleId: '' })
	}

	handleLocationClick(locationName) {
		this.setState({ selectedLocation: locationName })

		fetch('/o/salesdemo-rest/articles/' + this.state.structureId + '/' + locationName)
			.then(res => res.json())
			.then((data) => {
				this.setState({ articles: data, preferredLocation: 'all', preferredRegion: '' })
			})
		.catch(console.log)
	}

	render() {
		return (
			<div class="p-react-main-div" >
				<div class="p-react-main-div-row1" onClick={ ()=>this.handleLocationClick('all') }>
					<a class="nav-link" href="#1">Show All Announcements</a>
				</div>

				<div class="p-react-main-div-row2">
					<div class="p-react-main-div-col1">
						<nav class="menubar menubar-transparent menubar-vertical-expand-lg">
							<div class="collapse menubar-collapse" id="menubarVerticalLgCollapse01">
								<ul class="nav nav-nested">						
									{this.state.categories.map((category, index) => (	  
										<li key={"category"+index} class="nav-item">
											<div hidden={category.parentCategoryId !== '0'}>
												<a aria-controls={"menubarVerticalLgNestedCollapse"+index} aria-expanded="false" class="collapsed collapse-icon nav-link" data-toggle="collapse" href={"#menubarVerticalLgNestedCollapse"+index} role="button">
													{category.name}
													<span class="collapse-icon-closed">
														<svg class="lexicon-icon lexicon-icon-caret-right" focusable="false" role="presentation">
															<use href="https://clayui.com/images/icons/icons.svg#caret-right" />
														</svg>
													</span>
													<span class="collapse-icon-open">
														<svg class="lexicon-icon lexicon-icon-caret-bottom" focusable="false" role="presentation">
															<use href="https://clayui.com/images/icons/icons.svg#caret-bottom" />
														</svg>
													</span>
												</a>

												<div class="collapse" id={"menubarVerticalLgNestedCollapse"+index}>
													<ul class="nav nav-stacked">
														{this.state.categories.map((subCategory, index2) =>
															<li key={"subCategory"+index2} class="nav-item" hidden={category.categoryId !== subCategory.parentCategoryId}>
																<div style={{paddingLeft: '20px'}} onClick={ ()=>this.handleLocationClick(subCategory.name) }><a class="nav-link" href="#1">{subCategory.name}</a></div>
															</li>
														)}
													</ul>
												</div>
											</div>  
										</li>
									))}	
								</ul>
							</div>
						</nav>
					</div>	

					<div class="p-react-main-div-col2">					
						{this.state.articles.map((article, index) => (	  
							<ul class="list-group">
								<li class="list-group-item list-group-item-flex">
									<div class="autofit-col">
										<div class="sticker sticker-secondary">
											<span class="inline-item">
												<svg class="lexicon-icon lexicon-icon-folder" focusable="false" role="presentation">
													<use href="https://clayui.com/images/icons/icons.svg#web-content" />
												</svg>
											</span>
										</div>
									</div>
									<div class="autofit-col autofit-col-expand">
										<p class="list-group-title text-truncate">
											<span onClick={ ()=>this.handleShowClick(article.id) }><a href="#1">{article.title}</a></span>
										</p>
										
										{this.state.apiType === 'post' ? 
										(
											<div>
												<p class="list-group-subtitle text-truncate">
													{!('taxonomyCategories' in article) ? "All Locations" :  
														article.taxonomyCategories.map((location, index) => (
															location.taxonomyCategoryName + ' '
														))
													}
												</p>

												<div id={article.id} style={{paddingTop: '30px'}} hidden={article.id !== this.state.selectedArticleId}>
													{article.contentFields.map((item, index) => (
														(item.name === 'content' ? <span dangerouslySetInnerHTML={{__html: item.value.data}} /> : '')
													))}
												</div>
											</div>
										) 
										: (
											<div>
												<p class="list-group-subtitle text-truncate">
													{article.location === '' ? 'All Locations' : article.location}
												</p>

												<div id={article.id} style={{paddingTop: '30px'}} hidden={article.id !== this.state.selectedArticleId}>
													<span dangerouslySetInnerHTML={{__html: article.content}} /> 
												</div>
											</div>
										)
										}
									</div>
									
									<div class="autofit-col">
										<div class="dropdown dropdown-action">
											<a aria-expanded="false" aria-haspopup="true" class="component-action dropdown-toggle" data-toggle="dropdown" href="#1" id="dropdownAction1" role="button">
												<svg class="lexicon-icon lexicon-icon-ellipsis-v" focusable="false" role="presentation">
													<use href="https://clayui.com/images/icons/icons.svg#ellipsis-v" />
												</svg>
											</a>
											<div aria-labelledby="" class="dropdown-menu dropdown-menu-right">
												<ul class="list-unstyled">
													<li><div class="dropdown-item" onClick={ ()=>this.handleShowClick(article.id) } role="button">Show</div></li>
													<li><div class="dropdown-item" onClick={ ()=>this.handleHideClick(article.id) } role="button">Hide</div></li>
												</ul>
											</div>
										</div>
									</div>
								</li>
							</ul>						
						))}	
					</div>			
				</div>
			</div>
		);
	}
}

export default function(elementId) {
	ReactDOM.render(<Announcements />, document.getElementById(elementId));
}