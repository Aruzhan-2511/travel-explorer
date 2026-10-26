document.addEventListener("DOMContentLoaded", function () {
    function updateDateTime() {
        const dateTimeElements = document.querySelectorAll(
            "#currentDateTime, #dateTime"
        );
        if (dateTimeElements.length === 0) {
            return;
        }
        const now = new Date();
        const formattedDateTime = now.toLocaleString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
        dateTimeElements.forEach(function (element) {
            element.textContent = formattedDateTime;
        });
    }
    updateDateTime();
    setInterval(updateDateTime, 1000);
});