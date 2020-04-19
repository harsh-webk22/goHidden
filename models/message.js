const mongoose = require('mongoose');

const messageSchema  = new mongoose.Schema({
    message :{
        type: String,
        required: true
    } ,

    sentTo :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    
    sentBy :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    } , 
    visible:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
    
} ,{
    timestamps: true
});


const Message = new mongoose.model('Message' , messageSchema);
module.exports = Message;
