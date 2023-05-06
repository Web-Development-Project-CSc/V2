let details = document.getElementsByClassName("productInfo");
let pos1 = '5.5%', pos2 = '35%', pos3='65%';
for(let j=0; j<3 ; j++){
  if(j%3==0) details[j].style.left=pos1;
  else if((j-1)%3 ==0) details[j].style.left=pos2;
  else details[j].style.left=pos3;
}