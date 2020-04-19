
const router = require('express').Router();
const passport = require('passport');
const userController = require('../controller/users_controller');


// router.use('/home' , passport.checkAuthentication)
router.get('/' ,passport.checkAuthentication, userController.home);

router.get('/home' ,passport.checkAuthentication, userController.home);

router.get('/sign-out' , userController.destroySession)

router.get('/signin' , userController.signIn);
router.get('/signup' , userController.signUp);




// router.get('/search-user' , function(req , res){
//     console.log(req.query.name);

// })


router.post('/create-account' ,userController.create);

router.post('/create-session' ,passport.authenticate(
    'local',
    {failureRedirect:'/signin'}
) , userController.createSession );



router.post('/search-user' , passport.checkAuthentication , userController.searchUserPost);

router.get('/search-user' , passport.checkAuthentication , userController.searchUser);


module.exports = router;