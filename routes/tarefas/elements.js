const express = require('express');
const router = express.Router();
const controller = require('controllers');

router.get('/all', controller.tarefas.elements.find.allTasks);

module.exports = router;
