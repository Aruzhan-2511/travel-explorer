
document.addEventListener("DOMContentLoaded", function () {

    const multiStepForm = document.getElementById("multiStepForm");
    const steps = document.querySelectorAll(".form-step");

    const nextButton = document.getElementById("nextStep");
    const backButton = document.getElementById("backStep");
    const submitButton = document.getElementById("submitTravel");
    const resetButton = document.getElementById("resetTravel");

    const travelStatus = document.getElementById("travelStatus");
    const travelSummary = document.getElementById("travelSummary");

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
        const inputs = steps[currentStep].querySelectorAll(
            "input, select, textarea"
        );

        for (let input of inputs) {
            if (!input.checkValidity()) {
                input.reportValidity();
                return false;
            }
        }

        return true;
    }

    function updateSummary() {
        const name = document.getElementById("travelName").value;
        const email = document.getElementById("travelEmail").value;
        const destination = document.getElementById("travelDestination").value;
        const message = document.getElementById("travelMessage").value;

        travelSummary.textContent =
            "Name: " + name +
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
        }
    });

    showStep(currentStep);

});
