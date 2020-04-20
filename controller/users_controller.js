const Users= require('../models/users');
const Message = require('../models/message')
const forgetPasswordMailer = require('../mailer/forget-password');
const passport = require('passport');

//render sign in page
module.exports.signIn = (req, res)=>{
    if(req.isAuthenticated()){
        res.redirect('back');
        return;
    }

    res.render('sign_in');
};

//render sign up page
module.exports.signUp = (req,res) => {
    res.render('sign_up');
}

module.exports.home = async function(req,res){
    let msg = [];
    try {

        // to show the name only once we need too sort message first

    
        // this sorting is for not visible contacts
         msg = await Message.find({sentBy : req.user.id , visible:{$ne : req.user.id}}).populate('sentBy').populate('sentTo');
        let temp = await Message.find({sentTo : req.user.id ,visible:{$ne : req.user.id}}).populate('sentBy').populate('sentTo');
        msg = msg.concat(temp);
    
       
        
        msg.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.createdAt) - new Date(a.createdAt);
        });


        let people = [];
        // to get the conversatio for only oncw
        for(let i of msg){
            var tr = false;
            for(let j of people){
                if(((j.sentBy.email == i.sentBy.email) && (j.sentTo.email == i.sentTo.email))||  ((j.sentBy.email == i.sentTo.email )&& (j.sentTo.email == i.sentBy.email))){
                    tr=true;
                    break;
                }
            }

            if(tr==false){
                people.push(i);
            }
        }

       
        // this sorting is for visiblr constacts

        msg = await Message.find({sentBy : req.user.id , visible: req.user.id}).populate('sentBy').populate('sentTo');
        temp = await Message.find({sentTo : req.user.id ,visible:req.user.id}).populate('sentBy').populate('sentTo');
        msg = msg.concat(temp);


        msg.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.createdAt) - new Date(a.createdAt);
        });


        let people1 = [];
        
        // to get the conversatio for only oncw
        for(let i of msg){
            var tr = false;
            for(let j of people1){
                if(((j.sentBy.email == i.sentBy.email) && (j.sentTo.email == i.sentTo.email))||  ((j.sentBy.email == i.sentTo.email )&& (j.sentTo.email == i.sentBy.email))){
                    tr=true;
                    break;
                }
            }

            if(tr==false){
                people1.push(i);
            }
        }

 
        people = people.concat(people1);

        people.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        return res.render('home' , {
            message: people, 
            self : req.user.id,
            name: req.user.name
        });
    } catch (error) {
        console.log(error)
    }
    

}


// creating the account
module.exports.create = async function(req , res){

    // if password and confirm passsword doesnot match
    if(req.body.password != req.body.confirm_password){
        res.redirect('back');
    }else{

            let user =await Users.findOne({email:req.body.email});
            if(!user){
                // creating the users data
                        let newUser = await Users.create({
                                email : req.body.email,
                                username :  req.body.username,
                                password : req.body.password,
                                name : req.body.name
                            });
                    console.log('$$$$$$$',newUser)
                    res.redirect('/signin');
            } else{
                //if user exists
                res.redirect('back');
            }

    }
}


//authentication using passport
module.exports.createSession = function(req , res){
            return  res.redirect('/home');
}

module.exports.destroySession = function(req , res){
    req.logout();
    res.redirect('/');
}


module.exports.searchUserPost = async function(req , res){
    let name = req.body.name;
    try {
        let user = await Users.findOne({email:name});

        if(user){
           return  res.redirect('/search-user?name='+user.id+'&hidden=false')
            

        } else{
            // if user user not found
            return res.render('search-user' , {
                isHidden:false,
                profile:false ,
                message:[]
            });
        }    
    } catch (error) {
        console.log(error)   
    }
    
}


module.exports.searchUser = async function(req , res){
    let name = req.query.name;
    let hidden = req.query.hidden;
    
    
        try {

            let user = await Users.findById(name);
            if(user.id == req.user.id){
               return res.redirect('/home');
            }

            if(user){
                // finding the message between user and profile searched

                // forgetPasswordMailer.forgetPassword(user)
                let message;
                let message2;
                if(hidden== 'true'){
                    message = await Message.find({sentTo:user._id, sentBy: req.user, visible:user._id});
                    message2 = await Message.find({sentBy:user._id, sentTo: req.user , visible:user._id});
                    
                } else{
                   
                    message = await Message.find({sentTo:user._id, sentBy: req.user.id, visible:req.user._id});
                    message2 = await Message.find({sentBy:user._id, sentTo: req.user.id , visible:req.user._id});
                    
                }
                

                // concating both the messages
                let msg = message.concat(message2);


                // sorting the messages based on timestamps
                msg.sort(function(a,b){
                    // Turn your strings into dates, and then subtract them
                    // to get a value that is either negative, positive, or zero.
                    return new Date(a.createdAt) - new Date(b.createdAt);
                });

                // if user is found
            
                return res.render('search-user' , {
                    self:req.user.name,
                    isHidden:hidden,
                    profile:user,
                    message: msg
                });

            } 

                // if user user not found
                return res.render('search-user' , {
                    self:"doesnotmatter",
                    isHidden: hidden , 
                    profile:false ,
                    message:[]
                });
            


        } catch (error) {
            return console.log(error)
        }
}