
// Basic styling
require("./Style.scss")

var __store = require('./components/__store.js');
var Reflux = require("reflux")
Reflux.nextTick(process.nextTick)

var React = require("react");

var Navigation = require('./components/Navigation.jsx');
var StoryList = require('./components/StoryList.jsx');

var App = React.createClass({

  getInitialState: function() {
    return ({
      activeNavigationUrl: "",
      storyItems: [],
      title: "Please select a sub"
    });
  },

  componentDidMount: function() {
    this.setSelectedItem(__store.store[0])
  },

  render: function() {
    return (
      <div className="AppContainer">
        <div className="StoryList">
          <h1>{this.state.title}</h1>
          <StoryList items={this.state.storyItems} />
        </div>
       <Navigation
          activeUrl={this.state.activeNavigationUrl}
          subreddits={this.state.subreddits}
          itemSelected={this.setSelectedItem} />
      </div>
    );
  },

  setSelectedItem: function(item) {
    var _this = this;
    var cbname = "fn" + Date.now();
    var script = document.createElement("script");
    script.src = "http://www.reddit.com/" + item.url +
      ".json?sort=top&t=month&jsonp=" + cbname;

    window[cbname] = function(jsonData) {
      _this.setState({storyItems: jsonData.data.children});
      delete window[cbname];
    };

    document.head.appendChild(script);

    this.setState({
      activeNavigationUrl: item.url,
      storyItems: [],
      title: item.name
    });
  }
});


React.render(<App />, document.body);

