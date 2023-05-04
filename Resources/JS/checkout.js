const node = document.querySelector("form .item");
//let param = new URLSearchParams(window.location.search);
let total = document.querySelectorAll("h2 span");
let number = document.querySelectorAll(".num");
document.getElementById("cncl").onclick= function() { location.replace("STORE.html");}
// let int =0;
//     let sum =0;
// for(let i=0; i<param.get('num'); i++) 
//     sum += 35;
// int = param.get('num');
let buttons = document.querySelectorAll('.quantity img');
buttons[1].addEventListener("click", function(){
    let int = buttons[1].parentNode.querySelector("span").innerHTML;
    let price = buttons[1].parentNode.parentNode.querySelector("h2 span").innerHTML;
    let p = price.slice(4);
    p /= int;
    number[0].innerHTML = ++int;
    total[0].innerHTML = 'EGP '+(int*p);
});
    buttons[0].addEventListener("click", function(){
        let int = buttons[0].parentNode.querySelector("span").innerHTML;
        let price = buttons[0].parentNode.parentNode.querySelector("h2 span").innerHTML;
        if(int-1>=0){
        let p = price.slice(4);
        p /= int;
        number[0].innerHTML =--int;
        if(int==0) buttons[0].parentNode.parentNode.remove();
        total[0].innerHTML = 'EGP '+ (int*p);
        }
    });
    buttons[3].addEventListener("click", function(){
        let int = buttons[3].parentNode.querySelector("span").innerHTML;
        let price = buttons[3].parentNode.parentNode.querySelector("h2 span").innerHTML;
        let p = price.slice(4);
        p /= int;
        number[1].innerHTML = ++int;
        total[1].innerHTML =  'EGP '+(int*p);
    });
        buttons[2].addEventListener("click", function(){
            let int = buttons[2].parentNode.querySelector("span").innerHTML;
            let price = buttons[2].parentNode.parentNode.querySelector("h2 span").innerHTML;
            if(int-1>=0){
            let p = price.slice(4);
            p /= int;
            number[1].innerHTML =--int;
            if(int==0) buttons[2].parentNode.parentNode.remove();
            total[1].innerHTML =  'EGP '+(p*int);
            }
        });
        buttons[5].addEventListener("click", function(){
            let int = buttons[5].parentNode.querySelector("span").innerHTML;
            let price = buttons[5].parentNode.parentNode.querySelector("h2 span").innerHTML;
            let p = price.slice(4);
            p /= int;
            number[2].innerHTML = ++int;
            total[2].innerHTML = 'EGP '+ (p*int);
        });
            buttons[4].addEventListener("click", function(){
                let int = buttons[4].parentNode.querySelector("span").innerHTML;
                let price = buttons[4].parentNode.parentNode.querySelector("h2 span").innerHTML;
                if(int-1>=0){
                let p = price.slice(4);
                p /= int;
                number[2].innerHTML =--int;
                if(int==0) buttons[4].parentNode.parentNode.remove();
                total[2].innerHTML= 'EGP '+ (int*p);
                }
            });
// let string = param.get('item');
// let arr = [];
// if(string!=null){
//         for(let i=0; i<string.length; i++){
//             arr[i] = 0;
//             let j =i;
//            while(string[i]!='+' && i<string.length){
//             if(arr[j]==0)
//                arr[j] = string[i];
//                else arr[j]+= string[i];
//                i++;
//            }
//         }
//     }
    // let result = [];
    // for(let i =0 ;i<27; i++) result.push(0);
    // for(let i=0; i<arr[0].length; i++){
    //     let temp = '';
    //     if(arr[0].charAt(i)!=' ')  temp = arr[0].charAt(i);
    //     if(arr[0].charAt(i+1)!=' ') temp +=arr[0].charAt(i+1);
    //     result[parseInt(temp)]++;
    // }

