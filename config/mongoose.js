const mongoose = require('mongoose');
mongoose.connect('mongodb://http://15.206.74.7/goHidden');

const db = mongoose.connection;

db.on('error' , console.error.bind(console , 'Error while connecting to db'));
db.once('open' , function(){
    console.log('Successfullt connected to db');
});


module.exports = db;