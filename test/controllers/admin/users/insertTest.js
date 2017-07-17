const assert = require('chai').assert;
const helpers = require('../../../helpers')
const supertest = require('supertest');
const connection = supertest(helpers.app);
const database = helpers.database;

function createTable (done) {
  let query = 
    `CREATE TABLE users
    (
      id INT NOT NULL AUTO_INCREMENT,
      username VARCHAR(50) NOT NULL,
      firstName VARCHAR(50) NOT NULL,
      lastName VARCHAR(50) NOT NULL,
      email VARCHAR(50) NOT NULL,
      group_permission VARCHAR(50) NOT NULL,
      data_nascimento DATE NULL,
      data_entrada DATE NULL,
      foto VARCHAR(50) NULL,
      cartao_nos VARCHAR(50) NULL,
      telefone VARCHAR(50) NULL,
      password VARCHAR(50)  NOT NULL,
      state INT(10) NULL,
      firstLogin INT(10) NULL,
      PRIMARY KEY (id)
    )`
  database.query(null, query, [] , done)
}

describe('#Testing insert.js from users', function(err, res) {
	describe('With errors and no db', function(err, res) {
		it('it should return an error 500 when there is no connection to db', function(done) {
			connection
				.post('/users')
				.end(function(err, res) {
					assert.isNotOk(err);
          assert.equal(res.statusCode, 500);
          assert.isOk(res.body);
					done();
				});
		});	
	});

	describe('Without errors with db', function(err, res) {
		before(function (done) {

			let insertValues = {
				
				  username: 'Rui',
				  firstName: 'Afonso',
				  lastName: 'last',
				  email: 'name@last.com',
				  group_permission: 'dev',
				  data_nascimento: '19/02/1984',
				  data_entrada: '19/02/1984',
				  foto: 'ccc',
				  cartao_nos: 'c',
				  telefone: '21212121',
				  password: 'password',
				  state: 'active',
			    firstLogin: 1 
			};

	    let query = 
	    `INSERT INTO users
	    SET ?
	    `;
	    database.start(function() {
	      createTable(function (err, res) {
	        database.query(null, query, insertValues, done);
	      });
	    });
	  });  

	  after(function (done) {
	    database.close(function() {
	      done();
	    });
	  });

		it('It should insert a new user into db', function(done) {
			connection
				.post('/users')
				.end(function(err, res) {
					assert.isNotOk(err)
					console.log('HEREEEEE 200: ', res.body)
					assert.equal(res.statusCode, 200)
					assert.isOk(res.body)
					done();
				});
		});
	});
});