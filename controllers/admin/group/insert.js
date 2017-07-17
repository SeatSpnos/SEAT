const model = require('models').group
  data = {}
  tomodel = {}
  
module.exports = {
  form: form,
  addGroup: addGroup
};

function form (req, res){
  data.title = 'Add New group'
  res.render('../view/pages/new_group', data)
}

function addGroup (req, res){
  tomodel.group_name = req.body.group_name
  tomodel.group_menu = req.body.group_menu
  tomodel.group_submenu = req.body.group_submenu
  tomodel.group_content = req.body.group_content
  model.insert(tomodel,function(err, rows){
    res.redirect('/')
  })
}


