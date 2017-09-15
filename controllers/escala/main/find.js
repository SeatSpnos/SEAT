const userModel = require('models/admin').user.find;
const scaleModel = require('models/escala');
const moment = require('moment');
const async = require('async');

module.exports = {
  allScaledUsers: allScaledUsers
};

function allScaledUsers (req, res, next) {
  let params = {date: req.params.date || moment().format('YYYY-MM').concat('-01')};
  let tasks = [
    async.constant(params),
    findUsers,
    adjustUserData,
    findScale,
    findElements,
    adjustScaleData,
    adjustGroups,
    adjustDataToSend
  ];
  async.waterfall(tasks, end);

  function end (err, results) {
    if (err) return res.status(500).json(err);
    res.status(200).json(results);
  }
}

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
  scaleModel.main.find.ByDate(params.date, (err, scales) => {
    if (err) return next(err);
    params.scales = scales[1];
    next(null, params);
  });
}

function findElements (params, next) {
  scaleModel.elements.find.allScales((err, scaleElements) => {
    if (err) return next(err);
    params.elements = scaleElements;
    next(null, params);
  });
}

function adjustScaleData (params, next) {
  let scales = params.scales;
  for (let i in scales) {
    let userId = scales[i].user_FK_ID;
    let indexOfUser = params.arrayIds.indexOf(userId);
    if (indexOfUser > -1) {
      let scaleValue = {
        id: scales[i].id,
        user_FK_ID: scales[i].user_FK_ID,
        date: scales[i].date,
        value: {
          id: scales[i].scaleId,
          name: scales[i].name,
          group: scales[i].group,
          alias: scales[i].alias,
          backgroundColor: scales[i].backgroundColor,
          fontColor: scales[i].fontColor
        }
      };
      params.dataToSend[indexOfUser].escala[+scales[i].date.split('-')[2]] = scaleValue;
    }
  }
  next(null, params);
}

function adjustGroups (params, next) {
  scaleModel.elements.find.groups((err, groups) => {
    if (err) return next(err);
    params.groups = [];
    for (let i in groups) {
      let idArr = groups[i].ids.split(',');
      let namesArr = groups[i].names.split(',');
      let temp = {
        name: groups[i].group,
        elements: []
      };
      for (let j in idArr) {
        let tempObj = {
          id: idArr[j],
          name: namesArr[j]
        };
        temp.elements.push(tempObj);
      }
      params.groups.push(temp);
    }
    next(null, params);
  });
}

function adjustDataToSend (params, next) {
  let mainObject = {
    escalas: params.dataToSend,
    monthSize: moment(params.date).daysInMonth(),
    elements: params.elements,
    groups: params.groups
  };
  next(null, mainObject);
}

