const dbConnection = require('db');
const table = 'seat';

module.exports = function (name, callback) { 
	var query = `INSERT INTO 
	newsfeed_tags 
	SET name = ?`
	
	let values = [name];

	dbConnection(table, query, values, callback);
}
