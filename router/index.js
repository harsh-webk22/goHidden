
const router = require('express').Router();
const passport = require('passport');
const userController = require('../controller/users_controller');


router.get('/forget-Password' , userController.forgetPassword)

router.get('/' ,passport.checkAuthentication, userController.home);

router.get('/home' ,passport.checkAuthentication, userController.home);

router.get('/sign-out' , userController.destroySession)

router.get('/signin' , userController.signIn);
router.get('/signup' , userController.signUp);




router.post('/create-account' ,userController.create);

router.post('/create-session' ,passport.authenticate(
    'local',
    {failureRedirect:'/signin'}
) , userController.createSession );


router.post('/search-user' , passport.checkAuthentication , userController.searchUserPost);

router.get('/search-user' , passport.checkAuthentication , userController.searchUser);

router.get('/users/auth/google' , passport.authenticate('google' , {scope:['profile','email']} ));

router.get('/users/auth/google/callback' , passport.authenticate(
    'google',
    {failureRedirect:'/signin'} 
    ) , userController.createSession)

router.get('/checkUsername' , userController.checkUsername)

module.exports = router;