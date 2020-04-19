const nodemailer = require('../config/nodemailer')


exports.forgetPassword = (user)=>{
    nodemailer.transporter.sendMail({
        from: 'harshaggarwal060@gmail.com',
        to: user.email , 
        subjet:'Your new MessageX Password',
        html:'<h1>yes yyou got it</h1>'
    } , function(err , info){
        if(err){
            console.log('error in senduing the mail ', err);
            return;
        }

        console.log(info)
    })
}