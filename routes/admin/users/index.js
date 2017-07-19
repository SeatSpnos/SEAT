var express = require('express')
var router = express.Router()
const controllers = require('controllers');

router.get('/', controllers.admin.users.find.all);
router.get('/byId/:id', controllers.admin.users.find.byId);
router.get('/byUsername/:username', controllers.admin.users.find.byUsername);
router.post('/', controllers.admin.users.insert);
router.put('/user/:id', controllers.admin.users.update.editUser);
router.put('/newPassword/:id', controllers.admin.users.update.newPassword);
router.put('/resetPassword/:id', controllers.admin.users.update.resetPassword);
router.put('/state/:id', controllers.admin.users.update.state);

module.exports = router;
