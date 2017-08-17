const query = require('../../../models/query_ots.js').post;
const db = 'seat';
const table = 'users';

module.exports = {
  allActiveUsersConcatedName: allActiveUsersConcatedName
};

function allActiveUsersConcatedName (callback) {
  let sqlUsersQuery =
  `SELECT id, CONCAT_WS(' ', firstName, lastName) as name 
  FROM ${table} WHERE state = ?`;
  let values = ['Active'];
  query(db, sqlUsersQuery, values, callback);
}
