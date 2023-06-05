let colors = document.querySelectorAll(".color");
let shades = document.querySelectorAll(".shade");
let forms = document.querySelectorAll(".f");
let titles = document.querySelectorAll('.product span');

for(let i =0; i<colors.length; i++) colors[i].style.backgroundColor = shades[i].value;
        
function prog(index){
forms[index].submit();
}


function sendData(e) {
  const searchResults = document.getElementById('searchResults');
  let match = e.value.match(/^[a-zA-Z ]*/);
  let match2 = e.value.match(/^\s*$/);

  if (match2 && match2[0] === e.value) {
    searchResults.innerHTML = '';
    return;
  } else if (match && match[0] === e.value) {
    fetch('/admin/getOrderResults', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload: e.value })
    })
      .then((res) => res.json())
      .then((data) => {
        let payload = data.payload;
        searchResults.innerHTML = '';

        if (payload.length < 1) {
          searchResults.innerHTML = '<p>Sorry, Nothing Found.</p>';
          return;
        }

        payload.forEach((item, index) => {
          const p = document.createElement('p');
          p.innerHTML = item.productName;
          p.addEventListener('click', () => {
            document.querySelector("#itemclicked").value = item.productName;
            document.querySelector("#searchInput").value = item.productName;
            searchResults.innerHTML = '';
            
            for(let i =0; i < titles.length; i++) {
              if(titles[i].innerText == p.innerHTML)
              window.scrollTo({left: titles[i].parentElement.parentElement.parentElement.parentElement.offsetLeft, top: titles[i].parentElement.parentElement.parentElement.parentElement.offsetTop, behavior: 'smooth'});
            }
          });
          searchResults.appendChild(p);
        });
        use();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  searchResults.innerHTML = '';
}

function use() {
  let res = document.querySelectorAll("#searchResults p")
  for (let i = 0; i < res.length; i++) {
    res[i].addEventListener('click', () => {

    })
  }
}
