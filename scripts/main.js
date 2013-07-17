
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
				console.log(data.attributes)
				that.$el.html(that.template({
					title: data.attributes.title,
					id: data.attributes.id,
					date: data.attributes.created_at,
					state: data.attributes.state,
					detail: data.attributes.body
				}));
			}	
		});
		

		//var issue = new IssueModel({'number':options.number});
		
		/*issue.fetch({
			success: function(issue){

				this.$el.html(this.template({issue: issue.models}));	
				
				//that.$el.html(that.template({issues: issues.models}));	
			}	
		})*/
		
		
		//var issue = new IssueModel({'id': options.id});
		//console.log(issuesListView)
		//this.$el.html(options.id);
		//this.$el.html(this.template({issue: id}));
	}	
});
var issueDetailsView = new IssueDetailsView();

var AppRouter = Backbone.Router.extend({
	routes:{
		"":"index",
		"issues":"issues",
		"details/:id":"details"
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
