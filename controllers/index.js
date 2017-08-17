
module.exports = {
  // Admin
  group: require('./admin').group,
  user: require('./admin').user,
  newFeed: require('./admin').newFeed,

  // Inc
  registo_inc: require('./inc'),

  // Main pages
  newsfeed: require('./mainpages').newsfeed,
  home: require('./mainpages').home,

  // Tables
  equipmentstate: require('./tables').equipmentstate,
  incstate: require('./tables').incstate,

  // Wallboards
  wallboard: require('./wallboard'),
  // KM
  km: require('./km'),

  messages: require('./messages'),
  TDS: require('./TDS'),

  calls: require('./calls'),
  orderError: require('./orderError'),
  ots: require('./ots'),
  otsToBurn: require('./otsToBurn'),
  // ESCALA
  escala: require('./escala'),
  // TAREFAS
  tarefas: require('./tarefas')
};
