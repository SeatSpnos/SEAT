const query = require('models/query');
const db = 'SE_SEAT';

module.exports = {

  selectOne: one,
  insert: insert

};

function one (data, callback) {
  let sql = 'Select * FROM state WHERE name = ?';
  let values = [data.equipmentstate_state_FK_id];
  query.post(db, sql, values, callback);
}

function insert (data, callback) {
  let sql = 'INSERT INTO state SET name = ?';
  let values = [data.equipmentstate_state_FK_id];
  query.post(db, sql, values, callback);
}
