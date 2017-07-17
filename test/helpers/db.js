const config = require('../../config').database;
const mysql = require('mysql');
let connectionTest;

module.exports = {
  start: start,
  close: close,
  query: query
};

function start(callback) {
  connectionTest = mysql.createConnection(config);
  let createDbSql = 
  `CREATE DATABASE seat_test
  DEFAULT COLLATE = 'utf8_general_ci'`;

  connectionTest.query(createDbSql, function(err, result) {
    if (err) return console.error('Error creating: ' + err.stack)
    console.log('Database created!');    
    callback();
  });
}

function close(callback) {
  connectionTest = mysql.createConnection(config);
  connectionTest.query('DROP DATABASE seat_test', function (err, rows) {
    if (err) return console.error('Error droping: ' + err.stack)
    console.log('DATABASE CLEARED')
    connectionTest.end();
    console.log('Closed connection to DB');
    callback()
  });
}

function query(table, query, values, callback) {
  connectionTest.query('USE seat_test', function (err) { 
    if (err) return console.error('Error connecting: ' + err.stack);
    connectionTest.query(query, values, function (err, rows) { 
      if (err) return callback(err);
      callback(null, rows); 
    });
  });
}
