const query = require('../../models/query_ots').post;
const db = 'seat';

module.exports = (values, callback) => {
  let sqlQuery =
  `INSERT INTO tarefas SET ?`;
  query(db, sqlQuery, values, callback);
};
