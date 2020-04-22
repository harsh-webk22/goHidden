


let otpDiv = document.getElementById('otp-authentication');
otpDiv.style.display= "none"



// for sign up form

let form = document.getElementById('sign_up_form').addEventListener('submit' , function(e){
    let password = e.target.password.value;
    let confirm_password = e.target.confirm_password.value;
    

    console.log(document.getElementById('otp').value != "");


    // to check otp authentication
    if(document.getElementById('otp').value != ""){
        let xhrRequest = new XMLHttpRequest();
        let otp = document.getElementById('otp').value;

        xhrRequest.onload = function(){
            let response = JSON.parse(xhrRequest.response);
            console.log(response);
            if(response.otp){
                console.log('verifird');
                return
            } else{
                console.log('not verifed');
                e.preventDefault();
                return;
            }
        }

        xhrRequest.open('get' , `/authenticateOTP?user=${e.target.email.value}&otp=${otp}` , false);
        xhrRequest.send();
    }

    
    // to check f password is correct
    if(password != confirm_password){
        e.preventDefault();
        document.getElementById('password-check').style.display = 'block';
    } else{
        document.getElementById('password-check').style.display = 'none';
    }


    if(document.getElementById('otp').value == ""){
        e.preventDefault();

        // to check if email does not already exist
        let xhrRequest = new XMLHttpRequest();
        xhrRequest.onload = function(){
            let response = JSON.parse(xhrRequest.response);
            // if user does not exists
            if(!response.data.user){
                document.getElementById('email-check').style.display = 'none';
                
                
                // to send otp to email
                otpDiv.style.display = 'block';
                let xhrRequest2 = new XMLHttpRequest();
                xhrRequest2.onload = function(){
                    let response = JSON.parse(xhrRequest2.response);
                    otpDiv.style.display="inline-block";
                    return;
                }
                
                xhrRequest2.open('get' , `/createOTP?user=${e.target.email.value}` , false);
                xhrRequest2.send();
            } else{
                // if user  exists
                       
                document.getElementById('email-check').style.display = 'block';
            }
        }
        xhrRequest.open('get' , `/checkUsername?user=${e.target.email.value}` , false);
        xhrRequest.send();
    }
});





