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
    let isNightMode = false;

    if (greetingButton && greeting) {
        greetingButton.addEventListener("click", () => {
            greeting.textContent =
                "Hello, explorer! Where will your next adventure take you?";

            greeting.style.fontWeight = "bold";
            greeting.style.transition = "color 0.3s ease";
            greeting.style.color = "#0077b6";

            if (typeof playSound === "function") {
                playSound("click");
            }
        });
    }

    if (factButton && factOutput) {
        factButton.addEventListener("click", () => {
            const destinations = travelFacts.map(item => item.destination);

            const availableFacts = travelFacts.filter(
                item => item.fact.length > 0
            );

            const factTexts = availableFacts.map(
                item => `${item.destination}: ${item.fact}`
            );

            factTexts.forEach(text => {
                console.log(text);
            });

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

            if (typeof playSound === "function") {
                playSound("click");
            }
        });
    }
});