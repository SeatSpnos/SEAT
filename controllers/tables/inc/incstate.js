const model = require('models').wallboard_inc
const navbar = require('controllers/navbar').navbar
const colName = ["Numero Cliente", "SP", "OT", "Data OT", "Nome Cliente", "Telefone Cliente", "Data de contacto", "Assunto", "Observacoes","INC", "Estado", "Operador", "Serviço", "Sub-Assunto","Descrição", "Detalhes", "SLA", "Data Abertura", "Data Fecho", "Δ Total" , "Δ Util", "Estado OT", "Resultado OT", "Descrição OT"]
  
module.exports = {
  find: list
};

function list (req, res, next) {
  model.state(function (err, table) {
    if (err) next(err);
    navbar(function(err,navMenu){
      if (err) next(err);      
      res.render('pages/incstate', { 
        tables: table, 
        navmenu: navMenu, 
        user: req.user, 
        colName: colName
      });
    });
  });
}
