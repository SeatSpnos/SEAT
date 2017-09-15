const equipmentStateModel = require('models').equipmentstate;
const validateObj = require('./validate.js');

module.exports = update;

function update (req, res, next) {
  let toSend = {};
  validateObj(req.body, (err, obj) => {
    if (err) return res.status(500).json(err);
    toSend = obj;
  });
  equipmentStateModel.main.update(res.params.id, toSend, (err, rows) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(rows);
  });
}
