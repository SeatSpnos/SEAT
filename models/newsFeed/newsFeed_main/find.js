const dbConnection = require('db');
const table = 'seat';

module.exports = { 
  all: all,
	allById: allById
};

function all (callback) {
  let query =`SELECT * FROM newsfeed
  WHERE active = ? 
  AND 
    expireDate >= ? 
  ORDER BY 
    priority DESC`;
  
  let values = [ 1, new Date() ]

  dbConnection(table, query, values, callback);
}

function allById (id, callback) {
  let query = 
  `SELECT * FROM newsfeed
  WHERE id = ?
  AND active = 1
  AND expireDate >= ?`
  
  let values = [ id, new Date ]
  
  dbConnection(table, query, values, callback); 
}



