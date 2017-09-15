const query = require('models/query_ots').post;
const db = 'seat';

module.exports = {
  verify: verify,
  allTasksByDate: allTasksByDate
};

function verify (taskForm, callback) {
  let sqlQuery =
  `SET @date = ?;
  SET @dateEnd = ?;
  SELECT distinct(taskID), taskValue, userFK, dateBegin
  FROM tasks_users
  WHERE (dateBegin >= @date and dateBegin <= @dateEnd)
  AND userFK = ?`;
  query(db, sqlQuery, taskForm, callback);
}

function allTasksByDate (date, callback) {
  let sqlQuery =
  `SET @date = ?; 
  SELECT *
  FROM tasks_users 
  WHERE @date = dateBegin`;
  query(db, sqlQuery, date, callback);
}
