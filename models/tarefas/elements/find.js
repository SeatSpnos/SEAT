const query = require('models/query_ots').post;
const db = 'seat';

module.exports = {
  all: all
};

function all (callback) {
  let sqlQuery = `SELECT * FROM tasks_elements`;
  query(db, sqlQuery, null, callback);
}
