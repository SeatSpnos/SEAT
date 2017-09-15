const scaleModel = require('models/escala');

module.exports = (req, res, next) => {
  let id = req.params.id;
  scaleModel.elements.delete(id, (err, results) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(results);
  });
};
