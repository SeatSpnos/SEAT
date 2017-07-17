/*const assert = require('chai').assert;
const helpers = require('../../../../helpers')
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

describe('#Testing update.js from users', function() {
  describe('#Update user', function () {
    describe('With errors and without db', function () {
      it('it should return error 500 when there is no db connection', function(done) {
      connection
        .put('/users')
        .end(function (err, res) {
           assert.isNotOk(err);
           assert.equal(res.statusCode, 500);
           assert.isOk(res.body);
           done();
        });
      });
    });
 
	  describe('without errors with db', function () {
	  	  let insertedValues = {
	    		username: 'resu',
	        firstName: 'emane',
	        lastName: 'coisa',
	        email: 'coisa@last.com',
	        group_permission: '',
	        data_nascimento: null,
	        data_entrada: null,
	        foto: null,
	        cartao_nos: null,
	        telefone: null,
	        password: 'password',
	        state: null,
	        firstLogin: null 
	      };
	      let alterValues = {
	    		username: 'user',
	        firstName: 'name',
	        lastName: 'set',
	        email: 'bla@last.com',
	        group_permission: '',
	        data_nascimento: null,
	        data_entrada: null,
	        foto: null,
	        cartao_nos: null,
	        telefone: null,
	        password: 'password',
	        state: null,
	        firstLogin: null 
	      };
     	}); 
	      before(function (done) {
		     let query = 
		      `INSERT INTO users
		      SET ?
		      `;
		      let queryAlter =
		      `ALTER TABLE users
		      SET ?
		      WHERE id = 1
		      `;
	          
	        database.start(function() {
	          createTable(function (err, res) {
	            database.query(null, query, insertedValues, function() {
	              database.query(null, queryAlter, alterValues,done );
	            });
	        });
	      });  

	      after(function (done) {
	        database.close(function() {
	          done();
	        });
	      });

	  	it('It should edit a user in the db', function(done) {
	  		connection
	  			.put('/users')
					.end(function(err, res) {
	        assert.equal(res.statusCode, 200);
					});
	  	});
  	}); 
});
*/