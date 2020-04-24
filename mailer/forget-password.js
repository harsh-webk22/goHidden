const nodemailer = require('../config/nodemailer');
const crypto  = require('crypto')

exports.forgetPassword = (user)=>{

    //creting random passwordds
    let htmlString = nodemailer.renderTemplate({password : user.password} , '/forget_password.ejs');

    nodemailer.transporter.sendMail({
        from: 'mail@message-x.com.com',
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
