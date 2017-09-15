const query = require('db').connection;
const db = 'SE_SEAT';
const table = 'scales_elements';

module.exports = {
  allScales: allScales,
  groups: groups
};

function allScales (callback) {
  let sqlQuery =
  `SELECT * 
  FROM ${table}`;
  query(db, sqlQuery, callback);
}

function groups (callback) {
  let sqlQuery =
  `SELECT 
    ${table}.group,
    group_concat(CAST(id AS CHAR)) as ids,
    group_concat(CAST(name AS CHAR)) as names
  FROM ${table}
    group by ${table}.group`;
  query(db, sqlQuery, callback);
}

