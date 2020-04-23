document.getElementsByClassName('menu')[0].addEventListener('click' , function(){
    let headerStyle = document.getElementsByClassName('header-link')[0].style.display;
    if(headerStyle == 'block'){
        document.getElementsByClassName('header-link')[0].style.display ="none";
    } else{
        document.getElementsByClassName('header-link')[0].style.display ="block";
    }
    
});