
// for sign in form
document.getElementById('link').addEventListener('click' , function(e){
    e.preventDefault();
    
    let user = document.getElementById('email').value;
    let xhrRequest = new XMLHttpRequest();

    xhrRequest.onload = function(data){
        let response = JSON.parse(xhrRequest.response);
        console.log(response.data.exist)

        // if user exist update  password
        if(response.data.exist){
                let p = document.createElement('p');
                let node = document.createTextNode("Your new password has been sent to your mail.")
                p.appendChild(node);
                let div = document.getElementById('username-notification');
                p.style.display ="inline-block"
                div.style.display="block";
                div.style.color = 'green';
                div.appendChild(p);

        } else{
                let p = document.createElement('p');
                let node = document.createTextNode("Username not found")
                p.appendChild(node);
                let div = document.getElementById('username-notification');
                p.style.display ="inline-block"
                div.style.display="block";
                div.style.color = 'red';
                div.appendChild(p);
        }
    }
    xhrRequest.open('get' , `/forget-Password?user=${user}` , false);
    xhrRequest.send();
})

