const tarefasModel = require('models/tarefas');
const moment = require('moment');
const async = require('async');

module.exports = (req, res, next) => {
  let params = {
    dateBegin: req.body.dateBegin || moment().format('YYYY-MM-DD HH:mm:ss'),
    repeat: req.body.repeat,
    until: req.body.until,
    duracao: req.body.duracao,
    taskValue: req.body.taskValue,
    userFK: req.body.userFK
  };

  let tasks = [
    async.constant(params),
    getDuration,
    getRepeat,
    insertTasks
  ];
  async.waterfall(tasks, end);

  function end (err, results) {
    if (err) return res.status(500).json(err);
    res.status(200).json(results);
  }
};

function getDuration (params, next) {
  let timeToAdd = 30;
  if (params.duracao > 0) {
    timeToAdd = 30 * params.duracao;
  }
  let currentDate = moment(params.dateBegin).add(timeToAdd, 'm');
  params.dateBegin = currentDate.format('YYYY-MM-DD HH:mm:ss');
  next(null, params);
}

function getRepeat (params, next) {
  let toSend = [];
  let tempArry = [];
  if (params.repeat > 0) {
    let momentBeginDate = moment(params.dateBegin);
    let momentfinalDate = moment(params.until);
    for (
    let currentDate = momentBeginDate;
    momentfinalDate.diff(currentDate, 'days') >= 0;
    currentDate.add(1, 'd')) {
      tempArry = [params.userFK, params.taskValue, currentDate.format('YYYY-MM-DD HH:mm:ss')];
      toSend.push(tempArry);
    }
  } else {
    tempArry = [params.userFK, params.taskValue, params.dateBegin];
    toSend.push(tempArry);
  }
  params = toSend;
  next(null, params);
}

function insertTasks (params, next) {
  tarefasModel.main.insert([params], (err, results) => {
    if (err) return next(err);
    next(null, results);
  });
}

  /*
  if (values.duracao > 0) {
    let timeToAdd = 30 * values.duracao;
    let currentDate = moment(values.dateBegin).add(timeToAdd, 'm');
    let tempArry = [values.userFK, values.taskValue, currentDate.format('YYYY-MM-DD HH:mm:ss')];
    toSend.push(tempArry);
    tarefasModel.insert([toSend], (err, results) => {
      if (err) return res.status(500).json(err);
      next(null, results);
    });
  } if (values.repeat > 0) {
    let momentBeginDate = moment(values.dateBegin);
    let momentfinalDate = moment(values.until);
    for (
      let currentDate = momentBeginDate;
      momentfinalDate.diff(currentDate, 'days') >= 0;
      currentDate.add(1, 'd')) {
      let tempArry = [values.userFK, values.taskValue, currentDate.format('YYYY-MM-DD HH:mm:ss')];
      toSend.push(tempArry);
    }
    tarefasModel.insert([toSend], (err, results) => {
      if (err) return res.status(500).json(err);
      next(null, results);
    });
  } else {
    toSend.push([values.userFK, values.taskValue, values.dateBegin]);
    tarefasModel.insert([toSend], (err, results) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(results);
    });
  }
};
*/
