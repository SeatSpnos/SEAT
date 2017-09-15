
const equipmentStateModel = require('models').equipmentstate;

module.exports = find;

function find (req, res, next) {
  equipmentStateModel.main.find.all((err, table) => {
    if (err) return res.status(500).json(err);
    if (!table.length) return res.status(404).json('No items found');
    equipmentStateModel.main.find.allAuxTables((err, auxTables) => {
      if (err) return res.status(500).json(err);
      if (!auxTables.length) return res.status(404).json('No items found');
      res.status(200).json({table: table, auxTables: auxTables});
    });
  });
}
