document.getElementById("cpword").onchange = function() {confirmPass()};
document.getElementById("cancelBTN").onclick= function() { location.replace("http://localhost:3000/");}
let vp = true, ve = false;
    function confirmPass(){

        let p=document.getElementById("pword").value;
        let pc=document.getElementById("cpword").value;
        let x= document.getElementById("error");
        if(p!=pc){
          x.style.display='block';
          vp = false
        }
          else {
          x.style.display='none';
          vp = true
          }  
    }
    function can(){
        if(ve && vp) document.querySelector('form').submit()
    }
    function checkmail(mail){
      if(mail.value!=''){
      fetch('/user/getaccounts',{
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({mail: mail.value})
      }).then(res => res.json()).then(result =>{ 
      if(result.result=='found'){
          document.getElementById('error-1').style.display='block'
          ve = false;
      }
      else{
          document.getElementById('error-1').style.display='none'
          ve = true
        }
        })
      }
      else {
          document.getElementById('error-1').style.display='none'
      }
  }