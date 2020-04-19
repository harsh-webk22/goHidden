const mongoose = require('mongoose');
 

const friendSchema = new mongoose.Schema({
    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true
    } ,
    friends :{
        type : Array
    }
});



const Friend = new mongoose.model('Friend' , friendSchema);
module.exports = Friend;