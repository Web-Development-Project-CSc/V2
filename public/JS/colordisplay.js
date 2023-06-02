let colors = document.querySelectorAll(".color");
let shades = document.querySelectorAll(".shade");
let forms = document.querySelectorAll(".f");
for(let i =0; i<colors.length; i++) colors[i].style.backgroundColor = shades[i].value;
        
function prog(index){
forms[index].submit();
}