document.addEventListener("DOMContentLoaded", () => {
    form = document.getElementById("login-form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        checkDetails();
    });

    async function checkDetails() {
        //Check details against server here
        try {
          const response = await fetch('/.netlify/functions/check_login');
          const accounts = await response.json();
          
          if (accounts.length == 0) {
            createAccount();
          }
          
        } catch (error) {
          console.error('Error:', error);
        }
        //Edit form response if necessary
    }

    function createAccount() {
        username = document.getElementById("username").value;
        password = document.getElementById("password").value;
        //Hash pasword and put hashed into database
        console.log(`username: ${username}, and password: ${password}`);
    }

});