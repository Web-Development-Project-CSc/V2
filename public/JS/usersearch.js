let titles = document.querySelectorAll('.role');

function sendData(e) {
  const searchResults = document.getElementById('searchResults');
  let match = e.value.match(/^[a-zA-Z ]*/);
  let match2 = e.value.match(/^\s*$/);

  if (match2 && match2[0] === e.value) {
    searchResults.innerHTML = '';
    return;
  } else if (match && match[0] === e.value) {
    fetch('/admin/getUserResults', {
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
          p.innerHTML = item.name;
          p.addEventListener('click', () => {
            document.querySelector("#itemclicked").value = item.name;
            document.querySelector("#searchInput").value = item.name;
            searchResults.innerHTML = '';
            
            for(let i =0; i < titles.length; i++) {
              if(titles[i].innerText == p.innerHTML)
              window.scrollTo({left:titles[i].offsetLeft, top:titles[i].offsetTop, behavior:"smooth"});
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
