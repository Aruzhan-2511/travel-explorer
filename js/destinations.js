$(document).ready(function () {

    const searchInput = $("#destinationSearch");
    const destinationCards = $(".destination-column");
    const resultCount = $("#searchResultCount");
    const noResults = $("#noDestinationsMessage");

    searchInput.on("input", function () {

        const searchValue = $(this).val().toLowerCase().trim();

        let visibleCount = 0;

        destinationCards.filter(function () {

            const cardText = $(this).text().toLowerCase();

            const isMatch = cardText.includes(searchValue);

            if (isMatch) {
                $(this).show();
                visibleCount++;
            } else {
                $(this).hide();
            }

        });

        if (searchValue === "") {
            resultCount.text("Showing all destinations");
        } else {
            resultCount.text("Found " + visibleCount + " destination(s)");
        }

        if (visibleCount === 0) {
            noResults.removeClass("d-none").show();
        } else {
            noResults.addClass("d-none").hide();
        }

    });

});


document.addEventListener("DOMContentLoaded", () => {

    const readMoreButtons = document.querySelectorAll(".read-more-btn");
    const themeButton = document.getElementById("destinationThemeToggle");
    const factButton = document.getElementById("destinationFactButton");
    const factOutput = document.getElementById("destinationFact");
    const greeting = document.getElementById("destinationGreeting");

    const destinationFacts = [
        {
            name: "Bora Bora",
            fact: "Bora Bora is famous for its turquoise lagoon."
        },
        {
            name: "Paris",
            fact: "Paris is home to the world-famous Louvre Museum."
        },
        {
            name: "Japan",
            fact: "Japan combines modern cities with traditional temples."
        },
        {
            name: "Dubai",
            fact: "Dubai is known for its modern skyline and desert experiences."
        },
        {
            name: "Greece",
            fact: "Greece is known for ancient landmarks and Mediterranean islands."
        }
    ];

    let factIndex = -1;
    let isNightMode = false;

    readMoreButtons.forEach(button => {

        button.addEventListener("click", () => {

            const card = button.closest(".destination-card");

            if (!card) return;

            const extraInfo = card.querySelector(".destination-extra");

            if (!extraInfo) return;

            const isExpanded =
                button.getAttribute("aria-expanded") === "true";

            extraInfo.classList.toggle("d-none", isExpanded);

            button.setAttribute("aria-expanded", String(!isExpanded));

            button.textContent = isExpanded
                ? "Read More"
                : "Show Less";

            if (typeof playSound === "function") {
                playSound("click");
            }

        });

    });

    if (factButton && factOutput) {

        factButton.addEventListener("click", () => {

            const names = destinationFacts.map(item => item.name);

            const filteredFacts = destinationFacts.filter(
                item => item.fact.trim() !== ""
            );

            if (filteredFacts.length === 0) {
                factOutput.textContent = "No facts are available.";
                return;
            }

            factIndex = (factIndex + 1) % filteredFacts.length;

            const selected = filteredFacts[factIndex];

            factOutput.textContent =
                `${selected.name}: ${selected.fact}`;

            factOutput.classList.remove("fact-animation");

            void factOutput.offsetWidth;

            factOutput.classList.add("fact-animation");

            console.log("Destination names:", names);

            if (typeof playSound === "function") {
                playSound("click");
            }

        });

    }

    if (themeButton) {

        themeButton.addEventListener("click", () => {

            isNightMode = !isNightMode;

            document.body.classList.toggle("night-mode", isNightMode);

            themeButton.textContent = isNightMode
                ? "Switch to Day Mode"
                : "Switch to Night Mode";

            themeButton.setAttribute("aria-pressed", String(isNightMode));

            if (greeting) {
                greeting.textContent = isNightMode
                    ? "Enjoy exploring with our night theme!"
                    : "Every destination has a story. Find yours!";
            }

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

document.addEventListener("DOMContentLoaded", function () {
    const weatherButton = document.getElementById("checkWeather");
    const weatherCity = document.getElementById("weatherCity");
    const weatherResult = document.getElementById("weatherResult");

    if (!weatherButton || !weatherCity || !weatherResult) {
        return;
    }

    weatherButton.addEventListener("click", async function () {
        const city = weatherCity.value;

        weatherResult.textContent = "Loading weather data...";
        weatherButton.disabled = true;

        try {
            const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

            const geoResponse = await fetch(geoUrl);

            if (!geoResponse.ok) {
                throw new Error("Location request failed.");
            }

            const geoData = await geoResponse.json();

            if (!geoData.results || geoData.results.length === 0) {
                throw new Error("Destination not found.");
            }

            const location = geoData.results[0];

            const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto`;

            const weatherResponse = await fetch(weatherUrl);

            if (!weatherResponse.ok) {
                throw new Error("Weather request failed.");
            }

            const weatherData = await weatherResponse.json();

            if (!weatherData.current) {
                throw new Error("Weather data is unavailable.");
            }

            const current = weatherData.current;

            weatherResult.textContent =
                `${location.name}, ${location.country}: ` +
                `Temperature: ${current.temperature_2m}°C | ` +
                `Humidity: ${current.relative_humidity_2m}% | ` +
                `Wind speed: ${current.wind_speed_10m} km/h`;

        } catch (error) {
            weatherResult.textContent =
                "Unable to load weather. Please try again.";

            console.error(error);

        } finally {
            weatherButton.disabled = false;
        }
    });
});
