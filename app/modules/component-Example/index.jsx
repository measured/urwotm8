

require('./_index.css')
require('./_index.scss')
var React = require('react')

var Example = React.createClass({
  render: function() {
    return (
      <div className="Example">
        <h2>A basic component</h2>
        <p>{this.props.text}</p>
      </div>
    )
  },
})

module.exports = Example
