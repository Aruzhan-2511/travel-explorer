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
