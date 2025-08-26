document.addEventListener("DOMContentLoaded", () => {
    form = document.getElementById("login-form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        checkDetails();
    });

    function checkDetails(){
        //Check details against server here
        
        //Edit form response if necessary
    }

});