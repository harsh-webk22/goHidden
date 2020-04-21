const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/goHidden');

const db = mongoose.connection;

db.on('error' , console.error.bind(console , 'Error while connecting to db'));
db.once('open' , function(){
    console.log('Successfullt connected to db');
});


module.exports = db;