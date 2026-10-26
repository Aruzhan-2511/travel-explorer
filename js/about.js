
document.addEventListener("DOMContentLoaded", function () {

    const teamMembers = [
        {
            name: "Zhibek",
            role: "Home and Destinations",
            image: "images/Zhibek.jpg",
            page: "destinations.html",
            description: "Responsible for Home and Destinations pages. She introduces our website and helps visitors discover interesting travel destinations.",

            getInfo: function () {
                return this.name + " works on " + this.role + ".";
            }
        },
        {
            name: "Albina",
            role: "Travel Tips and Gallery",
            image: "images/Albina.jpg",
            page: "tips.html",
            description: "Responsible for Travel Tips and Gallery pages. She shares useful travel information and beautiful travel photos to inspire future trips.",

            getInfo: function () {
                return this.name + " works on " + this.role + ".";
            }
        },
        {
            name: "Aruzhan",
            role: "About Team and Contact",
            image: "images/Aruzhan.jpg",
            page: "contact.html",
            description: "Responsible for About Team and Contact pages. She introduces our team and helps visitors communicate with us.",

            getInfo: function () {
                return this.name + " works on " + this.role + ".";
            }
        }
    ];

    const teamContainer = document.getElementById("teamContainer");
    const selectedMember = document.getElementById("selectedMember");
    const memberDescription = document.getElementById("memberDescription");

    const teamCards = teamMembers.map(function (member) {
        return `
            <div class="team-card">
                <img src="${member.image}" class="team-photo" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.description}</p>
                <a href="${member.page}" class="btn btn-primary">View Page</a>
                <button type="button" class="btn btn-outline-primary mt-2 select-member">
                    More Info
                </button>
            </div>
        `;
    });

    teamContainer.innerHTML = teamCards.join("");


    const infoButtons = document.querySelectorAll(".select-member");

    infoButtons.forEach(function (button, index) {

        button.addEventListener("click", function () {

            const member = teamMembers[index];

            selectedMember.textContent = member.name;
            memberDescription.textContent = member.getInfo();

            playSound("click");

            const card = button.closest(".team-card");

            card.classList.remove("card-selected");
            void card.offsetWidth;
            card.classList.add("card-selected");

        });

    });

});
