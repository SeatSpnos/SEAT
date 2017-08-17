const escalaUpdateModel = require('../../models').escala.update;

module.exports = {
  one: one
};

function one (req, res, next) {
  let id = req.params.id;
  let isnum = /^\d+$/.test(id);
  if (isnum === false) {
    res.status(400).json(`Inserted id:'${id}' should be a number`);
  } else {
    escalaUpdateModel.one(id, req.body.value, function (err, results) {
      if (results.affectedRows === 0) {
        return res.status(404).json(` Database has no user with the id '${id}' `);
      } else {
        if (err) return res.status(500).json(err);
        res.status(200).json(results);
      }
    });
  }
}
