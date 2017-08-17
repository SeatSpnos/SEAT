const config = {
  host: 'wdt19167',
  user: 'test',
  password: '123test',
  multipleStatements: true,
  dateStrings: 'date'
};

const mysql = require('mysql');
let connection = mysql.createConnection(config);

module.exports = (table, query, values, callback) => {
  connection.query('USE seat', function (err) {
    if (err) return console.error('Error connecting: ' + err.stack);
    connection.query(query, values, function (err, rows) {
      if (err) return callback(err);
      callback(null, rows);
    });
  });
};
