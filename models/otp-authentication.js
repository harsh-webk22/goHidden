const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    } ,
    otp:{
        type : Number,
        required: true
    }
} , {
    timestamps: true
});

const otpModel = new mongoose.model('otpModel' , authSchema);
module.exports = otpModel; 