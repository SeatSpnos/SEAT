const scaleModel = require('models/escala').elements;
// const async = require('async');

module.exports = {
  allScales: allScales
};

function allScales (req, res, next) {
  scaleModel.find.allScales((err, results) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(results);
  });
}

/*
function groups (req, res, next) {
  let params = [];
  let tasks = [
    async.constant(params),
    adjustGroups
  ];

  async.waterfall(tasks, end);

  function end (err, results) {
    if (err) res.status(500).json(err);
    res.status(200).json(results);
  }
}

function adjustGroups (params, next) {
  scaleModel.find.groups((err, groups) => {
    let toSend = {};
    if (err) return next(err);
    console.log('GRPS', groups);
    for (let i in groups) {
      let idArr = groups[i].ids.split(',');
      let namesArr = groups[i].names.split(',');
      let groupName = groups[i].group.split(',');
      for (let y in groupName) {
        toSend = {
          group: groupName[y],
          elements: []
        };
      }
      for (let j in idArr) {
        let tempObj = {
          id: idArr[j],
          names: namesArr[j]
        };
        toSend.element.push(tempObj);
      }
      params.push(toSend);
    }
    next(null, params);
  });
}
*/
