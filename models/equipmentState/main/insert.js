const dbConnection = require('models/query_ots').post;
const db = 'seat';

module.exports = {
  equipmentState: equipmentState,
  equipmentType: equipmentType,
  tecnology: tecnology,
  state: state,
  sp: sp,
  auxTables: auxTables
};

function equipmentState (toUpdate, callback) {
  let sql =
  `INSERT INTO equipment_state
  SET ?`;
  dbConnection(db, sql, toUpdate, callback);
}

function equipmentType (toUpdate, callback) {
  let sql =
  `INSERT INTO equipment_type
  SET name = ?`;
  dbConnection(db, sql, toUpdate, callback);
}

function state (toUpdate, callback) {
  let sql =
  `INSERT INTO state
  SET name = ?`;
  dbConnection(db, sql, toUpdate, callback);
}

function sp (toUpdate, callback) {
  let sql =
  `INSERT INTO sp
  SET name = ?`;
  dbConnection(db, sql, toUpdate, callback);
}

function tecnology (toUpdate, callback) {
  let sql =
  `INSERT INTO tecnology
  SET name = ?`;
  dbConnection(db, sql, toUpdate, callback);
}

function auxTables (value, tableToInsert, callback) {
  let sql =
    `INSERT INTO ${tableToInsert}
    SET name = ?
    `;
  dbConnection(db, sql, value, callback);
}
