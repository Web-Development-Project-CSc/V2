let index = 0, p = document.getElementsByClassName("paragraph");
setTimeout(infoFade,1000);
document.getElementById("info").addEventListener( "mouseenter",(event) => { infoFade();});
function infoFade(){
    let i;
    for (i = 0; i < p.length; i++) {
      p[i].style.display = "none";  
      }
      index++;
      if (index > p.length) {index = 1}    
      p[index-1].style.display = "block"; 
}