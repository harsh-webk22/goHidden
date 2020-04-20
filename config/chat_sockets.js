const Message = require('../models/message');


module.exports.chatSocket = function(chatServer){
    let io= require('socket.io')(chatServer);
    
    
    io.on('connection' ,(socket) =>{
        console.log('new connection')
        socket.on('join' , function(id){
            socket.join(id);
        });

        socket.on('message' , function(data){



            let sendMsg;

                if(data.hidden == 'true'){
                    

                    sendMsg = {
                        msg: data.msg,
                        sentBy: data.sentBy,
                        visible: data.sentTo 
                    }

                    Message.create({
                        message:data.msg , 
                        sentTo : data.sentTo, 
                        sentBy: data.sentBy, 
                        visible: data.sentTo
                    } , function(err , message){
                        if(err){
                            console.log(err);
                            return;
                        }
                        console.log(message);
                    });
                } else{

                    sendMsg = {
                        msg: data.msg,
                        sentBy: data.sentBy,
                        visible: data.sentBy 
                    }


                    Message.create({
                        message:data.msg, 
                        sentTo : data.sentTo, 
                        sentBy: data.sentBy,
                        visible:data.sentBy

                    } , function(err , message){
                        if(err){
                            console.log(err);
                            return;
                        }

                        console.log(message)
                    });
                }

                 

                
                io.in(data.sentTo).emit('recieve-message' , sendMsg);
        

        })
    });

    
}