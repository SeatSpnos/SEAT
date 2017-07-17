const dbConnection = require('db');
const table = 'seat';

module.exports = function (data, callback) {
	let query = 
	`UPDATE groups 
	SET
		group_name = ?,
		group_menu = ?,
		group_submenu = ?,
		group_content = ?
	WHERE 
		group_id = ?`;

	dbConnection(table, query, data, callback);
};
