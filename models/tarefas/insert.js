const query = require('../../models/query_ots').post;
const db = 'seat';

module.exports = (values, callback) => {
  let sqlQuery =
  `INSERT INTO tasked_users
  (userFK, taskValue, dateBegin)
  VALUES ?
  ON DUPLICATE KEY UPDATE taskValue=VALUES(taskValue)`;
  query(db, sqlQuery, values, callback);
};
