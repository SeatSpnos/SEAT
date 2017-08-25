const userModel = require('models/admin').user.find;
const scaleModel = require('models/escala').find;
const tasksModel = require('models/tarefas').find;
const moment = require('moment');
const async = require('async');

module.exports = {
  allByDate: allByDate,
  allTasks: allTasks,
  verify: verify
};

function allByDate (req, res, next) {
  let date = req.params.date || moment().format('YYYY-MM-DD');
  let funcs = [
    getUsers,
    getScalesValue,
    getTasks
  ];
  async.waterfall(funcs, end);

  function end (err, toSend) {
    if (err) res.status(500).json(err);
    res.status(200).json(toSend);
  }

  function getUsers (callback) {
    let arrayIds = [];
    let toSend = [];
    userModel.allActiveUsersConcatedName((err, users) => {
      if (err) return callback(err);
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
        toSend.push(tempObj);
      }
      callback(null, date, arrayIds, toSend);
    });
  }

  function getScalesValue (date, arrayIds, toSend, callback) {
    scaleModel.findByDate(date, (err, scales) => {
      if (err) return callback(err);
      scales = scales[1];
      for (let i in scales) {
        let userId = scales[i].user_FK_ID;
        let indexOfUser = arrayIds.indexOf(userId);
        toSend[indexOfUser].user.escalaValue = scales[i].value;
      }
    });
    callback(null, date, arrayIds, toSend);
  }

  function getTasks (date, arrayIds, toSend, callback) {
    tasksModel.allTasksByDate(date, (err, tasks) => {
      if (err) return callback(err);
      tasks = tasks[1];
      for (let i in tasks) {
        let userId = tasks[i].userFK;
        let indexOfUser = arrayIds.indexOf(userId);
        toSend[indexOfUser].tarefas.push(tasks[i]);
      }
      callback(null, toSend);
    });
  }
}

/* function allByDate (req, res, next) {
  let date = req.params.date || moment().format('YYYY-MM-DD');
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
          dataToSend[indexOfUser].tarefas.push(tasks[i]);
        }
        res.status(200).json(dataToSend);
      });
    });
  });
} */

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
  tasksModel.verify(tasksForm, (err, results) => {
    if (err) return res.status(500).json(err);
    results = results[2];
    res.status(200).json(results);
  });
}
