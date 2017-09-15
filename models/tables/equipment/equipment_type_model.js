var query = require('models/query');
var db = 'SE_SEAT';

module.exports = {

  selectOne: one,
  insert: insert
};

function one (data, callback) {
  var sql = 'Select * FROM equipment_type WHERE name = ?';
  var values = [data.equipmentstate_type_FK_id];
  query.post(db, sql, values, callback);
}

function insert (data, callback) {
  var sql = 'INSERT INTO equipment_type SET name = ?';
  var values = [data.equipmentstate_type_FK_id];
  query.post(db, sql, values, callback);
}
