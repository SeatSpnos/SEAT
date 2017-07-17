module.exports = {
	init: init,
	find: require('./find.js'),
	insert: require('./insert.js'),
	update: require('./update.js')
};

function init (req, res, next) {
	res.status(200).send('index')
}
