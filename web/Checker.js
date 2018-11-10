var tcpp = require('tcp-ping');

class Checker {
	constructor(app) {
		this.app = app
	}

	checkLoginServer(callback) {
		tcpp.probe(this.app.CONFIG.MS_LOGIN_IP, this.app.CONFIG.MS_LOGIN_PORT, (err, status) => {
			callback(status)
		});

	}
}

module.exports = {Checker: Checker};