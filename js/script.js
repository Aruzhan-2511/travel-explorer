
document.addEventListener("DOMContentLoaded", function () {

    const colorButtons = document.querySelectorAll(
        "#colorButton, #changeColorBtn, #colorChangeBtn"
    );

    const backgroundColors = [
        "#ffffff",
        "#f0f8ff",
        "#fff5e6",
        "#f0fff0",
        "#fceeff",
        "#fff0f0",
        "#e8f6fa",
        "#d8f3dc",
        "#e5ddf7"
    ];

    let currentColorIndex = 0;

    colorButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            currentColorIndex =
                (currentColorIndex + 1) % backgroundColors.length;

            document.body.style.backgroundColor =
                backgroundColors[currentColorIndex];
        });
    });


    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(function (question) {
        question.addEventListener("click", function () {
            const answer = question.nextElementSibling;

            if (!answer) {
                return;
            }

            const isOpen =
                question.getAttribute("aria-expanded") === "true" &&
                answer.classList.contains("active");


            question.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );


            if (isOpen) {
                answer.style.maxHeight = "0px";
            } else {
                answer.style.maxHeight =
                    answer.scrollHeight + "px";
            }

            const symbol = question.querySelector("span");

            if (symbol) {
                symbol.textContent = isOpen ? "+" : "−";
            }
        });
    });


    const searchInput = document.getElementById("destinationSearch");

    if (searchInput) {
        const destinationColumns = document.querySelectorAll(
            ".destination-column"
        );

        const destinationCards = document.querySelectorAll(
            ".destination-card"
        );

        const noResults = document.getElementById("noResults");
        const noDestinationsMessage = document.getElementById(
            "noDestinationsMessage"
        );

        const searchResultCount = document.getElementById(
            "searchResultCount"
        );

        function filterDestinations() {
            const searchText =
                searchInput.value.toLowerCase().trim();

            let visibleCards = 0;

            const items = destinationColumns.length > 0
                ? destinationColumns
                : destinationCards;

            items.forEach(function (item) {
                const card = item.classList.contains("destination-card")
                    ? item
                    : item.querySelector(".destination-card");

                if (!card) {
                    return;
                }

                const cardText = card.textContent.toLowerCase();
                const matches = cardText.includes(searchText);

                item.style.display = matches ? "" : "none";

                if (matches) {
                    visibleCards++;
                }
            });

            if (noResults) {
                noResults.style.display =
                    visibleCards === 0 ? "block" : "none";
            }

            if (noDestinationsMessage) {
                noDestinationsMessage.classList.toggle(
                    "d-none",
                    visibleCards !== 0
                );
            }

            if (searchResultCount) {
                if (searchText === "") {
                    searchResultCount.textContent =
                        "Showing all destinations";
                } else {
                    searchResultCount.textContent =
                        "Showing " + visibleCards +
                        " destination" +
                        (visibleCards === 1 ? "" : "s");
                }
            }
        }

        searchInput.addEventListener("input", filterDestinations);
    }


    const popupConfigurations = [
        {
            popupId: "subscribePopup",
            openId: "openSubscribeBtn",
            closeId: "closeSubscribeBtn"
        },
        {
            popupId: "questionPopup",
            openId: "openPopup",
            closeId: "closePopup"
        },
        {
            popupId: "subscriptionPopup",
            openId: "openPopup",
            closeId: "closePopup"
        },
        {
            popupId: "popupOverlay",
            openId: "openPopup",
            closeId: "closePopup"
        }
    ];

    function findPopupConfiguration() {
        for (const configuration of popupConfigurations) {
            const popup = document.getElementById(
                configuration.popupId
            );

            const openButton = document.getElementById(
                configuration.openId
            );

            const closeButton = document.getElementById(
                configuration.closeId
            );

            if (popup && openButton && closeButton) {
                return {
                    popup: popup,
                    openButton: openButton,
                    closeButton: closeButton
                };
            }
        }

        return null;
    }

    const popupConfiguration = findPopupConfiguration();

    function openModal(popup) {
        popup.classList.add("is-open", "show");
        popup.style.display = "";
        popup.setAttribute("aria-hidden", "false");

        const firstInput = popup.querySelector(
            "input, textarea, select"
        );

        if (firstInput) {
            firstInput.focus();
        }
    }

    function closeModal(popup, openButton) {
        popup.classList.remove("is-open", "show");
        popup.style.display = "";
        popup.setAttribute("aria-hidden", "true");

        if (openButton) {
            openButton.focus();
        }
    }

    if (popupConfiguration) {
        const popup = popupConfiguration.popup;
        const openButton = popupConfiguration.openButton;
        const closeButton = popupConfiguration.closeButton;

        openButton.addEventListener("click", function () {
            openModal(popup);
        });

        closeButton.addEventListener("click", function () {
            closeModal(popup, openButton);
        });

        popup.addEventListener("click", function (event) {
            if (event.target === popup) {
                closeModal(popup, openButton);
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" &&
                (popup.classList.contains("is-open") ||
                 popup.classList.contains("show"))) {
                closeModal(popup, openButton);
            }
        });
    }


    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = contactForm.querySelector("#name");
            const email = contactForm.querySelector("#email");
            const password = contactForm.querySelector("#password");
            const confirmPassword = contactForm.querySelector(
                "#confirmPassword"
            );
            const message = contactForm.querySelector("#message");

            const fields = [
                name,
                email,
                password,
                confirmPassword,
                message
            ].filter(Boolean);

            fields.forEach(function (field) {
                field.classList.remove("input-error");

                const errorElement = document.getElementById(
                    field.id + "Error"
                );

                if (errorElement) {
                    errorElement.textContent = "";
                }
            });

            const formSuccess = document.getElementById("formSuccess");

            if (formSuccess) {
                formSuccess.textContent = "";
            }

            let isValid = true;

            function showError(field, errorText) {
                if (!field) {
                    return;
                }

                field.classList.add("input-error");

                const errorElement = document.getElementById(
                    field.id + "Error"
                );

                if (errorElement) {
                    errorElement.textContent = errorText;
                }

                isValid = false;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (name && name.value.trim() === "") {
                showError(name, "Name is required.");
            }

            if (email) {
                if (email.value.trim() === "") {
                    showError(email, "Email is required.");
                } else if (!emailPattern.test(email.value.trim())) {
                    showError(email, "Enter a valid email address.");
                }
            }

            if (password) {
                if (password.value === "") {
                    showError(password, "Password is required.");
                } else if (password.value.length < 8) {
                    showError(
                        password,
                        "Password must be at least 8 characters."
                    );
                }
            }

            if (confirmPassword) {
                if (confirmPassword.value === "") {
                    showError(
                        confirmPassword,
                        "Please confirm your password."
                    );
                } else if (
                    password &&
                    password.value !== confirmPassword.value
                ) {
                    showError(
                        confirmPassword,
                        "Passwords do not match."
                    );
                }
            }

            if (message && message.value.trim() === "") {
                showError(message, "Message is required.");
            }

            if (isValid) {
                if (formSuccess) {
                    formSuccess.textContent =
                        "Form validated successfully!";
                }

                contactForm.reset();
            }
        });
    }


    const subscribeForm = document.getElementById("subscribeForm");

    if (subscribeForm) {
        subscribeForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("subscriberName");
            const email = document.getElementById("subscriberEmail");
            const password = document.getElementById(
                "subscriberPassword"
            );
            const confirmPassword = document.getElementById(
                "confirmPassword"
            );
            const formMessage = document.getElementById("formMessage");

            const inputs = [
                name,
                email,
                password,
                confirmPassword
            ];

            inputs.forEach(function (input) {
                if (input) {
                    input.classList.remove("is-invalid");
                }
            });

            if (formMessage) {
                formMessage.textContent = "";
                formMessage.classList.remove("success", "error");
            }

            let isValid = true;

            function markInvalid(input) {
                if (input) {
                    input.classList.add("is-invalid");
                }

                isValid = false;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!name || name.value.trim().length < 2) {
                markInvalid(name);
            }

            if (!email || !emailPattern.test(email.value.trim())) {
                markInvalid(email);
            }

            if (!password || password.value.length < 8) {
                markInvalid(password);
            }

            if (!confirmPassword ||
                !password ||
                password.value !== confirmPassword.value) {
                markInvalid(confirmPassword);
            }

            if (!isValid) {
                if (formMessage) {
                    formMessage.textContent =
                        "Please correct the highlighted fields.";
                    formMessage.classList.add("error");
                }

                return;
            }

            if (formMessage) {
                formMessage.textContent =
                    "Form validated successfully! (Demo only.)";
                formMessage.classList.add("success");
            }

            subscribeForm.reset();
        });
    }


    
