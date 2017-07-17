const dbConnection = require('db');
const table = 'seat';

module.exports = {
	newPassword:newPassword,
	editUser:editUser,
	resetPassword: resetPassword,
  readContent: readContent
};

//pass = cript pass
//first log = false
function newPassword (id, password, callback) {
	let query = 
	  `UPDATE user
	  SET 
	    password = ?,
	    firstlog = ?
	    WHERE id = ?`;
  
  let values = [
		bcrypt.hashSync(password, null, null),
 		false, 
 		id
	];

	dbConnection(table, query, values, callback);
}

function editUser (id, user, callback) {
	let query = 
    `UPDATE user
    SET 
      username = ?,
      firstName = ?,
      lastName = ?,
      email = ?,
      group_permission = ?,
      data_nascimento = ?,
      data_entrada = ?,
      foto = ?,
      cartao_nos = ?,
      telefone = ?,
      state = ?    
    WHERE 
    	id = ?`;  

  let values = [
    user.username, 
    user.firstname,
    user.lastName,
    user.email,
    user.group_permission,
    user.data_nascimento,
    user.data_entrada,
    user.foto,
    user.cartao_nos,
    user.telefone,
    user.state,
    id
  ]; 

  dbConnection(table, query, values, callback);
}

function resetPassword (id, callback) {
	let query = 
    `UPDATE user
    SET 
      password = ? ,
      firstLogin = ?
    WHERE id = ?`;  

  let values = [
    bcrypt.hashSync('password', null, null),
    true,
    id
  ];

  dbConnection(table, query, values, callback);
	//pass = crypt 
	//firstlog = true
}

function readContent (id, value, callback) {
  let query =
  `UPDATE user
  SET
    readContent = ?
  WHERE id = ?`;

  let values = [value, id];
  dbConnection(table, query, values, callback);
}