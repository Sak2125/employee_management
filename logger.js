const bunyan = require('bunyan'),
    logger = bunyan.createLogger({
        name: 'employee-logger',
        streams: [{
            level: 'trace',
            stream: process.stdout,
        }],
    })

module.exports = logger;