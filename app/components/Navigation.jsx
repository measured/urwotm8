var React = require("react");
var Reflux = require("reflux")
var NavigationItem = require('./NavigationItem.jsx');
var NavigationInput = require('./NavigationInput.jsx');
var __store = require('./__store.js');


var Navigation = React.createClass({

  mixins: [
    Reflux.listenTo(__store,'_handleListUpdate')
  ],

  getInitialState: function() {
    return {
      subreddits: __store.store
    }
  },

  setSelectedItem: function(item) {
    this.props.itemSelected(item);
  },

   _handleListUpdate: function(list) {
    this.setState({
      subreddits: list
    })
  },

  render: function() {
    var subreddits = this.state.subreddits.map(function(subreddit, index) {
        return (
          <NavigationItem
            subreddit={subreddit}
            itemSelected={this.setSelectedItem}
            key={index}
            id={index}
            selected={subreddit.url === this.props.activeUrl} />
        );
      }, this);

    return (
      <div className="navigation">
        <ul>
            {subreddits}
        </ul>
        <NavigationInput/>
      </div>
    );
  }
});

module.exports = Navigation;