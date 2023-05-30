function sendData(e) {
    const searchResults = document.getElementById('searchResults');
    let match = e.value.match(/^[a-zA-Z ]*/);
    let match2 = e.value.match(/^\s*$/);
    
    if (match2 && match2[0] === e.value) {
      searchResults.innerHTML = '';
      return;
    }
    else if (match && match[0] === e.value) {
      fetch('/getResults', {
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

            searchResults.innerHTML += '<p>' + item.name + '</p>';
          });
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
    
    searchResults.innerHTML = '';
  }

