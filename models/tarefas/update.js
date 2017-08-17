const query = require('../../models/query_ots').post;
const db = 'seat';

module.exports = (id, values, callback) => {
  let sqlQuery =
  `UPDATE tarefas SET ?
  WHERE tarefaID = ?`;
  let valuesToInsert = [values, id];
  query(db, sqlQuery, valuesToInsert, callback);
};
