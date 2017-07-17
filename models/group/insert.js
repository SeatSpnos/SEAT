const dbConnection = require('db');
const table = 'seat';

module.exports = function (data, callback) {
	let query = 
	`INSERT INTO groups 
	SET
		group_name = ?,
		group_menu = ?,
		group_submenu = ?,
		group_content = ?,
		group_id = ?`;

	dbConnection(table, query, data, callback);
};


 