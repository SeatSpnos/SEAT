const query = require('../../models/query_ots').post;
const db = 'seat';

module.exports = {
  findByDate: findByDate,
  findByDateAndFk: findByDateAndFk,
  allTasks: allTasks
};

function findByDate (date, callback) {
  let sqlScaleQuery =
  `SET @date = ?; 
  SELECT *
  FROM escala 
  WHERE date >= @date
    AND date < DATE_ADD(@date, INTERVAL 1 MONTH)`;
  query(db, sqlScaleQuery, date, callback);
}

function findByDateAndFk (date, userFK, callback) {
  let sqlQuery =
  `SELECT * 
  FROM escala
  WHERE date = ?
    AND user_FK_ID =?`;
  query(db, sqlQuery, [date, userFK], callback);
}

function allTasks (callback) {
  let sqlQuery =
  `SELECT tarefaID, tarefa
  FROM tarefas`;
  query(db, sqlQuery, callback);
}
