const equipFindModel = require('models/equipmentstate').main.find;
const tablesModel = require('models/equipmentstate').main;
const async = require('async');

module.exports = {itemsToAdjust: itemsToAdjust};

function itemsToAdjust (data, callback) {
  let keys = [
    'equipment_type_FK_id',
    'SP_FK_id',
    'tecnology_FK_id',
    'state_FK_id',
    'equipment_sub_FK_id'
  ];
  let tables = {
    'equipment_type_FK_id': 'equipment_type',
    'SP_FK_id': 'parceiros',
    'tecnology_FK_id': 'tecnologys',
    'state_FK_id': 'equipment_state',
    'equipment_sub_FK_id': 'equipment_type'
  };
  let itemsToInsert = [];

  async.each(keys, loop, end);

  function loop (key, loopCB) {
    equipFindModel.toValidate(data[key], tables[key], (err, results) => {
      if (err) return loopCB(err);
      if (!results.length) itemsToInsert.push({table: tables[key], key: key, value: data[key]});
      loopCB();
    });
  }

  function end () {
    adjustItems(itemsToAdjust, callback);
  }
}

function adjustItems (items, callback) {
  async.each(items, (err, results) => {
    console.log('PAAAAAAAAAAA', results);
    if (err) return callback(err);
    tablesModel.insert.auxTables(items.key, items.tables, (err, rows) => {
      if (err) return callback(err);
      callback(null, rows);
    });
  });
}

  /* function loop (dsafg, sadfghg) {
    tablesModel.insert(data[key], tables[i], (err, insertedItem) => {
      return newData[key] = insertedItem.insertId;
    });

  } */

/* let params = {
    id: obj.id,
    equipment_type_FK_id: obj.equipment_type_FK_id,
    serial: obj.serial,
    origin: obj.origin,
    date: obj.date,
    SP_FK_id: obj.SP_FK_id,
    name: obj.name,
    NIF: obj.NIF,
    CS: obj.NIF,
    OT: obj.OT,
    tecnology_FK_id: obj.tecnology_FK_id,
    state_FK_id: obj.state_FK_id,
    search: obj.search,
    equipment_sub_FK_id: obj.equipment_sub_FK_id,
    serial_sub: obj.serial_sub
  };
  let tasks = [
    async.constant(params),
    equipTypeHandle,
    spHandle,
    tecFkHande,
    equipStateHandle,
    equipSubHandle
  ];
  async.waterfall(tasks, end);

  function end (err, params) {
    if (err) return callback(err);
    callback(null, params);
  }
};

function equipTypeHandle (params, next) {
  console.log('PARAMS to val', params.equipment_type_FK_id);
  equipFindModel.toValidate(params.equipment_type_FK_id, (err, rows) => {
    if (err) return next(err);
    if (!rows[1].length) {
      equipInsertModel.equipmentType(params.equipment_type_FK_id, (err, rows) => {
        if (err) return next(err);
        params.equipment_type_FK_id = rows.insertId;
      });
    }
    next(null, params);
  });
}

function spHandle (params, next) {
  equipFindModel.toValidate(params.SP_FK_id, (err, rows) => {
    if (err) return next(err);
    if (!rows[1].length) {
      equipInsertModel.sp(params.SP_FK_id, (err, rows) => {
        if (err) return next(err);
        params.SP_FK_id = rows.insertId;
      });
    }
    next(null, params);
  });
}

function tecFkHande (params, next) {
  equipFindModel.toValidate(params.tecnology_FK_id, (err, rows) => {
    if (err) return next(err);
    if (!rows[1].length) {
      equipInsertModel.tecnology(params.tecnology_FK_id, (err, rows) => {
        if (err) return next(err);
        params.tecnology_FK_id = rows.insertId;
      });
    }
    next(null, params);
  });
}

function equipStateHandle (params, next) {
  equipFindModel.toValidate(params.state_FK_id, (err, rows) => {
    if (err) return next(err);
    if (!rows[1].length) {
      equipInsertModel.tecnology(params.state_FK_id, (err, rows) => {
        if (err) return next(err);
        params.state_FK_id = rows.insertId;
      });
    }
    next(null, params);
  });
}

function equipSubHandle (params, next) {
  equipFindModel.toValidate(params.equipment_sub_FK_id, (err, rows) => {
    if (err) return next(err);
    if (!rows[1].length) {
      equipInsertModel.equipmentType(params.equipment_sub_FK_id, (err, rows) => {
        if (err) return next(err);
        params.equipment_sub_FK_id = rows.insertId;
      });
    }
    next(null, params);
  });
}
*/
