const query = require('../../models/query_ots').post;
const db = 'seat';

module.exports = {
  byIDandTask: byIDandTask,
  verify: verify,
  allTasksByDate: allTasksByDate,
  byUserFK: byUserFK
};

function byIDandTask (callback) {
  let sqlQuery = `SELECT tarefaID, tarefa FROM tarefas`;
  query(db, sqlQuery, null, callback);
}

function verify (taskForm, callback) {
  let sqlQuery =
  `SET @date = ?;
  SET @startHour = ?;
  SELECT * FROM tarefas
  WHERE userFK = ? 
  AND @date BETWEEN dataInicio AND dataFim 
  AND @startHour BETWEEN horaInicio AND horaFim`;
  query(db, sqlQuery, taskForm, callback);
}

function allTasksByDate (date, callback) {
  let sqlQuery =
  `SET @date = ?; 
  SELECT *
  FROM tarefas 
  WHERE @date BETWEEN dataInicio AND dataFim`;
  query(db, sqlQuery, date, callback);
}

function byUserFK (id, callback) {
  let sqlQuery =
  `SELECT * FROM tarefas
  WHERE userFK = ?`;
  query(db, sqlQuery, id, callback);
}
