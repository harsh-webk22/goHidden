const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('../models/users');


passport.use(new LocalStrategy({
    usernameField : 'email'
} , function(email , password , done){
    Users.findOne({email:email} , function(err , user){
        if(err){
            console.log('Error --> Passport');
            return done(err);
        }

        if(!user || user.password!=password){
            console.log('fuck off');
            return done(null , false);
        }
        
        return done(null , user);
    });
}));



passport.serializeUser(function(user, done){
    return done(null , user.id);
});


passport.deserializeUser(function(id , done){
    Users.findById(id , function(err , user){
        if(err){
            console.log('Error in finding user--> Passport');
            return;
        }

        return done(null , user);
    });
});



passport.checkAuthentication = function(req , res , next){
    if(req.isAuthenticated()){
        next();
    } else{
        res.redirect('/signin');
    }
    
}



passport.setAuthenticatedUser = function(req, res , next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    return next();
}



module.exports = passport;