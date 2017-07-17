const dbConnection = require('db');
const table = 'seat';

module.exports = {
	all: all,
	byId: byId,
	byUsername: byUsername
};

function all (callback) {
	let query = 
	`SELECT *
	FROM users`;

	dbConnection(table, query, callback);
}

function byId (id, callback) {
	let query = 
	`SELECT *
	FROM users
	WHERE id = ?`;

	dbConnection(table, query, id, callback);
}

function byUsername (username, callback) {
	let query =
	`SELECT *
	FROM users
	WHERE username = ?`

	dbConnection(table, query, username, callback);
}