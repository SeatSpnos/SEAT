const query = require('../../models/query_ots').post;
const db = 'seat';

module.exports = {
  one: one,
  bulk: bulk
};

function one (values, callback) {
  let sqlQuery =
    `INSERT INTO escala SET ?`;
  query(db, sqlQuery, values, callback);
}

/*function bulk (values, callback) {
  let sqlQuery =
  `INSERT INTO escala (user_FK_ID, value, date) VALUES ?`;
  query(db, sqlQuery, [values], callback);
}*/

function bulk (values, callback) {
  let sqlQuery =
  `INSERT INTO escala 
  (user_FK_ID, value, date) 
  VALUES ?
  ON DUPLICATE KEY UPDATE value=VALUES(value)`;
  query(db, sqlQuery, values, callback);
}
