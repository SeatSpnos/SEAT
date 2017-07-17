var express = require('express')
var router = express.Router()
const controllers = require('controllers');

router.get('/users', controllers.admin.users.find.all);
router.get('/users/:id', controllers.admin.users.find.byId);
router.get('/:username', controllers.admin.users.find.byUsername);
router.post('/users', controllers.admin.users.insert);
module.exports = router;
