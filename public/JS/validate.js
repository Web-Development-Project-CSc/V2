// $(document).ready(function() {
//     // Get the form element
//     const form = document.getElementById('myForm');
  
//     // Add an event listener to the submit event
//     form.addEventListener('submit', function(e) {
//       e.preventDefault();
  
//       // Disable the submit button
//       document.getElementById('logger').disabled = true;
  
//       // Make an AJAX request to the /login route
//       $.ajax({
//         url: '/login',
//         type: 'POST',
//         data: $(this).serialize(),
//         success: function(response) {
//           if (response.message === 'Login successful') {
//             // Redirect the user to the home page
//             window.location.href = '/';
//           } else {
//             // Show an error message
//             if (response.message === 'Email does not exist') {
//               document.getElementById('error-1').style.display = 'block';
//               document.getElementById('error0').style.display = 'none';
//             } else if (response.message === 'Password is incorrect') {
//               document.getElementById('error0').style.display = 'block';
//               document.getElementById('error-1').style.display = 'none';
//             }
//           }
  
//           // Enable the submit button
//           document.getElementById('logger').disabled = false;
//         },
//         error: function(error) {
//           console.log(error);
//         }
//       });
//     });
//   });