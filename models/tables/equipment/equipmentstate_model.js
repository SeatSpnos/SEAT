
const query = require('models/query');
const db = 'seat';

module.exports = {
  selectAll: all,
  selectOne: one,
  insert: insert,
  save: save,
  remove: remove
};

function all (data, callback) {
  let sql =
    `Select
      equipment_state.id,
      equipment_type.name as equipment_type,
      equipment_state.serial,
      equipment_state.origin,
      equipment_state.date,
      sp.name as sp,
      equipment_state.name,
      equipment_state.NIF,
      equipment_state.CS,
      equipment_state.OT,
      tecnology.name as tecnology,
      state.name as state,
      b.name as equipment_sub,
      equipment_state.serial_sub
    FROM equipment_state
    INNER JOIN equipment_type ON equipment_state.equipment_type_FK_id = equipment_type.id
    INNER JOIN sp ON equipment_state.SP_FK_id = sp.id
    INNER JOIN tecnology ON equipment_state.tecnology_FK_id = tecnology.id
    INNER JOIN state ON equipment_state.state_FK_id = state.id
    INNER JOIN equipment_type b on equipment_state.equipment_sub_FK_id = b.id`;
  query.get(db, sql, callback);
}

function one (data, callback) {
  let sql =
    `Select
      equipment_state.id,
      equipment_type.name as equipment_type,
      equipment_state.serial,
      equipment_state.origin,
      equipment_state.date,
      SP.name as SP,
      equipment_state.name,
      equipment_state.NIF,
      equipment_state.CS,
      equipment_state.OT,
      tecnology.name as tecnology,
      state.name as state,
      b.name as equipment_sub,
      equipment_state.serial_sub
      FROM equipment_state
      INNER JOIN equipment_type ON equipment_state.equipment_type_FK_id = equipment_type.id
      INNER JOIN SP ON equipment_state.SP_FK_id = SP.id
      INNER JOIN tecnology ON equipment_state.tecnology_FK_id = tecnology.id
      INNER JOIN state ON equipment_state.state_FK_id = state.id
      INNER JOIN equipment_type b on equipment_state.equipment_sub_FK_id = b.id
      WHERE equipment_state.id = ?`;
  let values = [data.equipmentstate_id];
  query.post(db, sql, values, callback);
}

function insert (data, callback) {
  var sql =
    `INSERT INTO equipment_state
    SET
      equipment_type_FK_id = ?,
      serial = ?,
      origin = ?,
      date = ?,
      SP_FK_id = ?,
      name = ?,
      NIF = ?,
      CS = ?,
      OT = ?,
      tecnology_FK_id = ?,
      state_FK_id = ?,
      equipment_sub_FK_id = ?,
      serial_sub = ?`;
  var values = [
    data.equipmentstate_type_FK_id,
    data.equipmentstate_serial,
    data.equipmentstate_origin,
    data.equipmentstate_date,
    data.equipmentstate_SP_FK_id,
    data.equipmentstate_name,
    data.equipmentstate_NIF,
    data.equipmentstate_CS,
    data.equipmentstate_OT,
    data.equipmentstate_tecnology_FK_id,
    data.equipmentstate_state_FK_id,
    data.equipmentstate_equipment_sub_FK_id,
    data.equipmentstate_serial_sub
  ];
  query.post(db, sql, values, callback);
}

function save (data, callback) {
  var sql =
    `UPDATE equipment_state
    SET equipment_type_FK_id = ?,
    serial = ?,
    origin = ?,
    date = ?,
    SP_FK_id = ?,
    name = ?,
    NIF = ?,
    CS = ?,
    OT = ?,
    tecnology_FK_id = ?,
    state_FK_id = ?,
    equipment_sub_FK_id = ?,
    serial_sub = ?
    WHERE id = ?`;
  var values = [
    data.equipmentstate_type_FK_id,
    data.equipmentstate_serial,
    data.equipmentstate_origin,
    data.equipmentstate_date,
    data.equipmentstate_SP_FK_id,
    data.equipmentstate_name,
    data.equipmentstate_NIF,
    data.equipmentstate_CS,
    data.equipmentstate_OT,
    data.equipmentstate_tecnology_FK_id,
    data.equipmentstate_state_FK_id,
    data.equipmentstate_equipment_sub_FK_id,
    data.equipmentstate_serial_sub,
    data.equipmentstate_id
  ];
  query.post(db, sql, values, callback);
}

function remove (id, callback) {
  var sql = 'DELETE FROM equipment_state WHERE id = ?';
  var values = [id];
  query.post(db, sql, values, callback);
}
