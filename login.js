document.addEventListener("DOMContentLoaded", () => {
    form = document.getElementById("login-form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        checkDetails();
    });

    async function checkDetails(){
        //Check details against server here
        try {
          const response = await fetch('/.netlify/functions/check_login');
          const accounts = await response.json();
          
          accounts.forEach((account) => {
            console.log(account);
          });
        } catch (error) {
          console.error('Error:', error);
        }
        //Edit form response if necessary
    }

});