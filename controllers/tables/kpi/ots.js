var model = require('../models').ots
var navbar = require('controllers/navbar').navbar
module.exports = {
	getAll  : list
}

function list (req, res){
	var date = new Date()
	var begin = date.toISOString().slice(0,10)
	var end = begin.slice(0,8)+ (date.getDate()+1)
  model.selectAll(begin, end, function(err, rows){
    var table = rows
    navbar(function(err,bar){
      var navbar = bar
      var user = req.user
      res.render('../views/pages/ots', { tables : table, navmenu : navbar, user:user})
      })   
  })
}