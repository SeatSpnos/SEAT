const query = require('db').connection;
const db = 'SE_SEAT';
const table = 'scales_users';

module.exports = {
  one: one,
  bulk: bulk
};

function one (values, callback) {
  let sqlQuery =
    `INSERT INTO ${table} SET ?`;
  query(db, sqlQuery, values, callback);
}

/*function bulk (values, callback) {
  let sqlQuery =
  `INSERT INTO escala (user_FK_ID, value, date) VALUES ?`;
  query(db, sqlQuery, [values], callback);
}*/

function bulk (values, callback) {
  let sqlQuery =
  `INSERT INTO ${table} 
  (date, user_FK_ID, value_FK_ID) 
  VALUES ?
  ON DUPLICATE KEY UPDATE value_FK_ID=VALUES(value_FK_ID)`;
  query(db, sqlQuery, values, callback);
}
