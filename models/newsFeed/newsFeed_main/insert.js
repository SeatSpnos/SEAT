const dbConnection = require('db');
const table = 'seat';

module.exports = function (feed, callback) {
  let query =`INSERT INTO 
  newsfeed SET 
	  title = ?,
	  text = ?,
	  priority = ?,
	  required = ?,
	  grupo = ?,
	  date= ?,
	  category = ?,
	  tags = ?,
	  attachment = ?,
	  active = ?,
	  expireDate = ?`;

  let values = [
	  feed.title,
	  feed.text,
	  feed.priority,
	  feed.required,
	  feed.group,
	  new Date(),
	  feed.category,
	  feed.tags,
	  feed.attachment,
	  1,
	  feed.expireDate 
  ];

	dbConnection(table, query, values, callback);
}


