// const nodemailer = require('../config/nodemailer');

exports.SendOtp = (user)=>{

    //creting random passwordds
    // let htmlString = nodemailer.renderTemplate({otp : user.otp} , '/sendotp.ejs');

    // nodemailer.transporter.sendMail({
    //     from: 'mail@message-x.com',
    //     to: user.email,
    //     subject: 'Your OTP for Message-x Account',
    //     html:htmlString
    // } , function(err , info){
    //     if(err){
    //         console.log('error in rendering msg' , err);
    //         return;
    //     }
    //     return console.log(info);
    // });
}
