const userModel = require('models/admin').user.find;
const scaleModel = require('models/escala').find;
const moment = require('moment');
const async = require('async');

module.exports = (req, res, next) => {
  let params = {date: req.params.date || moment().format('YYYY-MM').concat('-01')};
  let tasks = [
    async.constant(params),
    findUsers,
    adjustUserData,
    findScale,
    adjustScaleData
  ];
  async.waterfall(tasks, end);

  function end (err, results) {
    if (err) return res.status(500).json(err);
    res.status(200).json(results);
  }
};

function findUsers (params, next) {
  userModel.allActiveUsersConcatedName((err, users) => {
    if (err) return next(err);
    params.users = users;
    next(null, params);
  });
}

function adjustUserData (params, next) {
  params.arrayIds = [];
  params.dataToSend = [];
  let users = params.users;

  for (let i in users) {
    params.arrayIds.push(users[i].id);
    let tempObj = {
      user: {
        id: users[i].id,
        name: users[i].name
      },
      escala: []
    };
    params.dataToSend.push(tempObj);
  }
  next(null, params);
}

function findScale (params, next) {
  scaleModel.findByDate(params.date, (err, scales) => {
    if (err) return next(err);
    params.scales = scales[1];
    next(null, params);
  });
}

function adjustScaleData (params, next) {
  let scales = params.scales;

  for (let i in scales) {
    let userId = scales[i].user_FK_ID;
    let indexOfUser = params.arrayIds.indexOf(userId);

    if (indexOfUser > -1) {
      params.dataToSend[indexOfUser].escala[+scales[i].date.split('-')[2]] = scales[i];
    }
  }

  let mainObject = {
    escalas: [],
    monthSize: 0
  };

  mainObject.escalas = params.dataToSend;
  mainObject.monthSize = moment(params.date).daysInMonth();

  next(null, mainObject);
}

/* (req, res, next) => {
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
          name: users[i].name
        },
        escala: []
      };
      dataToSend.push(tempObj);
    }
    scaleModel.findByDate(date, (err, scales) => {
      if (err) return res.status(500).json(res);
      scales = scales[1];
      for (let i in scales) {
        let userId = scales[i].user_FK_ID;
        let indexOfUser = arrayIds.indexOf(userId);

        if (indexOfUser > -1) {
          dataToSend[indexOfUser].escala[+scales[i].date.split('-')[2]] = scales[i];
        }
      }
      let mainObject = {
        escalas: [],
        monthSize: 0
      };

      mainObject.escalas = dataToSend;
      mainObject.monthSize = moment(date).daysInMonth();
      res.status(200).json(mainObject);
    });
  });
}; */
