const dbConnection = require('db');
const table = 'seat';


module.exports = {
	userFeed: userFeed,
	insertRead: insertRead,
	updateUserFeed: updateUserFeed
};

function userFeed (msg, user, callback) {
	let query = `INSERT usermsg
	 SET user_FK_id= ?,
 	 msg_FK_id = ?, 
 	 isRead = ?`
  
  let values = [user, msg, 0]

	dbConnection(table, query, values, callback);
}

function insertRead (msg, user, callback) {
	let query = `INSERT usermsg SET 
		user_FK_id= ?, 
		msg_FK_id = ?, 
		isRead = ?'`;

  let values = [user, msg, 1]

	dbConnection(table, query, values, callback);
}

function updateUserFeed (msg, user, callback) {

	let query = `UPDATE usermsg SET
	 isRead = ? 
 	WHERE 
 		msg_FK_id= ? 
	AND 
		user_FK_id = ?`;
	
	let values = [1, msg, user];

	dbConnection(table, query, values, callback);
}
