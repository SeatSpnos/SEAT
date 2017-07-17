const dbConnection = require('db');
const table = 'seat';

module.exports = function (newUser, callback) {
  let query = 
    `INSERT INTO users 
    SET ?
    `;
  dbConnection(table, query, newUser, callback);
}
