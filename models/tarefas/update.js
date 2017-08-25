const query = require('../../models/query_ots').post;
const db = 'seat';

module.exports = (id, value, callback) => {
  let sqlQuery =
  `UPDATE tarefas SET ?
  WHERE tarefaID = ?`;
  let values = [value, id];
  query(db, sqlQuery, values, callback);
};
