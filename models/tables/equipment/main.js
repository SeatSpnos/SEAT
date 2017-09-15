const dbConnection = require('models/query').post;
const db = 'seat';
const table = 'equipment_state';

module.exports = {
  all: all,
  udpate: update,
  insert: insert,
  allAuxTables: allAuxTables
}

function all (callback) {
  let sql =
  `SELECT *
  FROM ${table}`;
  dbConnection(db, sql, [], callback);
}

function update (id, toUpdate,callback) {
  let sql =
  `UPDATE ${table}
  SET ?
  WHERE id = ?`;
  let values = [id, toUpdate];
  dbConnection(db, sql, values, callback);
}


function insert  (toUpdate, callback) {
  let sql =
  `INSERT INTO ${table}
  SET ?`;
  dbConnection(db, sql, toUpdate, callback);
}

function allAuxTables (callback) {
  let sql =
  `Select * FROM equipment_type;
  Select * FROM sp;
  Select * FROM tecnology;
  Select * FROM state;`;
  dbConnection(db, sql, [], callback);
}
