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
  tasksModel.all((err, tasks) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(tasks);
  });
}

// TODO!! IF REPEAT > 0 WE STILL RECEIVE ALL THE DATA FROM
// DATE_BEGIN UNTIL DATE_END, CONFLICT OR NOT.
function verify (req, res, next) {
  let params = {
    horaInicio: req.body.horaInicio,
    dateEnd: req.body.dateEnd,
    duracao: req.body.duracao,
    repeat: req.body.repeat,
    until: req.body.until,
    userFK: req.body.userFK
  };

  let tasks = [
    async.constant(params),
    addDuracao,
    addRepeat,
    verifyTask
  ];
  async.waterfall(tasks, end);

  function end (err, results) {
    if (err) res.status(500).json(err);
    res.status(200).json(results);
  }
}

function addDuracao (params, next) {
  if (params.duracao > 0) {
    let timeToAdd = 30 * params.duracao;
    params.dateEnd = moment(params.horaInicio).add(timeToAdd, 'm').format('YYYY-MM-DD HH:mm:ss');
    next(null, params);
  } else {
    params.dateEnd = moment(params.horaInicio).add(30, 'm').format('YYYY-MM-DD HH:mm:ss');
    next(null, params);
  }
  console.log('ADD DURACAO PARAMS:', params);
}

function addRepeat (params, next) {
  if (params.repeat > 0) {
    let momentBeginDate = moment(params.dateEnd);
    let momentfinalDate = moment(params.until);
    console.log('MOMENT DATEEND:', momentBeginDate);
    console.log('MOMENT UNTIL', momentfinalDate);
    for (
      let currentDate = momentBeginDate;
      momentfinalDate.diff(currentDate, 'days') >= 0;
      currentDate.add(1, 'd')) {
      params.dateEnd = currentDate.format('YYYY-MM-DD HH:mm:ss');
    }
    console.log('FINAL DATE:', params.dateEnd);
    next(null, params);
  } else {
    next(null, params);
  }
  console.log('ADD REPEAT PARAMS:', params);
}

function verifyTask (params, next) {
  let taskForm = [
    params.horaInicio,
    params.dateEnd,
    params.userFK
  ];
  console.log('VERIFY PARAMS:', params);
  tasksModel.verify(taskForm, (err, results) => {
    if (err) return next(err);
    results = results[2];
    next(null, results);
  });
}
