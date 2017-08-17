const userModel = require('models/admin').user.find;
const scaleModel = require('models/escala').find;
const moment = require('moment');

module.exports = (req, res, next) => {
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
        dataToSend[indexOfUser].escala = scales[i];
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
};
