const admin = require('./admin');
const controllers = require('controllers');

module.exports = function (app) {
	//app.get('/users', controllers.admin.users.find.all);
	//app.get('/users/:id', controllers.admin.users.find.byId);
	//app.get('/:username', controllers.admin.users.find.byUsername);
	//app.post('/users', controllers.admin.users.insert);
	//app.put('/users', controllers.admin.users.update.editUser);
	app.use('/users', admin.users)
};
