document.addEventListener("DOMContentLoaded", function () {

    const signupBtn = document.getElementById("openSignup");
    const loginBtn = document.getElementById("openLogin");

    const signupModal = new bootstrap.Modal(
        document.getElementById("signupModal")
    );

    const loginModal = new bootstrap.Modal(
        document.getElementById("loginModal")
    );

    signupBtn.addEventListener("click", function () {
        signupModal.show();
    });

    loginBtn.addEventListener("click", function () {
        loginModal.show();
    });

    const signupForm = document.getElementById("signupForm");

    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("signupName").value.trim();
        const email = document.getElementById("signupEmail").value.trim();
        const password = document.getElementById("signupPassword").value;

        const nameError = document.getElementById("signupNameError");
        const emailError = document.getElementById("signupEmailError");
        const passwordError = document.getElementById("signupPasswordError");
        const success = document.getElementById("signupSuccess");


        nameError.textContent = "";
        emailError.textContent = "";
        passwordError.textContent = "";
        success.textContent = "";

        let isValid = true;


        if (name === "") {
            nameError.textContent = "Please enter your name.";
            isValid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            emailError.textContent = "Please enter a valid email.";
            isValid = false;
        }

        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

        if (!passwordPattern.test(password)) {
            passwordError.textContent =
                "Password must have at least 8 characters, a letter, a number, and a special character.";
            isValid = false;
        }

        if (isValid) {
            const existingUser = JSON.parse(localStorage.getItem("travelUser"));

            if (existingUser && existingUser.email === email.toLowerCase()) {
                emailError.textContent = "This email is already registered.";
                return;
            }

            const user = {
                name: name,
                email: email.toLowerCase(),
                password: password
            };

            localStorage.setItem("travelUser", JSON.stringify(user));

            success.textContent = "Account created successfully!";
            signupForm.reset();
        }
    });
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value.trim().toLowerCase();
        const password = document.getElementById("loginPassword").value;

        const emailError = document.getElementById("loginEmailError");
        const passwordError = document.getElementById("loginPasswordError");
        const loginError = document.getElementById("loginError");

        emailError.textContent = "";
        passwordError.textContent = "";
        loginError.textContent = "";

        let isValid = true;

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            emailError.textContent = "Please enter a valid email.";
            isValid = false;
        }

        if (password === "") {
            passwordError.textContent = "Please enter your password.";
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        const user = JSON.parse(localStorage.getItem("travelUser"));

        if (user && user.email === email && user.password === password) {
            localStorage.setItem("travelLoggedIn", "true");
            window.location.href = "profile.html";
        } else {
            loginError.textContent = "Incorrect email or password.";
        }
    });
    const profileLink = document.getElementById("profileLink");

    if (localStorage.getItem("travelLoggedIn") === "true") {
        profileLink.classList.remove("d-none");
    }

});