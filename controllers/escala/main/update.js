const scaleModel = require('models/escala');

module.exports = {
  one: one
};

function one (req, res, next) {
  let id = req.params.id;
  let isnum = /^\d+$/.test(id);

  !isnum
  ? res.status(400).json(`Inserted id:'${id}' should be a number`)
  : scaleModel.main.update.one(id, req.body.value_FK_ID, function (err, results) {
    if (err) console.log(err) //return res.status(500).json(err);
    if (!results.affectedRows) return res.status(404).json(`Scale id:${id} not found`);
    res.status(200).json(results);
  });
}
