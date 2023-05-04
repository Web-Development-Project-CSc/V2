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