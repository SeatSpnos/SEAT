const dbConnection = require('db');
const table = 'seat';

module.exports = { 
	allByCategory: allByCategory,
  OneByCategory: OneByCategory
};

function allByCategory (callback) {
  let query = `SELECT * FROM 
  newsfeed_category 
  ORDER BY name ASC`;
  
  dbConnection(table, query, callback);
}

function OneByCategory (name, callback) {
  let query = `SELECT * FROM 
  newsfeed_category 
  WHERE name =?`;

  let values = [name]

  dbConnection(table, query, values, callback);
}
