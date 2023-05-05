let num = document.getElementsByClassName("page");
let pages = document.getElementsByClassName("items");
let carts = document.querySelectorAll(".cart button");
currentPage(1);
function currentPage(n) {
    showPage(pageNum = n);
    under(n);
  }
  function under(n) {
    for (i = 0; i < num.length; i++) {
      num[i].style.textDecoration="none";
    }
    num[n-1].style.textDecoration="underline";
}
  function showPage(n) {
    let i;
    if (n > pages.length) {pageNum = 1}    
    if (n < 1) {pageNum = pages.length}
    for (i = 0; i < pages.length; i++) {
      pages[i].style.display = "none";  
    }
    pages[pageNum-1].style.display = "block";  
    window.scrollTo({top :0, behavior:"smooth"});
}
  let details = document.getElementsByClassName("productInfo");
  let pos1 = '1%', pos2 = '34%', pos3='67%';
  for (let i = 0; i < 27; i+=9) {
  for(let j=0; j<9 ; j++){
    if(j%3==0) details[j+i].style.left=pos1;
    else if((j-1)%3 ==0) details[j+i].style.left=pos2;
    else details[j+i].style.left=pos3;
  }
  }
  let items ='', bought = 0;
  for(let i =0; i<carts.length; i++) carts[i].addEventListener("click", function(){
    bought++; 
    if(i<10) items += '0' + i + ' ';
   else  items += i + ' ';
    add(); 
  });
  function add(){
    document.getElementById("go").innerText = '(' + bought + ')';
    let a = document.querySelector(".go a");
    let url = new URL(a.href);
    url.searchParams.set("item", items);
    url.searchParams.append("num", bought);
    a.href = url.toString();
  }
