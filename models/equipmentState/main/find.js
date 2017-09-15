const dbConnection = require('models/query_ots').post;
const db = 'seat';
const table = 'equipment_state';

module.exports = {
  all: all,
  allAuxTables: allAuxTables,
  toValidate: toValidate
};

function all (callback) {
  let sql =
  `SELECT *
  FROM ${table}`;
  dbConnection(db, sql, [], callback);
}

function allAuxTables (callback) {
  let sql =
  `Select * FROM equipment_type;
  Select * FROM sp;
  Select * FROM tecnology;
  Select * FROM state;`;
  dbConnection(db, sql, [], callback);
}

function toValidate (value, table, callback) {
  let sql =
  `SET @value = ${value};
  SELECT id
  FROM ${table}
  WHERE
  id= @value OR
  name = @value`;
  dbConnection(db, sql, callback);
}
