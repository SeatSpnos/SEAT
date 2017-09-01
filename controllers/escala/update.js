const escalaUpdateModel = require('../../models').escala.update;

module.exports = {
  one: one
};

function one (req, res, next) {
  let id = req.params.id;
  let isnum = /^\d+$/.test(id);

  !isnum
  ? res.status(400).json(`Inserted id:'${id}' should be a number`)
  : escalaUpdateModel.one(id, req.body.value, function (err, results) {
    if (err) return res.status(500).json(err);
    if (!results.affectedRows) return res.status(404).json(`Scale id:${id} not found`);
    res.status(200).json(results);
  });
}
