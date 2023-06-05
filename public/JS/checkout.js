let total = document.querySelectorAll("h2 span");
let number = document.querySelectorAll(".num");
let buttons = document.querySelectorAll('.quantity img');
const array = JSON.parse(sessionStorage.getItem('order'));
function add(index,price){
        let num = (index * 2) + 1
        let int = buttons[num].parentNode.querySelector("span").innerHTML;
        number[index].innerHTML = ++int;
        total[index].innerHTML = 'EGP '+(int*price);
        array[index].quantity = int;
        sessionStorage.setItem('order', JSON.stringify(array));
        console.log(array)
}
function remove(index,price){
        let num = (index * 2) 
        let int = buttons[num].parentNode.querySelector("span").innerHTML;
        if(int-1>=0){
        number[index].innerHTML =--int;
        total[index].innerHTML = 'EGP '+ (int*price);
        array[index].quantity = int;
        if(int==0) {
                buttons[num].parentNode.parentNode.remove();
                array.splice(index,1);
        }
        sessionStorage.setItem('order', JSON.stringify(array));
        console.log(array)
        }
}
function sub(){
        fetch('/addtocart',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({order: JSON.parse(sessionStorage.getItem('order'))})}
                )
        sessionStorage.clear();
        document.querySelector("form").submit();
}