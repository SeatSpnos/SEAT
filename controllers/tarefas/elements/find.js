const tasksModel = require('models/tarefas');

module.exports = {
  allTasks: allTasks
};

function allTasks (req, res, next) {
  tasksModel.elements.find.all((err, tasks) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(tasks);
  });
}
