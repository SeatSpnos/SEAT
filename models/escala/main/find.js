const query = require('db').connection;
const db = 'SE_SEAT';
const table = 'scales_users';
const tableElements = 'scales_elements';

module.exports = {
  ByDate: ByDate
};

function ByDate (date, callback) {
  let sqlScaleQuery =
  `SET @date = ?; 
  SELECT
    scales_users.id,
    user_FK_ID,
    date,
    scales_elements.id as scaleId,
    scales_elements.name,
    scales_elements.group,
    scales_elements.backgroundColor,
    scales_elements.fontColor,    
    scales_elements.alias
  FROM ${table} 
  JOIN ${tableElements} ON ( ${table}.value_FK_ID = ${tableElements}.id )
  WHERE date >= @date
    AND date < DATE_ADD(@date, INTERVAL 1 MONTH)`;
  query(db, sqlScaleQuery, date, callback);
}

/*
function betweenDates (dateBegin, dateEnd, userFK, callback) {
  let sqlQuery =
  `SELECT *
  FROM escala
  WHERE date BETWEEN ? AND ?
  AND user_FK_ID = ?`;
  let values = [dateBegin, dateEnd, userFK];
  query(db, sqlQuery, values, callback);
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
} */
