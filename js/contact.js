
document.addEventListener("DOMContentLoaded", function () {

    const multiStepForm = document.getElementById("multiStepForm");
    const steps = document.querySelectorAll(".form-step");

    const nextButton = document.getElementById("nextStep");
    const backButton = document.getElementById("backStep");
    const submitButton = document.getElementById("submitTravel");
    const resetButton = document.getElementById("resetTravel");

    const travelStatus = document.getElementById("travelStatus");
    const travelSummary = document.getElementById("travelSummary");

    const spinner = $("#submitSpinner");
    const submitText = $("#submitText");
    const notification = $("#travelStatus");

    let currentStep = 0;

    function showStep(step) {
        steps.forEach(function (item, index) {
            item.classList.toggle("active-step", index === step);
        });

        backButton.style.display = step === 0 ? "none" : "inline-block";
        nextButton.style.display = step === steps.length - 1 ? "none" : "inline-block";
        submitButton.style.display = step === steps.length - 1 ? "inline-block" : "none";

        travelStatus.textContent = "";

        if (step === 2) {
            updateSummary();
        }
    }

    function validateStep() {
        const fields = [
            ["travelName", "Please enter your name."],
            ["travelEmail", "Please enter a valid email."],
            ["travelDestination", "Please select a destination."],
            ["travelMessage", "Please enter your travel plans."]
        ];

        let isValid = true;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        fields.forEach(function (field) {
            const input = document.getElementById(field[0]);
            const error = document.getElementById(field[0] + "Error");

            if (!steps[currentStep].contains(input)) {
                return;
            }

            const value = input.value.trim();
            error.textContent = "";

            if (value === "") {
                error.textContent = field[1];
                isValid = false;
            } else if (field[0] === "travelEmail" && !emailPattern.test(value)) {
                error.textContent = "Please enter a valid email.";
                isValid = false;
            }
        });

        return isValid;
    }

    function updateSummary() {
        const name = document.getElementById("travelName").value;
        const email = document.getElementById("travelEmail").value;
        const destination = document.getElementById("travelDestination").value;
        const message = document.getElementById("travelMessage").value;

        travelSummary.textContent =
            "Welcome, " + name + "!" +
            "\n\nName: " + name +
            "\nEmail: " + email +
            "\nDestination: " + destination +
            "\nTravel Plans: " + message;

        travelSummary.style.whiteSpace = "pre-line";
    }

    function changeStep(action, callback) {

        switch (action) {
            case "next":
                if (validateStep() && currentStep < steps.length - 1) {
                    currentStep++;
                }
                break;

            case "back":
                if (currentStep > 0) {
                    currentStep--;
                }
                break;

            case "reset":
                multiStepForm.reset();
                currentStep = 0;

                multiStepForm.querySelectorAll(".error-message").forEach(function (error) {
                    error.textContent = "";
                });

                break;
        }

        callback(currentStep);
    }

    nextButton.addEventListener("click", function () {
        changeStep("next", showStep);
    });

    backButton.addEventListener("click", function () {
        changeStep("back", showStep);
    });

    resetButton.addEventListener("click", function () {
        changeStep("reset", showStep);
    });

    multiStepForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (currentStep === steps.length - 1) {
            travelStatus.textContent = "Travel inquiry submitted successfully!";
            travelStatus.style.color = "green";

            notification.hide();

            spinner.removeClass("d-none");
            submitText.text("Please wait...");
            $(submitButton).prop("disabled", true);

            setTimeout(function () {
                spinner.addClass("d-none");
                submitText.text("Submit");
                $(submitButton).prop("disabled", false);

                notification.fadeIn(400).delay(2000).fadeOut(400);
            }, 2000);
        }
    });

    const stars = document.querySelectorAll(".star");
    const ratingMessage = document.getElementById("ratingMessage");

    stars.forEach(function (star, index) {
        star.addEventListener("click", function () {

            stars.forEach(function (item, i) {
                item.style.color = i <= index ? "gold" : "gray";
            });

            ratingMessage.textContent =
                "You rated us " + (index + 1) + " out of 5 stars!";
        });
    });

    showStep(currentStep);

});
