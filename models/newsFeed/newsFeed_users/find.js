const dbConnection = require('db');
const table = 'seat';

module.exports = {
	allNewMsg: allNewMsg,
	allOldMsg: allOldMsg,
	findTotalRead: findTotalRead
};

function allNewMsg (id, callback) { 
	let query = `SELECT * FROM usermsg 
	WHERE 
		isRead = ? 
	AND 
		user_FK_id = ? 
	ORDER 
		BY id DESC`;
	
	let values = [0, id]

	dbConnection(table, query, values, callback);
}

function allOldMsg (id, callback) {
	let query = `SELECT * FROM usermsg
 	WHERE 
	 	user_FK_id = ? 
 	AND 
 		isRead = "1" 
	ORDER BY 
		id DESC`;

	let values = [id]

	dbConnection(table, query, values, callback);
}

function findTotalRead (callback) { 
	let query = `SELECT 
		msg_FK_id,
 		count(user_FK_id) as total,
	  sum(isRead) isRead 
	  	FROM  
	  		usermsg 
  		GROUP BY 
  			msg_FK_id 
			ORDER BY 
				msg_FK_id ASC`;
	
	dbConnection(table, query, values, callback);
}
