// const escalaUpdateModel = require('../../models/escala').update;
// const escalaFindModel = require('../../models/escala').find;
const escalaInsertModel = require('../../models/escala').insert;
const moment = require('moment');

module.exports = {
  one: one,
  bulk: bulk
};

function one (req, res, next) {
  escalaInsertModel.one(req.body, function (err, results) {
    if (err) return res.status(500).json(err);
    res.status(200).json(results);
  });
}

function bulk (req, res, next) {
  let values = {
    dateBegin: req.body.dateBegin,
    dateEnd: req.body.dateEnd,
    user_FK_ID: req.body.user_FK_ID,
    value: req.body.value
  };
  let toSend = [];
  let momentBeginDate = moment(values.dateBegin);
  let momentfinalDate = moment(values.dateEnd);
  for (
    let currentDate = momentBeginDate;
    momentfinalDate.diff(currentDate, 'days') >= 0;
    currentDate.add(1, 'd')) {
    let tempArry = [values.user_FK_ID, values.value, currentDate.format('YYYY-MM-DD')];
    toSend.push(tempArry);
  }
  escalaInsertModel.bulk([toSend], (err, results) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(results);
  });
}
/* function bulk (req, res, next) {
  let values = {
    dateBegin: req.body.dateBegin,
    dateEnd: req.body.dateEnd,
    user_FK_ID: req.body.user_FK_ID,
    value: req.body.value
  };
  escalaFindModel.betweenDates(values.dateBegin, values.dateEnd, values.user_FK_ID, (err, scales) => {
    let arrayItemsToUpdate = [];
    if (err) return res.status(500).json(err);
    for (let i in scales) {
      arrayItemsToUpdate.push(scales[i].id);
    }
    escalaUpdateModel.bulk(arrayItemsToUpdate, values.value, (err, results) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(results);
    });
    let momentBeginDate = moment(values.dateBegin);
    let momentfinalDate = moment(values.dateEnd);
    let insertValues = [];
    let dates = [];
    for (
      let currentDate = momentBeginDate;
      momentfinalDate.diff(currentDate, 'days') >= 0;
      currentDate.add(1, 'd')) {
      dates.push(currentDate.format('YYYY-MM-DD'));
    }
    for (let i in dates) {
      insertValues.push([values.user_FK_ID, values.value, dates[i]]);
    }
    escalaInsertModel.bulk(insertValues, (err, results) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(results);
    });
  });
} */

 /* function bulk (req, res, next) {
  let values = {
    dateBegin: req.body.dateBegin,
    dateEnd: req.body.dateEnd,
    user_FK_ID: req.body.user_FK_ID,
    value: req.body.value
  };
  getEachData(values.dateBegin, values.dateEnd, loop, (err, rows) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(rows);
  });
  function loop (date, loopcb) {
    let formatedDate = date.format('YYYY/MM/DD');
    escalaFindModel.findByDateAndFk(formatedDate, values.user_FK_ID, (err, row) => {
      if (err) loopcb(err);
      if (row.length) {
        escalaUpdateModel.one(row[0].id, values.value, loopcb);
      } else {
        let vals = {
          user_FK_ID: values.user_FK_ID,
          date: formatedDate,
          value: values.value
        };
        escalaInsertModel.one(vals, loopcb);
      }
    });
  }
  function getEachData (dateBegin, dateEnd, loop, callback) {
    let momentBeginDate = moment(dateBegin);
    let momentfinalDate = moment(dateEnd);
    let totalDates = momentfinalDate.diff(momentBeginDate, 'days') + 1;
    let dates = [];
    for (
      let currentDate = momentBeginDate;
      momentfinalDate.diff(currentDate, 'days') >= 0;
      currentDate.add(1, 'd')) {
      loop(currentDate, cbF);
    }
    function cbF (err, value) {
      if (err) callback(err);
      dates.push(value);
      if (dates.length === totalDates) { callback(null, dates); }
    }
  }
} */
