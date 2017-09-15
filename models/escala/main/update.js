const query = require('db').connection;
const db = 'SE_SEAT';
const table = 'scales_users';

module.exports = {
  one: one
};

function one (id, value, callback) {
  let sqlQuery =
  `UPDATE ${table} SET value_FK_ID = ? 
  WHERE id = ?
  `;
  let values = [value, id];
  query(db, sqlQuery, values, callback);
}

/*
function bulk (id, value, callback) {
  let sqlQuery =
  `UPDATE escala SET value = ?
  WHERE id IN (?)`;
  let values = [value, id];
  query(db, sqlQuery, values, callback);
}*/
