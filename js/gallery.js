document.addEventListener("DOMContentLoaded", function () {
    const mainImage = document.getElementById("mainGalleryImage");
    const thumbnails = document.querySelectorAll(".gallery-thumbnail");
    const galleryMessage = document.getElementById("galleryMessage");

    if (!mainImage || !galleryMessage || thumbnails.length === 0) {
        return;
    }

    thumbnails.forEach(function (thumbnail) {
        thumbnail.addEventListener("click", function () {
            playSound("click");
            const imagePath = thumbnail.dataset.image;
            const imageDescription = thumbnail.dataset.alt;

            mainImage.setAttribute("src", imagePath);
            mainImage.setAttribute("alt", imageDescription);

            thumbnails.forEach(function (item) {
                item.classList.remove("active");
            });

            thumbnail.classList.add("active");

            const destination = imageDescription
                .replace("Beautiful beach in ", "")
                .replace("Beautiful view of ", "")
                .replace("Swiss mountains", "Switzerland")
                .replace("View of ", "");

            galleryMessage.textContent =
                "Selected destination: " + destination;
        });
    });
});

id="gjs81k"
