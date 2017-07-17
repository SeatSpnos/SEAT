const dbConnection = require('db');
const table = 'seat';

module.exports = { 
	listAll: listAll,
	selectOne: selectOne
};

function listAll (callback){
	let query= `SELECT * from groups`;
  dbConnection(table, query, callback);
}

function selectOne (data, callback){
  let query = `SELECT * from groups WHERE id = ?`;
  let values = [data.group_id]
  dbConnection(table, query, values, callback);
}
