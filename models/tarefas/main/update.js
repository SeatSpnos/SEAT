const query = require('models/query_ots').post;
const db = 'seat';

module.exports = (id, value, callback) => {
  let sqlQuery =
  `UPDATE tasks_users SET ?
  WHERE taskID = ?`;
  let values = [value, id];
  query(db, sqlQuery, values, callback);
};
