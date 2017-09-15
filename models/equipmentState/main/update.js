const dbConnection = require('models/query_ots').post;
const db = 'seat';

module.exports = (table, id, toUpdate, callback) => {
  let sql =
  `UPDATE ${table}
  SET ?
  WHERE id = ?`;
  let values = [id, toUpdate];
  dbConnection(db, sql, values, callback);
};