const questionForm = document.getElementById("questionForm");

if (questionForm) {
    const firstStep = document.getElementById("formStep1");
    const secondStep = document.getElementById("formStep2");
    const nextButton = document.getElementById("nextStep");
    const backButton = document.getElementById("backStep");
    const stepDescription = document.getElementById("stepDescription");
    const formMessage = document.getElementById("formMessage");

    if (firstStep && secondStep && nextButton && backButton && stepDescription && formMessage) {
        nextButton.addEventListener("click", function () {
            const nameInput = document.getElementById("visitorName");
            const emailInput = document.getElementById("visitorEmail");

            if (!nameInput.checkValidity()) {
                nameInput.reportValidity();
                return;
            }

            if (!emailInput.checkValidity()) {
                emailInput.reportValidity();
                return;
            }

            firstStep.hidden = true;
            secondStep.hidden = false;

            stepDescription.textContent =
                "Step 2 of 2: Tell us your travel question.";

            formMessage.textContent = "";
            document.getElementById("visitorQuestion").focus();
        });

        backButton.addEventListener("click", function () {
            secondStep.hidden = true;
            firstStep.hidden = false;

            stepDescription.textContent =
                "Step 1 of 2: Tell us about yourself.";

            formMessage.textContent = "";
            document.getElementById("visitorName").focus();
        });

        questionForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!questionForm.checkValidity()) {
                questionForm.reportValidity();
                return;
            }

            const visitorName = document.getElementById("visitorName").value.trim();

            formMessage.textContent =
                "Thank you, " + visitorName +
                "! Your form has been completed successfully.";

            formMessage.classList.add("success-message");

            questionForm.reset();
            secondStep.hidden = true;
            firstStep.hidden = false;

            stepDescription.textContent =
                "Step 1 of 2: Tell us about yourself.";
        });
    }
}



    const popupForm = document.getElementById("popupForm");

    if (popupForm) {
        popupForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const nameInput = popupForm.querySelector(
                "#popupName, #name"
            );

            const emailInput = popupForm.querySelector(
                "#popupEmail, #email"
            );

            const popupSuccess = document.getElementById(
                "popupSuccess"
            );

            if (!popupForm.checkValidity()) {
                popupForm.reportValidity();
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (nameInput && nameInput.value.trim().length < 2) {
                alert("Please enter your name (at least 2 characters).");
                nameInput.focus();
                return;
            }

            if (emailInput &&
                !emailPattern.test(emailInput.value.trim())) {
                alert("Please enter a valid email address.");
                emailInput.focus();
                return;
            }

            if (popupSuccess) {
                popupSuccess.textContent =
                    "Form submitted successfully!";
            } else {
                alert(
                    "Thank you! Your form was validated successfully."
                );
            }

            popupForm.reset();

            const popup = popupForm.closest(".popup-overlay");

            if (popup && !popupSuccess) {
                closeModal(
                    popup,
                    popupConfiguration
                        ? popupConfiguration.openButton
                        : null
                );
            }
        });
    }

});
