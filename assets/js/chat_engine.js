let socket = io();

let thisAccount =  document.getElementById("selfAccount").value;
socket.emit('join' , thisAccount)


function autoscroll(){
    let message =  document.getElementsByClassName('older-message')[0];
    message.scrollTop = message.scrollHeight;
}
autoscroll();


socket.on('connect' , function(){

    // let messageId = document.getElementById('message').value;
    let isHidden = document.getElementById('hidden').value;
    let profile = document.getElementById('profile').value;
    console.log(isHidden)
        

    var messageId;
    document.getElementById('message-form').addEventListener('submit' , (e)=>{

        var messageId =  e.target.message.value;
        e.preventDefault();
        var msg = messageId;
        e.target.message.value ="";
        
    
        let li = document.createElement('li');
        let node = document.createTextNode(msg)
        li.appendChild(node);
        li.classList.add('self-message')
        let list = document.getElementById('message-list');
        list.appendChild(li);
    
        socket.emit('message' ,{
            sentTo : profile,
            hidden: isHidden,
            msg: msg,
            sentBy :thisAccount
        });
        autoscroll();
    });


   
    
    socket.on('recieve-message' , function(data){
        if((isHidden && data.value==thisAccount) || (isHidden== 'false' && data.visible!= thisAccount)){
            return;
        }

        if(data.sentBy == profile ){
            let li = document.createElement('li');
            let node = document.createTextNode(data.msg);
            li.appendChild(node);
    
            li.classList.add('other-message')
    
            let list = document.getElementById('message-list');
            list.appendChild(li);
    
    
            let newMessage = list.lastElementChild;
            let newMessageHeight = newMessage;
            autoscroll();
        }
        
    })




})








