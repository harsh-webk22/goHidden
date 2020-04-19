let socket = io();

let thisAccount =  document.getElementById("selfAccount").value;
socket.emit('join' , thisAccount)

// console.log(document.getElementById('hidden').value);


function autoscroll(){
    let message =  document.getElementsByClassName('older-message')[0];
    message.scrollTop = message.scrollHeight;
}

autoscroll();

document.getElementById('message-form').addEventListener('submit' , (e)=>{
    e.preventDefault();
    const msg = e.target.elements.message.value;
    e.target.elements.message.value ="";
    

    let li = document.createElement('li');
    let node = document.createTextNode(msg)
    li.appendChild(node);
    li.classList.add('self-message')
    let list = document.getElementById('message-list');
    list.appendChild(li);

    socket.emit('message' ,{
        sentTo : e.target.elements.profile.value,
        hidden:e.target.elements.hidden.value,
        msg: msg,
        sentBy :thisAccount
    });
    autoscroll();
});

socket.on('recieve-message' , function(msg){

    let li = document.createElement('li');
    let node = document.createTextNode(msg)
    li.appendChild(node);

    li.classList.add('other-message')

    let list = document.getElementById('message-list');
    list.appendChild(li);


    let newMessage = list.lastElementChild;
    let newMessageHeight = newMessage;
    autoscroll();
})



