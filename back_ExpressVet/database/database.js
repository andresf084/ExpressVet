const mongoose = require('mongoose'),
config = require('../configuration/config')

mongoose.connect(config.Urldb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log("Connect to DB in Atlas2"))
    .catch(err => console.log(err))

module.exports = mongoose