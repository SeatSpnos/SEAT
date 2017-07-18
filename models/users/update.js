const dbConnection = require('db');
const table = 'seat';

module.exports = function (values, callback) {
  let query = 
    `UPDATE users
    SET ?
    WHERE id = ?
    `;
  
  dbConnection(table, query, values, callback);
}