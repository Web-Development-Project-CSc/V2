window.onscroll = function() {navscroll()};
let nav = document.getElementById("navbar");
let sticky = nav.offsetTop;
function navscroll() {
  if (window.pageYOffset > sticky) {
    nav.classList.add("sticky");
   
  } else {
    nav.classList.remove("sticky");
  }
}
let icon = document.getElementsByClassName('profileIcon');
icon[0].addEventListener('click', function(){
    let menu = document.getElementsByClassName('profileMenu');
    if(menu[0].style.display == 'none'){
        menu[0].style.display = 'block';
    }else{
        menu[0].style.display = 'none';
    }
});