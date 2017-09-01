const query = require('../../models/query_ots').post;
const db = 'seat';

module.exports = (id, callback) => {
  let sqlQuery =
  `DELETE FROM escala 
  WHERE id = ?`;
  query(db, sqlQuery, id, callback);
};
