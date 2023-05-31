let num = document.getElementsByClassName("page");
let pages = document.getElementsByClassName("items");
let carts = document.querySelectorAll(".cart button");
let bins  = document.querySelectorAll(".bin div");
under(Math.ceil(bins[0].innerHTML));
function currentPage(value) {
if(value === 'p') location.replace('/store/' + (parseInt(bins[0].innerText)-1));
if(value === 'n') location.replace('/store/' + (parseInt(bins[0].innerText)+1));
if(value === 'c1'){
  if(bins[0].innerText != (parseInt(num[1].innerText)))
  location.replace('/store/' + (parseInt(num[1].innerText)));
  else under(parseInt(bins[0].innerHTML))
}
if(value === 'c2'){
  if(bins[0].innerText != (parseInt(num[2].innerText)))
  location.replace('/store/' + (parseInt(num[2].innerText)));
  else under(parseInt(bins[0].innerHTML))
}
if(value === 'c3'){
  if(bins[0].innerText != (parseInt(num[3].innerText)))
  location.replace('/store/' + (parseInt(num[3].innerText)));
  else under(Math.ceil(bins[0].innerHTML))
}
}

  function under(curr) {
    for (i = 0; i < num.length; i++) {
      num[i].style.textDecoration="none";
    }
    let me;
    if(curr == 1) me = 1
    if(curr > 1 && curr < parseInt(bins[1].innerHTML)) me = 2
    if(curr == parseInt(bins[1].innerHTML)) me = 3
    num[me].style.textDecoration="underline";
    window.scrollTo({top :0, behavior:"smooth"});
}

  let details = document.getElementsByClassName("productInfo");
  let pos1 = '5.5%', pos2 = '35%', pos3='65%';
  for (let i = 0; i < details.length; i+=9) {
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
  let order = []
  let shades = document.querySelectorAll('.items input[type=color]')
  let states = document.querySelectorAll('.items input[type=radio]')
function addtocart(prodid,prodname,prodprice,index){
let shade= shades[index].value
let state
if(states[index].checked) state='extract'
else state ='powder'
console.log(shade)
let product={prodid,prodname,prodprice,shade,state}
order.push(product)
console.log(order)
fetch('/addtocart',{
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({order: order})}
  )
}