document.addEventListener('DOMContentLoaded', function() {
    let signupBtn = document.getElementById("signupBtn");
    let signinBtn = document.getElementById("signinBtn");
    let nameField = document.getElementById("nameField");
    let title = document.getElementById("title");
    let message = document.getElementById("message");

    signinBtn.onclick = function() {
        nameField.style.maxHeight = "0";
        title.innerHTML = "Sign In";
        title.style.color = "#543310"; // Change color smoothly
        signupBtn.classList.add("disable");
        signinBtn.classList.remove("disable");
        message.innerHTML = "";
    };

    signupBtn.onclick = function() {
        nameField.style.maxHeight = "60px";
        title.innerHTML = "Sign Up";
        title.style.color = "#543310";
        signupBtn.classList.remove("disable");
        signinBtn.classList.add("disable");
        message.innerHTML = "";
    };

    signupBtn.addEventListener("click", function() {
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        // Check for valid email format
        if (!isValidEmail(email) || !password) {
            message.innerHTML = "<br><b>Please enter a valid email and password<b>";
            message.style.color = "black";
            return;
        }

        let users = JSON.parse(localStorage.getItem('users') || '[]');

        let userExists = users.some(user => user.email === email);

        if (userExists) {
            message.innerHTML = "<br><b>User already exists!<b>";
            message.style.color = "black";
        } else {
            users.push({ name, email, password });
            localStorage.setItem('users', JSON.stringify(users));
            message.innerHTML = "<br><b>Sign up successful!<b>";
            message.style.color = "black";
            window.location.href = "page.html"; // Redirect to a welcome page
        }
    });

    signinBtn.addEventListener("click", function() {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        if (!isValidEmail(email) || !password) {
            message.innerHTML = "";
            return;
        }

        let users = JSON.parse(localStorage.getItem('users') || '[]');

        let user = users.find(user => user.email === email && user.password === password);

        if (user) {
            alert("Login complete!");
            window.location.href = "page.html"; // Redirect to logged-in page
        } else {
            message.innerHTML = "<br><b>Invalid email or password<b>";
            message.style.color = "black";
        }
    });

    // Function to validate email format
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }
});
