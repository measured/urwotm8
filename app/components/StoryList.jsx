var React = require("react");

var StoryList = React.createClass({
  render: function() {

    var rank = function(rank) {
      for (var i = 0; i < rank.length; i+1) {
      }
    }

    var storyNodes = this.props.items.map(function(item, rank) {
      return (
        <div className="Media" key={item.data.id}>
          <div className="MediaFigure">
            <div className="Figure">
              {rank + 1}
            </div>
          </div>
          <div className="MediaBody">
            <p className="title">
              <a href={item.data.url}>
                {item.data.title}
              </a>
            </p>
            <p className="author">
              <b>{item.data.score}</b> points with <a href={item.data.url+item.data.id}><b>{item.data.num_comments}</b></a> comments
            </p>
          </div>
        </div>
      );
    });

    return (
      <table>
        <tbody>
          {storyNodes}
        </tbody>
      </table>
    );
  }
});

module.exports = StoryList;