const query = require('db').connection;
const db = 'SE_SEAT';
const table = 'scales_elements';

module.exports = (values, callback) => {
  let sqlQuery =
  `INSERT INTO ${table} SET ?`;
  query(db, sqlQuery, values, callback);
};
