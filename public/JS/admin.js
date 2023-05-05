let navers = document.querySelectorAll(".nav-links li");
let hoverers = document.querySelectorAll(".all");
for(let i =0; i<navers.length; i++) navers[i].addEventListener("click", function(){
  navers[i].classList.add('active');
  for(let j=0; j<navers.length; j++){
    if(j!=i) navers[j].classList.remove('active');
  }
  if(i==1) hoverers[0].classList.add('open');
  else hoverers[0].classList.remove('open');
    if(i==2) hoverers[1].classList.add('open');
    else hoverers[1].classList.remove('open');
    if(i==3) hoverers[2].classList.add('open');
    else hoverers[2].classList.remove('open');
  });