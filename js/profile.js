document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem("travelUser"));
    const isLoggedIn = localStorage.getItem("travelLoggedIn");

    if (!user || isLoggedIn !== "true") {
        window.location.href = "contact.html";
        return;
    }

    document.getElementById("profileName").textContent = user.name;
    document.getElementById("profileEmail").textContent = user.email;

    document.getElementById("logoutBtn").addEventListener("click", function () {
        localStorage.removeItem("travelLoggedIn");
        window.location.href = "contact.html";
    });
});