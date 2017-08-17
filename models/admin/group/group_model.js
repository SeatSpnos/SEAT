var query = require('models/query')
var db = 'SE_SEAT'
module.exports = {

	all : all_groups,
	selectOne : select_group
}


function all_groups(callback){
	sql = 'SELECT * from groups'
  query.get(db, sql, callback)
}

function select_group (data, callback){
  var sql = 'SELECT * from groups WHERE id = ?'
  var values = [data.group_id]
  query.post(db, sql, values, callback)
}
