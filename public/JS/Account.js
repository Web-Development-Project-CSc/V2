let vp = false, ve = false;
function checkmail(mail){
    if(mail.value!=''){
    fetch('/user/getaccounts',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({mail: mail.value})
    }).then(res => res.json()).then(result =>{ 
    if(result.result=='not found')
       { 
        document.getElementById('error-1').style.display='block' 
        ve = false
       }
    else {
        document.getElementById('error-1').style.display='none'
        ve = true
    }
    }
        )
    }
    else 
        document.getElementById('error-1').style.display='none'
}
function checkpass(){
    let mail = document.getElementById('email')
    if(mail.value!=''){
        fetch('/user/getpass',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({mail: mail.value , pass:document.getElementById('psw').value})
        }).then(res => res.json()).then(result =>{ 
            if(result.pass == true){
                document.getElementById('error0').style.display='none'
                vp = true
            }
                else{
                document.getElementById('error0').style.display='block'
                vp = false
            }
            })
        }
        else{
             document.getElementById('error0').style.display='none'
            }
        }
        const input = document.querySelector("input[type='password']");
        input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
        event.preventDefault();
        document.querySelector('#logger').click();
  }
});
function can(){
    if(ve && vp) document.querySelector('form').submit()
}