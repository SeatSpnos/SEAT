const scaleModel = require('models/escala');

module.exports = (req, res, next) => {
  let values = {
    name: req.body.name,
    alias: req.body.alias,
    group: req.body.group,
    backgroundColor: req.body.backgroundColor,
    fontColor: req.body.fontColor
  };
  let id = req.params.id;

  scaleModel.elements.update(id, values, (err, results) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(results);
  });
};
