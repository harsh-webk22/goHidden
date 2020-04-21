// for sign up form

let form = document.getElementById('sign_up_form').addEventListener('submit' , function(e){
    let password = e.target.password.value;
    let confirm_password = e.target.confirm_password.value;
                      
    if(password != confirm_password){
        e.preventDefault();
        document.getElementById('password-check').style.display = 'block';
    } else{
        document.getElementById('password-check').style.display = 'none';
    }

    let xhrRequest = new XMLHttpRequest();
    
    xhrRequest.onload = function(){
        let response = JSON.parse(xhrRequest.response);

        // if user does not exists
        if(!response.data.user){
           
            document.getElementById('email-check').style.display = 'none';
        } else{
            // if user does not exists
            e.preventDefault();
            document.getElementById('email-check').style.display = 'block';
        }
    }

    xhrRequest.open('get' , `/checkUsername?user=${e.target.email.value}` , false);
    xhrRequest.send();

});



