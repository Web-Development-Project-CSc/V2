function checkmail(mail){
    if(mail.value!=''){
    fetch('/user/getaccounts',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({mail: mail.value})
    }).then(res => res.json()).then(result =>{ 
    if(result.result=='not found')
        document.getElementById('error-1').style.display='block'
    else
        document.getElementById('error-1').style.display='none'})
    }
    else 
        document.getElementById('error-1').style.display='none'
}
function checkpass(){
    let mail = document.getElementById('email')
    if(mail.value!=''){
        fetch('/user/getaccounts',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({mail: mail.value})
        }).then(res => res.json()).then(result =>{ 
            if(document.getElementById('psw').value == result.pass){
                document.getElementById('error0').style.display='none'}
                else{
                document.getElementById('error0').style.display='block'}
            })
        }
        else{
             document.getElementById('error0').style.display='none'
            }
        }