const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const app = express();
// const server = http.createServer(app);
// const io = socketio(server);  
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const Users = require('./models/users');
const Message = require('./models/message');

const session = require('express-session');
const passport = require('passport');
const LocalPassport = require('./config/passport-local-strategy');
const mongoStore = require('connect-mongo')(session);




const chatServer = http.createServer(app);
const chatSocket = require('./config/chat_sockets').chatSocket(chatServer);
// chatServer.listen(5000);


app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));



app.set('view engine' , 'ejs');
app.set('views' , './views');

app.use(session({
    name : 'goHidden' ,
    secret: 'blahsomething',
    saveUninitialized :false,
    resave: false,
    store: new mongoStore({
        mongooseConnection:db,
        autoRemove:'disabled'
    }, function(err){
        console.log('error in mongo store' , err);
    })
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/' , require('./router'));



chatServer.listen(4000 , function(err){
    console.log(err)
});