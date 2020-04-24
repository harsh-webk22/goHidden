const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const Users = require('../models/users');

passport.use(new googleStrategy({
        clientID:"325818279502-a4c9pf3894f5fd7iinhovmvde37ot9in.apps.googleusercontent.com",
        clientSecret:"i2PkWCkH9k6rwkdUKlxg8DWH",
        callbackURL:'http://localhost:4000/users/auth/google/callback'
    }, function(accessToken , refreshToken , profile , done){
        Users.findOne({email:profile.emails[0].value}).exec(function(err , user){
            if(err){
                console.log(err);
                return;
            }
            if(user){
                return done(null , user);
            } else{

                let username = profile.emails[0].value.split('@')
                Users.create({
                    email: profile.emails[0].value.toLowerCase(),
                    name: profile.displayName,
                    username : username[0].toLowerCase(),
                    password:crypto.randomBytes(20).toString('hex')
                } , function(err , user){
                    if(err){
                        console.log(err);
                        return;
                    }
                    return done(null , user)
                })
            }
        })
    } 
));


module.exports = passport;