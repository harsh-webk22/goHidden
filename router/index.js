
const router = require('express').Router();
const passport = require('passport');
const userController = require('../controller/users_controller');

router.get('/' ,passport.checkAuthentication, userController.home);



router.get('/forget-Password' , userController.forgetPassword);
router.get('/createOTP' , userController.createOTP);

router.get('/authenticateOTP' ,userController.authenticateOTP)

router.get('/aboutus' , userController.aboutus)

router.get('/feedback' , userController.feedback)

router.get('/home' ,passport.checkAuthentication, userController.home);

router.get('/sign-out' , userController.destroySession)

router.get('/signin' , userController.signIn);
router.get('/signup' , userController.signUp);


router.post('/create-account' ,userController.create);

router.post('/create-session' ,passport.authenticate(
    'local',
    {failureRedirect:'/signin'}
) , userController.createSession );



router.get('/users/auth/google' , passport.authenticate('google' , {scope:['profile','email']} ));

router.get('/users/auth/google/callback' , passport.authenticate(
    'google',
    {failureRedirect:'/signin'} 
    ) , userController.createSession)

router.get('/checkUsername' , userController.checkUsername)



router.post('/search-user' , passport.checkAuthentication , userController.searchUserPost);


router.get('/:id' , passport.checkAuthentication , userController.searchParam)


module.exports = router;