var React = require("react");
var __store = require('./__store.js');

console.log('NavigationItem.jsx')

var NavigationItem = React.createClass({
  onClick: function() {
    this.props.itemSelected(this.props.subreddit);
  },

  delete: function(evt) {
    console.log(evt.target.id)
    __store.actions.removeItem(evt.target.id)
  },

  render: function() {
    return (
      <li onClick={this.onClick} className={this.props.selected ? "selected" : ""}>
        {this.props.subreddit.name}
        <a onClick={this.delete} id={this.props.id} className="delete">&times;</a>
      </li>
    );
  }
});

module.exports = NavigationItem;