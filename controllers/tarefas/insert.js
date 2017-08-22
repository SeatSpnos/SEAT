const tarefasModel = require('../../models/tarefas');

module.exports = (req, res, next) => {
  let id = req.body.tarefaID;
  let values = {
    horaInicio: req.body.horaInicio,
    repeat: req.body.repeat,
    until: req.body.until,
    duracao: req.body.duracao,
    tarefa: req.body.tarefa,
    userFK: req.body.userFK
  };
  tarefasModel.find.byUserFK(values.userFK, (err, users) => {
    if (err) return res.status(500).json(err);
    if (!users.length) {
      tarefasModel.insert(values, (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(results);
      });
    } else {
      tarefasModel.update(id, values, (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(results);
      });
    }
  });
};
