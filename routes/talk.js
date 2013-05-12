var mongoose = require('mongoose')
  , Talk = mongoose.model("Talk")
  , _ = require('underscore');

exports.new = function(req, res){
  res.render("talks/new", {errors: null})
};

exports.show = function(req, res){
  Talk.find({uuid: req.params.talk}, function(err, obj) {
    if (err || _.isEmpty(obj)) {
      res.status(404);
      res.render("404")
    } else {
      res.render("talks/show", {talk : _.first(obj)})
    }
  })
};

exports.create = function(req, res) {
  var talk = new Talk();
  talk.massAssign(req.body);
  talk.save(function(err) {
    if (err) {
      res.render("talks/new", {errors: err.errors});
    } else {
      res.send("/chat");
    }
  });
}