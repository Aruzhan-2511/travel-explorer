document.addEventListener("DOMContentLoaded", () => {

    const greeting = document.getElementById("travelerGreeting");
    const greetingButton = document.getElementById("greetingButton");
    const themeButton = document.getElementById("themeToggle");
    const factButton = document.getElementById("factButton");
    const factOutput = document.getElementById("travelFact");

    const travelFacts = [
        {
            destination: "Japan",
            fact: "Japan is made up of thousands of islands."
        },
        {
            destination: "Italy",
            fact: "Italy is home to many UNESCO World Heritage sites."
        },
        {
            destination: "Switzerland",
            fact: "Switzerland is famous for its Alpine landscapes."
        },
        {
            destination: "Netherlands",
            fact: "Cycling is a popular way to travel around Dutch cities."
        },
        {
            destination: "Greece",
            fact: "Greece has thousands of islands and islets."
        }
    ];

    let currentFactIndex = -1;

    if (greetingButton && greeting) {

        greetingButton.addEventListener("click", () => {

            greeting.textContent =
                "Hello, explorer! Where will your next adventure take you?";

            greeting.style.fontWeight = "bold";
            greeting.style.color = "#0077b6";

            if (typeof playSound === "function") {
                playSound("click");
            }

        });

    }

    if (factButton && factOutput) {

        factButton.addEventListener("click", () => {

            const destinations = travelFacts.map(
                item => item.destination
            );

            const availableFacts = travelFacts.filter(
                item => item.fact.length > 0
            );

            const factTexts = availableFacts.map(
                item => `${item.destination}: ${item.fact}`
            );

            if (availableFacts.length === 0) {
                factOutput.textContent = "No travel facts are available.";
                return;
            }

            currentFactIndex =
                (currentFactIndex + 1) % availableFacts.length;

            const selectedFact = availableFacts[currentFactIndex];

            factOutput.textContent =
                `${selectedFact.destination}: ${selectedFact.fact}`;

            factOutput.classList.remove("fact-animation");

            void factOutput.offsetWidth;

            factOutput.classList.add("fact-animation");

            console.log("Available destinations:", destinations);
            console.log("Travel facts:", factTexts);

            if (typeof playSound === "function") {
                playSound("click");
            }

        });

    }

    if (themeButton) {
        function updateThemeButton() {
            const isNightMode = document.body.classList.contains("night-mode");

            themeButton.textContent = isNightMode
                ? "Switch to Day Mode"
                : "Switch to Night Mode";

            themeButton.setAttribute("aria-pressed", String(isNightMode));
        }

        updateThemeButton();

        themeButton.addEventListener("click", () => {
            const isNightMode = document.body.classList.toggle("night-mode");

            localStorage.setItem("travelTheme", isNightMode ? "dark" : "light");

            updateThemeButton();

            if (typeof playSound === "function") {
                playSound("click");
            }
        });
    }

});


$(document).ready(function () {

    function updateScrollProgress() {

        let scrollTop = $(window).scrollTop();

        let documentHeight =
            $(document).height() - $(window).height();

        let progress = 0;

        if (documentHeight > 0) {
            progress = (scrollTop / documentHeight) * 100;
        }

        $("#scrollProgress").css("width", progress + "%");

    }

    $(window).on("scroll", updateScrollProgress);

    $(window).on("resize", updateScrollProgress);

    updateScrollProgress();

});


$(document).ready(function () {

    let countersStarted = false;

    function startCounters() {

        if (countersStarted) {
            return;
        }

        let statisticsSection = $("#statistics");

        if (statisticsSection.length === 0) {
            return;
        }

        let sectionTop = statisticsSection.offset().top;

        let windowBottom =
            $(window).scrollTop() + $(window).height();

        if (windowBottom >= sectionTop) {

            countersStarted = true;

            $(".statistic-number").each(function () {

                let counter = $(this);

                let target = Number(counter.attr("data-target"));

                $({ value: 0 }).animate(
                    { value: target },
                    {
                        duration: 2000,
                        easing: "swing",

                        step: function (now) {
                            counter.text(
                                Math.floor(now).toLocaleString("en-US")
                            );
                        },

                        complete: function () {
                            counter.text(
                                target.toLocaleString("en-US")
                            );
                        }
                    }
                );

            });

        }

    }

    $(window).on("scroll", startCounters);

    $(window).on("resize", startCounters);

    startCounters();

});