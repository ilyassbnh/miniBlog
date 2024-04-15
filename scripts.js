document.addEventListener("DOMContentLoaded", function() {
    // Get the popup image element
    var popupImage = document.getElementById("popup-image");

    // Get all clickable images
    document.querySelectorAll('.post-image').forEach(image => {
        image.onclick = () => {
            // Get the source of the clicked image
            var clickedImageSrc = image.querySelector("img").getAttribute("src");

            // Update the source of the popup image
            popupImage.setAttribute("src", clickedImageSrc);

            // Show the popup
            document.querySelector(".popup").style.display = "block";
        }
    });

    // Add click event listener to close button
    document.querySelector(".popup span").addEventListener("click", function() {
        // Hide the popup
        document.querySelector(".popup").style.display = "none";
    });
});
