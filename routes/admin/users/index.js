var express = require('express')
var router = express.Router()
const controllers = require('controllers');
router.get('/', controllers.admin.users.find.all);
router.get('/byId/:id', controllers.admin.users.find.byId);
router.get('/byUsername/:username', controllers.admin.users.find.byUsername);
router.post('/', controllers.admin.users.insert);
router.put('/', controllers.admin.users.update.newPassword);
module.exports = router;
