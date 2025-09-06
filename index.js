document.addEventListener("DOMContentLoaded", () => {
    form = document.getElementById("login-form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        checkDetails();
    });

    async function checkDetails() {
        //Check details against server here
        try {
          const response = await fetch('/.netlify/functions/check_login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user: username, pass: password})
          });

          const result = await response.json();
          form_response_p = document.getElementById("form-response");
          if (response.status == 200) {
            form_response_p.innerText = result;
            window.location.href = "home.html";
          }
          else if (response.status = 401) {
            form_response_p.innerText = result;
          }
          else if (response.status == 500) {
            form_response_p.innerText = "An error occurred. Please try again";
          }
          
          //Edit form response if necessary, depending on result
          //Redirect to index.html if successful,
          //Otherwise tell the user what went wrong
          
        } catch (error) {
          console.error('Error:', error);
        }
        //Edit form response if necessary, depending on result
    }
});