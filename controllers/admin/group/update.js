// const model = require('models').group
//   data = {}
//   tomodel = {}
  
// module.exports = {
//   edit: edit,
//   update: update
// }

// function edit (req,res) {
//   data.title = 'Edit group'
//   tomodel.group_id = req.params.id 
//   model.find.selectOne(tomodel, function (err,rows) {
//     data.rows = rows
//     res.render('../views/pages/edit_group', data)
//   })
// }

// //Function to save the editted group
// function update (req,res) {
//   tomodel.group_name = req.body.group_name
//   tomodel.group_menu = req.body.group_menu
//   tomodel.group_submenu = req.body.group_submenu
//   tomodel.group_content = req.body.group_content
//   tomodel.group_id = req.body.group_id
//   model.update(tomodel, function (err,rows) {
//     res.redirect('/')
//   })
// }

