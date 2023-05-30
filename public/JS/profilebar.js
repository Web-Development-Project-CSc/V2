let hidden = document.getElementsByTagName("section");
let showers = document.getElementsByClassName("scroller");
let inputs = document.querySelectorAll('.profile input');
let savers = document.querySelectorAll('.profile button');
let results = document.querySelectorAll('.profile span');
let done = document.querySelector('#doneedit');
let edits = document.querySelectorAll('#editors input');
let form = document.querySelector('#editors');
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
  edits[0].value = inputs[0].value;
  done.style.display="block";
})
savers[1].addEventListener('click', function (e){
  e.preventDefault();
  results[1].innerHTML = inputs[1].value;
  edits[1].value = inputs[1].value;
  done.style.display="block";
})
savers[2].addEventListener('click', function (e){
  e.preventDefault();
  let x ='';
  for(let i=0; i<inputs[2].value.length; i++)
  x+= '•';
  results[2].innerHTML = x;
  edits[2].value = inputs[2].value;
  done.style.display="block";
})
savers[3].addEventListener('click', function (e){
  e.preventDefault();
  results[3].innerHTML = inputs[3].value;
  edits[3].value = inputs[3].value;
  done.style.display="block";
})
savers[4].addEventListener('click', function (e){
  e.preventDefault();
  results[4].innerHTML = inputs[4].value;
  edits[4].value = inputs[4].value;
  done.style.display="block";
})
savers[5].addEventListener('click', function (e){
  e.preventDefault();
  results[5].innerHTML = inputs[5].value;
  edits[5].value = inputs[5].value;
  done.style.display="block";
})
savers[6].addEventListener('click', function (e){
  e.preventDefault();
  results[6].innerHTML = inputs[6].value;
  edits[6].value = inputs[6].value;
  done.style.display="block";
})
