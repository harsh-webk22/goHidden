

document.getElementById('sign_in_form').addEventListener('submit'  , function(e){

    let xhrRequest = new XMLHttpRequest();

    xhrRequest.onload =  function(){
        let response = JSON.parse(xhrRequest.response);
        if(!response.data.user || (response.data.password != e.target.password.value)){
            
            let p = document.createElement('p');
            let node = document.createTextNode("Invalid username or password")
            p.appendChild(node);
            let div = document.getElementById('username-notification');
            div.innerHTML ="";

            let i = document.createElement('i');
            i.classList.add('fas');
            i.classList.add('fa-info-circle');
            
            div.appendChild(i);

            p.style.display ="inline-block"
            div.style.display="block";
            div.style.color = 'red';
            div.appendChild(p);
            e.preventDefault();
        }
    }

    xhrRequest.open('get' , `/checkUsername?user=${e.target.email.value}` , false);
    xhrRequest.send();
})



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
                div.innerHTML ="";


                let i = document.createElement('i');
                i.classList.add('fas');
                i.classList.add('fa-info-circle');
                
                div.appendChild(i);

                p.style.display ="inline-block"
                div.style.display="block";
                div.style.color = 'green';
                div.appendChild(p);
                e.preventDefault();

        } else{
                let p = document.createElement('p');
                let node = document.createTextNode("Username not found")
                p.appendChild(node);
                let div = document.getElementById('username-notification');
                div.innerHTML ="";


                let i = document.createElement('i');
                i.classList.add('fas');
                i.classList.add('fa-info-circle');
                
                div.appendChild(i);

                p.style.display ="inline-block"
                div.style.display="block";
                div.style.color = 'red';
                div.appendChild(p);
        }
    }
    xhrRequest.open('get' , `/forget-Password?user=${user}` , false);
    xhrRequest.send();
})


