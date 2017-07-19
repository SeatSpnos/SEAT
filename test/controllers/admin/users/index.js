
const createTable =
 `CREATE TABLE users
    (
      id INT(11) NOT NULL AUTO_INCREMENT,
      username VARCHAR(50) NOT NULL,
      password VARCHAR(200) NOT NULL,
      firstLogin VARCHAR(50) NOT NULL DEFAULT 'true',
      email VARCHAR(50) NOT NULL,
      readContent VARCHAR(50) NOT NULL DEFAULT 'Sim',
      firstName VARCHAR(50) NOT NULL,
      lastName VARCHAR(50) NOT NULL,
      group_permission VARCHAR(50) NOT NULL,
      data_nascimento DATE NOT NULL,
      data_entrada DATE NULL DEFAULT NULL,
      foto VARCHAR(50) NULL DEFAULT NULL,
      carta_conducao VARCHAR(50) NULL DEFAULT NULL,
      cartao_nos VARCHAR(50) NULL DEFAULT NULL,
      comments VARCHAR(200) NULL DEFAULT NULL,
      state VARCHAR(50) NOT NULL DEFAULT 'Active',
      phonenumber INT(11) NOT NULL,
      required VARCHAR(50) NOT NULL DEFAULT 'false',
      PRIMARY KEY (id)
    )
    COLLATE='latin1_swedish_ci'
    ENGINE=InnoDB
    AUTO_INCREMENT=1;`;
      
const insertUsers = [{
		username: 'gaspar',
		email: 'gaspar@gmail.com',
		firstName: 'Almeida',
		lastName: 'Coisas',
		group_permission: 'dev',
    data_nascimento: '1984-02-02',
    data_entrada: '2017-02-02',
    foto: '',
    carta_conducao: '',
    cartao_nos: '',
		phonenumber: 213456789,
    readContent: 'sim',
    comments: 'yes',
    required: 'sim'
  },
  {
		username: 'oscarie',
		email: 'oscar@gmail.com',
		firstName: 'oscar',
		lastName: 'matus',
		group_permission: 'dev',
		data_nascimento: '1990-10-22',
	  data_entrada: '2017-02-02',
    foto: '',
    carta_conducao: '',
    cartao_nos: '',
		phonenumber: 215556484,
    readContent: 'sim',
    comments: 'yes',
    required: 'sim'
  }]; 

  module.exports = {
	createTable: createTable,
	insertUsers: insertUsers,
}