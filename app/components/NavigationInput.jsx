var React = require("react");
var __store = require('./__store.js');

var NavigationInput = React.createClass({
  getInitialState: function() {
    return {
      value: ""
    };
  },

  _handleChange: function(evt) {
    this.setState({
      value: evt.currentTarget.value
    })
  },

  _handleSubmit: function() {
    var _item = {
      name: this.state.value,
      url: "r/" + this.state.value
    }

    if(this.state.value === "") {
      _item = {
        name: "front",
        url: ""
      }
    }

    __store.actions.addItem(_item)
  },

  _handleKeyDown: function (evt) {
    switch (evt.keyCode) {
      case 13: // Enter
        this._handleSubmit(evt);
        this.setState({value: ''});
      break;
    }
  },

  render: function() {
    return (
      <div className="NavigationInput">
        <input type="text" placeholder="type a reddit m8" value={this.state.value} onChange={this._handleChange} onKeyDown={this._handleKeyDown} />
      </div>
      );
  }
});

module.exports = NavigationInput;