const app = require('../lib/server')();
const PORT = process.env.PORT || 8000;

app.listen(PORT, function () {
	console.log('Server running on port', PORT);
});
