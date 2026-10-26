document.addEventListener("DOMContentLoaded", function () {
    const categoryButtons = document.querySelectorAll(
        ".category-filters button[data-category]"
    );
    const tipsContainer = document.querySelector("#tipsContainer");
    const categoryMessage = document.querySelector("#categoryMessage");
    if (!tipsContainer || !categoryMessage) {
        return;
    }
    const travelTips = [
        {
            title: "Plan Ahead",
            category: "Cities",
            description:
                "Research transportation, accommodation and important places before travelling."
        },
        {
            title: "Protect Your Documents",
            category: "Nature",
            description:
                "Keep your passport, money and important documents in a safe place."
        },
        {
            title: "Stay Connected",
            category: "Mountains",
            description:
                "Keep your phone charged and save important travel information."
        },
        {
            title: "Pack for the Beach",
            category: "Beaches",
            description:
                "Bring sunscreen, comfortable clothes and other beach essentials."
        },
        {
            title: "Respect Local Culture",
            category: "Cities",
            description:
                "Learn about local customs and respect the traditions of the places you visit."
        },
        {
            title: "Prepare for the Weather",
            category: "Mountains",
            description:
                "Check the forecast and bring suitable clothing for changing mountain weather."
        },
        {
            title: "Protect Nature",
            category: "Nature",
            description:
                "Avoid littering and respect wildlife when exploring natural areas."
        },
        {
            title: "Stay Safe in the Sun",
            category: "Beaches",
            description:
                "Use sunscreen, drink enough water and follow local beach safety guidance."
        }
    ];
    function displayTips(tips) {
        tipsContainer.innerHTML = "";
        tips.forEach(function (tip) {
            const column = document.createElement("div");
            column.className = "col-sm-12 col-md-4 col-lg-4";
            const card = document.createElement("div");
            card.className = "card h-100";
            card.dataset.category = tip.category;
            const cardBody = document.createElement("div");
            cardBody.className = "card-body";
            const title = document.createElement("h3");
            title.textContent = tip.title;
            const description = document.createElement("p");
            description.textContent = tip.description;
            cardBody.append(title, description);
            card.appendChild(cardBody);
            column.appendChild(card);
            tipsContainer.appendChild(column);
        });
    }
    function filterTips(selectedCategory) {
        let filteredTips;
        switch (selectedCategory) {
            case "Beaches":
                filteredTips = travelTips.filter(function (tip) {
                    return tip.category === "Beaches";
                });
                break;
            case "Mountains":
                filteredTips = travelTips.filter(function (tip) {
                    return tip.category === "Mountains";
                });
                break;
            case "Cities":
                filteredTips = travelTips.filter(function (tip) {
                    return tip.category === "Cities";
                });
                break;
            case "Nature":
                filteredTips = travelTips.filter(function (tip) {
                    return tip.category === "Nature";
                });
                break;
            case "All":
                filteredTips = travelTips;
                break;
            default:
                filteredTips = [];
        }
        displayTips(filteredTips);
        categoryMessage.textContent =
            selectedCategory === "All"
                ? "Showing all travel tips. Tips displayed: " +
                  filteredTips.length + "."
                : "Showing " + selectedCategory.toLowerCase() +
                  " travel tips. Tips displayed: " +
                  filteredTips.length + ".";
    }
    categoryButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            categoryButtons.forEach(function (item) {
                item.classList.remove("active");
            });
            button.classList.add("active");
            filterTips(button.dataset.category);
        });
    });
    displayTips(travelTips);
    const allButton = document.querySelector(
        '.category-filters button[data-category="All"]'
    );
    if (allButton) {
        allButton.classList.add("active");
    }
    categoryMessage.textContent =
        "Showing all travel tips. Tips displayed: " +
        travelTips.length + ".";
});