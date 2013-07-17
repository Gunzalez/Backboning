
var IssueModel = Backbone.Model.extend({
	el: '#container',
	initialize: function () {
		this.url = this.url + this.id
	},	
	url: 'https://api.github.com/repos/gruntjs/grunt/issues/'
});


var IssuesCollection = Backbone.Collection.extend({
	url: 'https://api.github.com/repos/gruntjs/grunt/issues'
});

var IssuesListView = Backbone.View.extend({
	el: '#container',
	initialize: function () {
		this.template = _.template($('#issues-list').html().trim());
	},	
	render: function(){
		var that = this;
		var issues = new IssuesCollection();
		issues.fetch({
			success: function(issues){			
				that.$el.html(that.template({issues: issues.models}));	
			}	
		})
	}
});
var issuesListView = new IssuesListView();

/*var IssuesListItemView = Backbone.View.extend({
	
});*/

var IssueDetailsView = Backbone.View.extend({
	el: '#container',
	initialize: function () {
		this.template = _.template($('#issues-item-detail').html().trim());
	},	
	render: function(options){
		var that = this;
		var issue = new IssueModel({'id':options.id});
		issue.fetch({
			success: function(data){
				that.$el.html(that.template({
					title: data.attributes.title,
					id: data.attributes.id,
					date: data.attributes.created_at,
					state: data.attributes.state,
					detail: data.attributes.body,
					number: data.attributes.number
				}));
			}	
		});
	}	
});
var issueDetailsView = new IssueDetailsView();

var AppRouter = Backbone.Router.extend({
	routes:{
		"":"index",
		"issues":"issues",
		"details/:id":"details",
		"delete/:id":"delete"
	},
	delete: function(id){
		console.log('Deleting issue '+id);
		issuesListView.render();
	},
	details: function(id){
		issueDetailsView.render({id:id})
	},
	issues: function(){
		issuesListView.render();
	},
	index: function(){
		var template = _.template($('#start-screen').html().trim());
		$('#container').html(template);
	}
});


$(function () {
	new AppRouter();
	Backbone.history.start();
});
