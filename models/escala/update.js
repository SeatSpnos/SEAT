const query = require('../../models/query_ots').post;
const db = 'seat';

module.exports = {
  one: one
};

function one (id, value, callback) {
  let sqlQuery =
  `UPDATE escala SET value = ? 
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
