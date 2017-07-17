const dbConnection = require('db');
const table = 'seat';

module.exports = {
	OnebyTag: OnebyTag,
	allByTags: allByTags
};

function OnebyTag (tag, callback) {
  let query = `SELECT * FROM 
  newsfeed_tags 
  WHERE name = ?`; 
  let values = [tag]

  dbConnection(table, query, values, callback);
}

function allByTags (callback) {
  let query = `SELECT * FROM
  newsfeed_tags 
  ORDER BY name ASC`;

  dbConnection(table, query, callback);
}