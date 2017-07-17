const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const userModels = require('models').users;

module.exports = function (passport) {

  passport.serializeUser(function (user, done) {
    done(null, user.id)
  });
  passport.deserializeUser(function (id, done) {
    userModels.find.byId(id, function (err, rows) {
      done(err, rows[0])
    });
  });

  passport.use(
    'local-signup',
    new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, username, password, done) {
      userModels.find.byUsername(username, function (err, user) {
        if (err) return done(err)
        else {
          const newUserMysql = {
            username: username,
            password: bcrypt.hashSync(password, null, null)
          };        
          userModels.insert.newUser(newUserMysql.username, newUserMysql.password, function (err, res) {
            newUserMysql.id = res.insertId
            return done(null, newUserMysql)
          });
        }
      });
    }));
  
  passport.use(
    'local-login',
    new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true 
    },
    function (req, username, password, done) { 
      userModels.find.byId(username, function (err, user){
        if (err) return done(err)
        if (!user.length) {
          return done(null, false, req.flash('loginMessage', 'No user found.'));
        }
        if (!bcrypt.compareSync(password, user[0].password))
          return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
        return done(null, user[0])
      });
    }));
}
