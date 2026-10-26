document.addEventListener("DOMContentLoaded", () => {
    const navLinks = Array.from(
        document.querySelectorAll(".navbar-nav .nav-link")
    );

    if (navLinks.length === 0) return;

    navLinks.forEach((link, index) => {
        link.addEventListener("keydown", event => {
            let nextIndex;

            switch (event.key) {
                case "ArrowRight":
                case "ArrowDown":
                    nextIndex = (index + 1) % navLinks.length;
                    break;

                case "ArrowLeft":
                case "ArrowUp":
                    nextIndex =
                        (index - 1 + navLinks.length) % navLinks.length;
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