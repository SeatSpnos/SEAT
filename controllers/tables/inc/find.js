const incModel = require('models').inc;
module.exports = function (req, res, next) {
  incModel.byOt(req.params.value, function (err, inc) {
    if (err) return res.status(500).json(err);
    if (!inc.length) return res.status(404).json(err);
    res.status(200).json(inc);
  });
};
