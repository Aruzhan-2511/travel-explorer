document.addEventListener("DOMContentLoaded", function () {

    const savedTheme = localStorage.getItem("travelTheme");

    document.body.classList.toggle("night-mode", savedTheme === "dark");

    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    if (navLinks.length === 0) {
        return;
    }

    navLinks.forEach(function (link, index) {

        link.addEventListener("keydown", function (event) {

            let nextIndex = index;

            switch (event.key) {

                case "ArrowRight":
                case "ArrowDown":
                    nextIndex = (index + 1) % navLinks.length;
                    break;

                case "ArrowLeft":
                case "ArrowUp":
                    nextIndex = (index - 1 + navLinks.length) % navLinks.length;
                    break;

                case "Home":
                    nextIndex = 0;
                    break;

                case "End":
                    nextIndex = navLinks.length - 1;
                    break;

                default:
                    return;
            }

            event.preventDefault();
            navLinks[nextIndex].focus();

        });

    });

});
document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.querySelector(".navbar-nav");

    if (!navbar) {
        return;
    }

    const isLoggedIn = localStorage.getItem("travelLoggedIn") === "true";
    let profileLink = document.getElementById("profileLink");

    if (profileLink) {
        profileLink.classList.toggle("d-none", !isLoggedIn);
        return;
    }

    if (!isLoggedIn) {
        return;
    }

    profileLink = document.createElement("a");
    profileLink.href = "profile.html";
    profileLink.textContent = "Profile";
    profileLink.className = "nav-link";
    profileLink.id = "profileLink";

    if (navbar.tagName === "UL") {
        const navItem = document.createElement("li");
        navItem.className = "nav-item";
        navItem.appendChild(profileLink);
        navbar.appendChild(navItem);
    } else {
        navbar.appendChild(profileLink);
    }
});
