const nodemailer = require('../config/nodemailer');
const crypto  = require('crypto')

exports.forgetPassword = (user)=>{


    //creting random passwordds
    let htmlString = nodemailer.renderTemplate({password : crypto.randomBytes(10).toString('hex')} , '/forget_password.ejs');

    nodemailer.transporter.sendMail({
        from: 'Harshaggarwal060@gmail.com',
        to: user.email,
        subject: 'Your new MessageX Password',
        html:htmlString
    } , function(err , info){
        if(err){
            console.log('error in rendering msg' , err);
            return;
        }

        return console.log(info);
    });
}
