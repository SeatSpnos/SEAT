module.exports = function (request, next) {
  request
    .post('/login')
    .send({ username: 'test', password: 'test123' })
    .end(function (error, response) {
      if (error) next(error);
      next(null, response.headers['set-cookie']);
    });
};
