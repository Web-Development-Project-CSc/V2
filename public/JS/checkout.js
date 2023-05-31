let total = document.querySelectorAll("h2 span");
let number = document.querySelectorAll(".num");
document.getElementById("cncl").onclick= function() { location.replace("/store/1");}
let buttons = document.querySelectorAll('.quantity img');
function add(index,price){
        let num = (index * 2) + 1
        let int = buttons[num].parentNode.querySelector("span").innerHTML;
        number[index].innerHTML = ++int;
        total[index].innerHTML = 'EGP '+(int*price);
}
function remove(index,price){
        let num = (index * 2) 
        let int = buttons[num].parentNode.querySelector("span").innerHTML;
        if(int-1>=0){
        number[index].innerHTML =--int;
        total[index].innerHTML = 'EGP '+ (int*price);
        if(int==0) buttons[num].parentNode.parentNode.remove();
        }
}