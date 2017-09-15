
var query = require('models/query');
var db = 'nos';

module.exports = {

  selectAll: all,
  selectOne: one,
  findOT: findOT,
  findS: findS

};

function all (begin, end, callback) {
  var sql = 'Select * FROM ots WHERE Data_Inicio_OT >="' + begin + ' "AND Data_Inicio_OT <="' + end + '"';

  query.get(db, sql, callback);
}

function one (ot, callback) {
  var sql = 'SELECT estado FROM ots WHERE Codigo_OT = "' + ot + '"';
  query.get(db, sql, callback);
}

function findOT (ot, callback) {
  let sql = 'SELECT * FROM ots WHERE Codigo_OT = ?';
  let values = [ ot ];

  query.post(db, sql, values, callback);
}

function findS (nClient, callback) {
  let sql = 'SELECT * FROM ots WHERE Conta_Servico = ? ORDER BY Data_Inicio_OT DESC';
  let values = [ nClient ];

  query.post(db, sql, values, callback);
}
