const dbConnection = require('db');
const table = 'seat';

module.exports = function (name, callback) { 
	let query = `INSERT INTO 
	newsfeed_category 
	SET name = ?`
	
	let values 	= [name];

	dbConnection(table, query, values, callback);
}
