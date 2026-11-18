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

            mainImage.style.opacity = "0";
            
            const newImage = new Image();
            newImage.src = imagePath;

            newImage.onload = function () {
                mainImage.setAttribute("src", imagePath);
                mainImage.setAttribute("alt", imageDescription);
                mainImage.style.opacity = "1";
            };


            newImage.onerror = function () {
                mainImage.style.opacity = "1";
                galleryMessage.textContent = "Unable to load this image.";
            };


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


$(document).ready(function () {

    console.log("Autocomplete is ready!");

    const destinations = [
        "Bora Bora",
        "Netherlands",
        "Switzerland",
        "Paris",
        "Dubai",
        "Istanbul",
        "Japan",
        "Italy",
        "Greece"
    ];

    const searchInput = $("#destinationSearch");
    const suggestions = $("#suggestions");
    const galleryCards = $("#galleryCards .card");

    function filterGallery(query) {
        let visibleCount = 0;
        galleryCards.each(function () {
            const card = $(this);
            const destinationName = card.find(".card-title")
                .text()
                .toLowerCase();

            const matches = destinationName.includes(query);
            card.toggle(matches);

            if (matches) {   
                visibleCount++; 
            }
        });
        return visibleCount;
    }

    console.log("Search input found:", searchInput.length);
    console.log("Suggestions container found:", suggestions.length);

    searchInput.on("input", function () {

        let query = $(this).val().trim().toLowerCase();
        filterGallery(query);

        console.log("Input event:", query);

        suggestions.empty().hide();

        if (query === "") {
            return;
        }

        let matches = destinations.filter(function (destination) {
            return destination.toLowerCase().includes(query);
        });

        console.log("Matching destinations:", matches);

        if (matches.length > 0) {

            matches.forEach(function (destination) {

                const suggestion = $("<button>")
                    .attr("type", "button")
                    .addClass("suggestion-item")
                    .text(destination);

                suggestions.append(suggestion);
            });

            suggestions.show();

        } else {

            suggestions.text("No destinations found.").show();
        }
    });

    suggestions.on("click", ".suggestion-item", function () {
    
        console.log("Suggestion clicked!");

        const selectedDestination = $(this).text();

        console.log("Selected:", selectedDestination);

        searchInput.val(selectedDestination);

        filterGallery(selectedDestination.toLowerCase());
    
        suggestions.empty().hide();

    });

});

$(document).ready(function () {
    function lazyLoadImages() {
        const windowBottom = $(window).scrollTop() + $(window).height();
        $("img[data-src]").each(function () {
            const image = $(this);
            const position = image.offset();
            if (!position) {
                return;
            }
            const imageTop = position.top;
            if (windowBottom > imageTop - 100) {
                image.attr("src", image.attr("data-src"));
                image.removeAttr("data-src");
            }
        });
    }

    lazyLoadImages();
    $(window).on("scroll", lazyLoadImages);
    $("#travelCarousel").on("slid.bs.carousel", lazyLoadImages);
});