const userModel = require('models/admin').user.find;
const scaleModel = require('models/escala').find;
const tasksModel = require('models/tarefas').find;
const moment = require('moment');

module.exports = {
  allByDate: allByDate,
  allTasks: allTasks,
  verify: verify
};

function allByDate (req, res, next) {
  let date = req.params.date || moment().format('YYYY-MM').concat('-01');
  userModel.allActiveUsersConcatedName((err, users) => {
    if (err) return res.status(500).json(err);
    let arrayIds = [];
    let dataToSend = [];
    for (let i in users) {
      arrayIds.push(users[i].id);
      let tempObj = {
        user: {
          id: users[i].id,
          name: users[i].name,
          escalaValue: []
        },
        tarefas: []
      };
      dataToSend.push(tempObj);
    }
    scaleModel.findByDate(date, (err, scales) => {
      if (err) return res.status(500).json(res);
      scales = scales[1];
      for (let i in scales) {
        let userId = scales[i].user_FK_ID;
        let indexOfUser = arrayIds.indexOf(userId);
        dataToSend[indexOfUser].user.escalaValue = scales[i].value;
      }
      tasksModel.allTasksByDate(date, (err, tasks) => {
        if (err) return res.status(200).json(err);
        tasks = tasks[1];
        for (let i in tasks) {
          let userId = tasks[i].userFK;
          let indexOfUser = arrayIds.indexOf(userId);
          dataToSend[indexOfUser].tarefas = tasks[i];
        }
        res.status(200).json(dataToSend);
      });
    });
  });
}

function allTasks (req, res, next) {
  tasksModel.byIDandTask((err, tasks) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(tasks);
  });
}

function verify (req, res, next) {
  let tasksForm = [
    req.body.date || moment().format('YYYY-MM-DD'),
    req.body.horaInicio,
    req.body.userFK
  ];
  console.log(tasksForm[0]);
  tasksModel.verify(tasksForm, (err, results) => {
    if (err) return res.status(500).json(err);
    results = results[2];
    res.status(200).json(results);
  });
}
