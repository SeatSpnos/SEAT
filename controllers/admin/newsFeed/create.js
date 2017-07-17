const fs = require('fs');
const model = require('models');
const async = require('async');

module.exports = function (req, res, next) {
  let opts = {
    req: req,
    res: res,
    data: {
      title: req.body.Title,
      text: req.body.about,
      priority: req.body.priority,
      required: req.body.required,
      group: req.body.group,
      category: req.body.category,
      tags: req.body.tags,
      attachment: '',
      expireDate: req.body.dateEnd
    }
  };

  const tasks = [
    async.constant(opts),
    init,
    isEdit,
    selectUsers,
    addToUsers,
    category,
    tags,
    render
  ];

  async.waterfall(tasks, after);

  function after (err, data) {
    if (err) return next(err);

    next(null, data);
  }
};

function init (params, next) {
  if (params.req.files.length) {
    params.data.attachment = '/uploads/' + params.req.files[0].originalname;
    rename(params.req.files);
  }

  params.data.tags2 = params.data.tags;
  params.data.tags = '#' + params.data.tags.join('#');

  model.newFeed.insert(params.data, function (err, result) {
    if (err) next(err);
    params.insertedMessageId = result.insertId;
    next(null, params);
  });
}

function isEdit (params, next) {
  if (!(params.req.body.isEdit === 'false')) {
    model.newFeed.inactive(params.req.body.isEdit, function (err, rows) {
      if (err) next(err);

      next(null, params);
    });
  } else {
    next(null, params);
  }
}

function selectUsers (params, next) {
  if (!(params.data.group === 'Todos')) {
    model.user.allG(params.data.group, function (err, users) {
      if (err) next(err);
      params.users = users;
      next(null, params);
    });
  } else {
    model.user.all(function (err, users) {
      if (err) next(err);
      params.users = users;
      next(null, params);
    });
  }
}

function addToUsers (params, next) {
  async.each(params.users, add, end);

  function add (user, callback) {
    if (user.id !== params.req.user.id) {
      model.userMsg.insert(params.insertedMessageId, user.id, function (err, data) {
        if (err) next(err);
        callback();
      });
    } else {
      model.userMsg.insertRead(params.insertedMessageId, user.id, function (err, data) {
        if (err) next(err);
        callback();
      });
    }
  }

  function end () {
    next(null, params);
  }
}

function category (params, next) {
  model.newFeed.categoryFindOne(params.data.category, function (err, rows) {
    if (err) next(err);
    if (rows.length) next(null, params);
    else {
      model.newFeed.categoryAdd(params.data.category, function (err, rows) {
        if (err) next(err);
        next(null, params);
      });
    }
  });
}

function tags (params, next) {
  async.each(params.data.tags2, loop, end);

  function loop (tag, callback) {
    model.newFeed.tagsFindOne(tag, function (err, rows) {
      if (err) next(err);
      if (rows.length) callback();
      else {
        model.newFeed.tagsAdd(tag, function (err, rows) {
          if (err) next(err);
          callback();
        });
      }
    });
  }

  function end (err) {
    if (err) next(err);
    next(null, params);
  }
}

function render (params, next) {
  params.res.redirect('/');
}

function rename (files) {
  fs.rename('./public/uploads/' + files[0].filename, './public/uploads/' + files[0].originalname, function (err) {
    if (err) console.log('ERROR: ' + err);
  });
}
