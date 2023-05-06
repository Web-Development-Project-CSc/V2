
document.getElementById("cpword").onchange = function() {confirmPass()};
document.getElementById("cancelBTN").onclick= function() { location.replace("http://localhost:3000/");}
    function confirmPass(){

        let p=document.getElementById("pword").value;
        let pc=document.getElementById("cpword").value;
        let x= document.getElementById("error");
        if(p!=pc){
          
          x.style.display='block';
        }
          else {
          x.style.display='none';
          }  
    }