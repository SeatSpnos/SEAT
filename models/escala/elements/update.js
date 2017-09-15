const query = require('db').connection;
const db = 'SE_SEAT';
const table = 'scales_elements';

module.exports = (id, value, callback) => {
  let sqlQuery =
  `UPDATE ${table} SET ? 
  WHERE id = ?`;
  let values = [value, id];
  query(db, sqlQuery, values, callback);
};
