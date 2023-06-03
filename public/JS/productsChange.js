let num = document.getElementsByClassName("page");
let pages = document.getElementsByClassName("items");
let carts = document.querySelectorAll(".cart button");
let bins  = document.querySelectorAll(".bin div");
let order = []
  let pre = sessionStorage.getItem('order');
  console.log(pre)
  if(pre != null) order = JSON.parse(pre);
  let shades = document.querySelectorAll('.items input[type=color]')
  let states = document.querySelectorAll('.items input[type=radio]')
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
  let items ='', bought = order.length;
  if(bought > 0) add()
  for(let i =0; i<carts.length; i++) carts[i].addEventListener("click", function(){
    bought++; 
    if(i<10) items += '0' + i + ' ';
   else  items += i + ' ';
    add(); 
  });
  function add(){
    document.getElementById("go").innerText = '(' + bought + ')';
    let a = document.querySelector(".go a");
  }
  
  
function addtocart(prodid,prodname,prodprice,index){
let quantity = 1;
let shade= shades[index].value
let state ='powder'
if(states[index*2].checked) state='extract'
let product={prodid,prodname,prodprice,shade,state,quantity}
if(include(order,product)) {
for(let i=0; i<order.length; i++){
  if(order[i].prodid === prodid && order[i].shade === shade && order[i].state === state){
    order[i].quantity++
    break;
    }
  }
}
else order.push(product)
sessionStorage.setItem('order',JSON.stringify(order))
console.log(order)
fetch('/addtocart',{
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({order: JSON.parse(sessionStorage.getItem('order'))})}
  )
}

function include(arr,obj) {
  return (arr.findIndex((e) => e.prodid === obj.prodid && e.shade === obj.shade && e.state === obj.state) != -1);
}
function go (){
  if(pre != null){
  fetch('/addtocart',{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({order: JSON.parse(sessionStorage.getItem('order'))})}
    )
    location.replace('/user/cart')
  }
  else location.replace('/user/cart')
}