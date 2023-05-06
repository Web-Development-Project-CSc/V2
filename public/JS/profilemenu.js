let icon = document.getElementsByClassName('profileIcon');
icon[0].addEventListener('click', function(){
    let menu = document.getElementsByClassName('profileMenu');
    if(menu[0].style.display == 'none'){
        menu[0].style.display = 'block';
    }else{
        menu[0].style.display = 'none';
    }
});