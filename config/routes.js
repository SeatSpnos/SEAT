const controller = require('controllers');
const middlewares = require('middlewares');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });
const async = require('async');
const routes = require('../routes');
const permissionAdmin = ['Admin'];
const permissionCoord = permissionAdmin.concat(['Coordenação']);
const permissionSupervisor = permissionCoord.concat(['Supervisor']);
const permissionPivot = permissionSupervisor.concat(['Pivot']);
const permissionOperation = permissionPivot.concat(['Operador']);
const permissionIntervention = permissionOperation.concat(['Gestao de intervencao']);
const permissionSVE = permissionSupervisor.concat(['SVE']);
module.exports = function (app, passport) {
  // Routes+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // ***** API *****
  app.get('/callsArchive', isLoggedIn, hasPermission(permissionAdmin), controller.calls.archiveInit);
  app.get('/wallboard/totalSum', isLoggedIn, hasPermission(permissionSupervisor), controller.wallboard.totalSum.init);
  app.post('/api/orderError/create/', middlewares.isLoggedIn, middlewares.hasPermission(permissionOperation), controller.orderError.create);
  app.get('/API/inc/find/:value', controller.incstate.find);
  app.get('/API/ots/find/:key.:value', middlewares.isLoggedIn, middlewares.hasPermission(permissionOperation), controller.ots.find);
  app.get('/API/calls/find/:dateBegin.:dateEnd', middlewares.isLoggedIn, middlewares.hasPermission(permissionAdmin), controller.calls.find.options);
  app.get('/API/calls/find/excel/:dateBegin.:dateEnd', middlewares.isLoggedIn, middlewares.hasPermission(permissionAdmin), controller.calls.find.excel);
  app.get('/totalSum/find/', middlewares.isLoggedIn, middlewares.hasPermission(permissionSupervisor), controller.wallboard.totalSum.find);
  app.get('/API/menu/find', middlewares.isLoggedIn, controller.menus.menu);
  app.get('/API/submenu/find/:id', middlewares.isLoggedIn, controller.menus.submenu);
  // *****     *****
  app.get('/otsToBurn', middlewares.isLoggedIn, middlewares.hasPermission(permissionPivot), controller.otsToBurn.init);
  app.get('/otsToBurn/find/obs/:ot', middlewares.isLoggedIn, middlewares.hasPermission(permissionPivot), controller.otsToBurn.find.obs);
  app.get('/otsToBurn/find/daily', middlewares.isLoggedIn, middlewares.hasPermission(permissionPivot), controller.otsToBurn.find.daily);
  app.get('/otsToBurn/find/cleaned', middlewares.isLoggedIn, middlewares.hasPermission(permissionPivot), controller.otsToBurn.find.cleaned);
  app.get('/otsToBurn/find/history/:dateBegin.:dateEnd', middlewares.isLoggedIn, middlewares.hasPermission(permissionPivot), controller.otsToBurn.find.history);
  app.get('/otsToBurn/find/id/:ot', middlewares.isLoggedIn, middlewares.hasPermission(permissionPivot), controller.otsToBurn.find.id);
  app.get('/otsToBurn/find/extra/:ot', middlewares.isLoggedIn, middlewares.hasPermission(permissionPivot), controller.otsToBurn.find.extra);
  app.post('/otsToBurn/clean', middlewares.isLoggedIn, middlewares.hasPermission(permissionPivot), controller.otsToBurn.insert.cleaned);
  app.post('/otsToBurn/obs', middlewares.isLoggedIn, middlewares.hasPermission(permissionPivot), controller.otsToBurn.insert.obs);
  // User+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/user', isLoggedIn, hasPermission(permissionSupervisor), controller.user.find);
  app.post('/newUser', isLoggedIn, hasPermission(permissionSupervisor), controller.user.create);
  app.get('/newUser', isLoggedIn, hasPermission(permissionSupervisor), controller.user.add);
  app.post('/user_edit', isLoggedIn, hasPermission(permissionSupervisor), controller.user.edit);
  app.post('/user_update', isLoggedIn, hasPermission(permissionSupervisor), controller.user.update);
  app.post('/user_reset', isLoggedIn, hasPermission(permissionSupervisor), controller.user.reset);
  app.post('/user_inactive', isLoggedIn, hasPermission(permissionSupervisor), controller.user.remove);
  // app.post('/user_newPassword', isLoggedIn, hasPermission(permissionCoord), controller.user.newPassword);
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // KM_Link ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/km_link', isLoggedIn, hasPermission(permissionOperation), controller.km.link.find);
  app.post('/km_link_insert', isLoggedIn, hasPermission(permissionOperation), controller.km.link.create);
  app.post('/km_link_edit', isLoggedIn, hasPermission(permissionOperation), controller.km.link.edit);
  app.post('/km_link_update', isLoggedIn, hasPermission(permissionOperation), controller.km.link.update);
  app.post('/km_link_updateHits', isLoggedIn, hasPermission(permissionOperation), controller.km.link.updateHits);
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // TDS++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/getInfo', controller.TDS.getPdf);
  app.get('/tds', isLoggedIn, hasPermission(permissionOperation), controller.TDS.find);
  app.get('/tds_parceiros', isLoggedIn, hasPermission(permissionOperation), controller.TDS.findParceiros);
  app.get('/tds_ots', isLoggedIn, hasPermission(permissionOperation), controller.TDS.findOTS);
  app.get('/tds_client', isLoggedIn, hasPermission(permissionOperation), controller.TDS.findClient);
  app.post('/tds_insert', isLoggedIn, hasPermission(permissionOperation), controller.TDS.insert);
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // KM_Contacts++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/km_contacts', isLoggedIn, hasPermission(permissionOperation), controller.km.contacts.find);
  app.get('/km_contacts_json', isLoggedIn, hasPermission(permissionOperation), controller.km.contacts.json);
  app.post('/km_contact_add', isLoggedIn, hasPermission(permissionOperation), controller.km.contacts.save);
  app.post('/km_contacts_hierarchy', isLoggedIn, hasPermission(permissionOperation), controller.km.contacts.findHierarchy);

  // KM_Diagram Flow++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/km_diagflow', isLoggedIn, hasPermission(permissionOperation), controller.km.diagflow.find);
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // New Feed+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/newFeed', isLoggedIn, hasPermission(permissionSupervisor), controller.newFeed.find);
  app.post('/newFeed', isLoggedIn, hasPermission(permissionSupervisor), upload.array('datafile'), controller.newFeed.create);
  app.post('/newFeed_inactive', isLoggedIn, hasPermission(permissionSupervisor), controller.newFeed.inactive);
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // News Feed +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/mainpage', isLoggedIn, controller.newsfeed.find);
  app.post('/newFeed_read', isLoggedIn, controller.newsfeed.update);
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // ARCHIVE+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/archive', isLoggedIn, controller.messages.arquive.find);
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

   // Calls+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/calls', middlewares.isLoggedIn, middlewares.hasPermission(permissionOperation), controller.calls.init);
  app.get('/calls_getot', middlewares.isLoggedIn, middlewares.hasPermission(permissionOperation), controller.calls.find.ot);
  app.get('/calls_getNClient', middlewares.isLoggedIn, middlewares.hasPermission(permissionOperation), controller.calls.find.cs);
  app.get('/calls_getOtHistory', middlewares.isLoggedIn, middlewares.hasPermission(permissionOperation), controller.calls.find.otHistorySendJson);
  app.post('/calls', middlewares.isLoggedIn, middlewares.hasPermission(permissionOperation), controller.calls.insert);
  app.post('/calls/update', middlewares.isLoggedIn, middlewares.hasPermission(permissionOperation), upload.array('datafile'), controller.calls.update.close);
  app.put('/calls/automatic', middlewares.isLoggedIn, middlewares.hasPermission(permissionOperation), controller.calls.update.automatic);
  app.get('/calls/render/otHistory', middlewares.isLoggedIn, middlewares.hasPermission(permissionOperation), controller.calls.render.otHistory);
  app.get('/calls/render/clientHistorySelect', middlewares.isLoggedIn, middlewares.hasPermission(permissionOperation), controller.calls.render.clientHistorySelect);
  app.get('/calls/render/itemsInfo', middlewares.isLoggedIn, middlewares.hasPermission(permissionOperation), controller.calls.render.itemsInfo);
 // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // Homepage+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/', isLoggedIn, controller.home);
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/test', function (req, res) {
    res.render('../views/pages/teste');
  });
  // INC State+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/incstate', isLoggedIn, hasPermission(permissionOperation), controller.incstate.find);
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // app.get('/kpi', isLoggedIn ,hasPermission(permissionOperation), controller.kpi)

  // Registo INC++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/registo_inc', isLoggedIn, hasPermission(permissionIntervention), controller.registo_inc.find);
  app.post('/registo_inc_get', isLoggedIn, hasPermission(permissionIntervention), controller.registo_inc.find);
  app.post('/registo_inc_submit', isLoggedIn, hasPermission(permissionIntervention), controller.registo_inc.submit);
  app.post('/registo_inc_getvalue', isLoggedIn, hasPermission(permissionIntervention), controller.registo_inc.create);
  app.post('/inc_remove', isLoggedIn, hasPermission(permissionIntervention), controller.registo_inc.del);
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // Wallboard++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/wallboard', isLoggedIn, hasPermission(permissionOperation), controller.wallboard.ots.getAll);
  app.post('/wallboard_edit', isLoggedIn, hasPermission(permissionOperation), controller.wallboard.ots.edit);
  app.post('/wallboard_update', isLoggedIn, hasPermission(permissionOperation), controller.wallboard.ots.update);
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // Wallboard++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/wallboard_ci', isLoggedIn, hasPermission(permissionOperation), controller.wallboard.ci.find);
  app.post('/wallboard_ci_edit', isLoggedIn, hasPermission(permissionOperation), controller.wallboard.ci.edit);
  app.post('/wallboard_ci_update', isLoggedIn, hasPermission(permissionOperation), controller.wallboard.ci.update.done);
  app.post('/wallboard_ci_assign', isLoggedIn, hasPermission(permissionOperation), controller.wallboard.ci.update.assign);
  app.post('/wallboard_ci_add', isLoggedIn, hasPermission(permissionOperation), controller.wallboard.ci.add);
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // Wallboard INC++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/wallboard_inc', isLoggedIn, hasPermission(permissionIntervention), controller.wallboard.inc.find);
  app.post('/wallboard_inc_edit', isLoggedIn, hasPermission(permissionIntervention), controller.wallboard.inc.edit);
  app.post('/wallboard_inc_update', isLoggedIn, hasPermission(permissionIntervention), controller.wallboard.inc.update);
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // Wallboard SUPPORT++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/wallboard_support', isLoggedIn, hasPermission(permissionSVE), controller.wallboard.support.find);
  app.post('/wallboard_support_edit', isLoggedIn, hasPermission(permissionSVE), controller.wallboard.support.edit);
  app.post('/wallboard_support_update', isLoggedIn, hasPermission(permissionSVE), controller.wallboard.support.update);
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // Wallboard Total++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/wallboard_total', isLoggedIn, hasPermission(permissionOperation), controller.wallboard.total.getAll);
  app.post('/wallboard_total_datefilter', isLoggedIn, hasPermission(permissionOperation), controller.wallboard.total.getAllDate);
  app.post('/wallboard_total_spfilter', isLoggedIn, hasPermission(permissionOperation), controller.wallboard.total.getAllSP);

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // Wallboard Total++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/wallboard_calls', isLoggedIn, hasPermission(permissionOperation), controller.wallboard.calls.find);
   // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/firstLogIn', isLoggedIn, firstLogIn, hasPermission(permissionOperation), controller.home);

  // app.post('/bulkinsert',isLoggedIn,controller.bulkinsert.create)
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // Escala ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.use('/escala', routes.escala);
  // app.post('/bulkinsert',isLoggedIn,controller.bulkinsert.create)
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // Tarefas ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.use('/tarefas', routes.tarefas);
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // dumpSEA ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.use('/dumpSEA', routes.dumpSEA);
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // wallboards ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.use('/wallboards', routes.wallboards);
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // wallboards ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.use('/tables', routes.tables);
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  /*
  // Login++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/login', controller.passport.login)
  app.post('/login', controller.passport.loginA)
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // Signup+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/signup', controller.passport.signup)
  app.post('/signup', controller.passport.signupA)
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // Profile++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/profile', controller.passport.profile)
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // News Feed++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/mainpage', controller.newsfeed.page)
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // Logout+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  app.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/')
  })
 // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/
  // =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form
  app.get('/login', function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render('./pages/login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/firstLogIn', // redirect to the secure profile section
    failureRedirect: '/login',   // redirect back to the signup page if there is an error
    failureFlash: true          // allow flash messages
  }),
    function (req, res) {
      console.log('hello');

      if (req.body.remember) {
        req.session.cookie.maxAge = 1000 * 60 * 60 * 4;
      } else {
        req.session.cookie.expires = false;
      }
      res.redirect('/');
    });

  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  app.get('/signup', function (req, res) {
    // render the page and pass in any flash data if it exists
    res.render('./pages/newPassword', {message: req.flash('signupMessage')});
  });

  // process the signup form
  app.post('/signup',
    passport.authenticate('local-signup', {
      successRedirect: '/mainpage',  // redirect to the secure profile section
      failureRedirect: '/login',  // redirect back to the signup page if there is an error
      failureFlash: true          // allow flash messages
    }));

  // =====================================
  // PROFILE SECTION =========================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/profile', isLoggedIn, function (req, res) {
    res.render('./pages/profile.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  });

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });
};

function isLoggedIn (req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect('/login');
}

function hasPermission (permissions) {
  return function checkPermission (req, res, next) {
    var hasP = false;

    async.each(permissions, function (permission, callback) {
      if (req.user.group_permission === permission) hasP = true;

      callback();
    }, function (err, data) {
      if (err) next(err);
      console.log(req.user.username);

      if (req.user.required === 'true') hasP = false;
      if (hasP) next();
      else res.redirect('/mainpage');
    });
  };
}

function firstLogIn (req, res, next) {
  if ((req.user.firstLogIn !== 'True')) return next();

  res.render('./pages/newPassword', {message: req.flash('signupMessage'), username: req.user.username});
}
/* function hasRead (req, res, next) {
  if (req.body.readContent === 'sim') return next();

  res.redirect('/mainpage');
} */
