var Reflux = require("reflux");

var Actions = Reflux.createActions([
  "addItem",
  "removeItem",
]);

var __store = Reflux.createStore({
  init: function() {
    this.store = []
    this.actions = Actions;
    this.listenToMany(Actions);

    var localData = JSON.parse(localStorage.getItem('subreddits'))
    if(localData) {
      this.store = localData
    }
    else {
      this.store = [{url: "", name: "front"}]
    }
  },

  addItem: function(item) {
    this.store.push(item)
    this._updateList()
  },

  removeItem: function(item) {
    console.log(item)
    this.store.splice(item, 1)
    this._updateList()
  },

  _updateList: function() {
    console.log(this.store)
    localStorage.setItem('subreddits', JSON.stringify(this.store))
    this.trigger(this.store)
  }
});

module.exports = __store;