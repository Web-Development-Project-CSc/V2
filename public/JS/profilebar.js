let hidden = document.getElementsByTagName("section");
let showers = document.getElementsByClassName("scroller");
let inputs = document.querySelectorAll('.profile input');
let savers = document.querySelectorAll('.profile button');
let results = document.querySelectorAll('.profile span');
move(showers[0]);
function move(tag){
    for(let i =0; i<showers.length; i++) showers[i].classList.remove("active");
    tag.classList.add("active");
    for(let i=0; i<hidden.length; i++) hidden[i].style.display="none";
    if(tag == showers[0]){
        hidden[0].style.display="block";
    }
   else if(tag == showers[1]){
        hidden[1].style.display="block";
    }
   else if(tag == showers[2]){
        hidden[2].style.display="block";
    }
}
let payments = document.querySelectorAll('input[name="method"]');
payments[1].addEventListener('change', function (e) {
    if (this.checked)
     openDetails();
  });
  payments[0].addEventListener('change', function (e) {
    if (this.checked)
     closeDetails();
  });
function openDetails() {
  document.getElementById("online").open = true;
}

function closeDetails() {
  document.getElementById("online").open = false;
}



savers[0].addEventListener('click', function (e){
  e.preventDefault();
  results[0].innerHTML = inputs[0].value;
})
savers[1].addEventListener('click', function (e){
  e.preventDefault();
  results[1].innerHTML = inputs[1].value;
})
savers[2].addEventListener('click', function (e){
  e.preventDefault();
  let x ='';
  for(let i=0; i<inputs[2].value.length; i++)
  x+= '•';
  results[2].innerHTML = x;
})
savers[3].addEventListener('click', function (e){
  e.preventDefault();
  results[3].innerHTML = inputs[3].value;
})
savers[4].addEventListener('click', function (e){
  e.preventDefault();
  results[4].innerHTML = inputs[4].value;
})
savers[5].addEventListener('click', function (e){
  e.preventDefault();
  results[5].innerHTML = inputs[5].value;
})
savers[6].addEventListener('click', function (e){
  e.preventDefault();
  results[6].innerHTML = inputs[6].value;
  
})

let params = new URLSearchParams(window.location.search);
let temp = params.get('name');
if(temp!=null) results[0].innerHTML = params.get('name');
temp = params.get('email');
if(temp!=null) results[1].innerHTML = params.get('email');
temp =params.get('country');
if(temp!=null) results[5].innerHTML = params.get('country');
temp =params.get('address');
if(temp!=null) results[6].innerHTML = params.get('address');
temp = params.get('birthdate');
if(temp!=null) results[4].innerHTML = params.get('birthdate');
temp = params.get('mobile');
if(temp!=null) results[3].innerHTML = params.get('mobile');
temp = params.get('psw');
if(temp!=null){
let x = '';
for(let i=0; i<params.get('psw').length; i++)  x+= '•';
results[2].innerHTML = x;
}
