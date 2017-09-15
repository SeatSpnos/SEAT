const query = require('db').connection;
const db = 'SE_SEAT';
const table = 'scales_users';

module.exports = (id, callback) => {
  let sqlQuery =
  `DELETE FROM ${table}
  WHERE id = ?`;
  query(db, sqlQuery, id, callback);
};
