var express = require('express')
var router = express.Router()
const controllers = require('controllers');

router.get('/', controllers.admin.users.find.all);
router.get('/:id', controllers.admin.users.find.byId);
router.get('/:username', controllers.admin.users.find.byUsername);
router.post('/', controllers.admin.users.insert);
router.put('/', controllers.admin.users.update.editUser);
module.exports = router;
