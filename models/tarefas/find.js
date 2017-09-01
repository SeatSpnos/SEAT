const query = require('../../models/query_ots').post;
const db = 'seat';

module.exports = {
  all: all,
  verify: verify,
  allTasksByDate: allTasksByDate
};

function all (callback) {
  let sqlQuery = `SELECT * FROM tasks`;
  query(db, sqlQuery, null, callback);
}

function verify (taskForm, callback) {
  let sqlQuery =
  `SET @date = ?;
  SET @dateEnd = ?;
  SELECT distinct(taskID), taskValue, userFK, dateBegin
  FROM tasked_users, escala
  WHERE (dateBegin >= @date and dateBegin <= @dateEnd)
  AND userFK = ?`;
  query(db, sqlQuery, taskForm, callback);
}

function allTasksByDate (date, callback) {
  let sqlQuery =
  `SET @date = ?; 
  SELECT *
  FROM tasked_users 
  WHERE @date = dateBegin`;
  query(db, sqlQuery, date, callback);
}
