document.addEventListener("DOMContentLoaded", function () {
    var popupImage = document.getElementById("popup-image");

    // Popup function for both existing and dynamically added posts
    function attachPopupFunctionality() {
        document.querySelectorAll('.post-image').forEach(image => {
            image.onclick = () => {
                var clickedImageSrc = image.querySelector("img").getAttribute("src");
                popupImage.setAttribute("src", clickedImageSrc);
                document.querySelector(".popup").style.display = "block";
            }
        });
    }

    // Initially attach popup functionality to existing posts
    attachPopupFunctionality();

    // Popup function for dynamically added posts
    function attachPopupToNewPost(image) {
        image.onclick = () => {
            var clickedImageSrc = image.getAttribute("src");
            popupImage.setAttribute("src", clickedImageSrc);
            document.querySelector(".popup").style.display = "block";
        }
    }

    document.querySelector(".popup span").addEventListener("click", function () {
        document.querySelector(".popup").style.display = "none";
    });

    // Get a reference to the like button element and the icon element
    const likeButton = document.getElementById("like-button");
    // Get all "like" buttons by their class name
    const likeButtons = document.querySelectorAll(".like-button");

    // Initialize a variable to track the like state for each item
    const isLiked = Array.from(likeButtons).fill(false);

    // Function to toggle the like state and update the button icon
    function toggleLike(index) {
        return function () {
            const likeButton = likeButtons[index];
            const likeIcon = likeButton.querySelector("i");

            if (isLiked[index]) {
                likeIcon.classList.remove("fas");
                likeIcon.classList.add("far");
                likeIcon.style.color = ""; // Remove the liked icon color
            } else {
                likeIcon.classList.remove("far");
                likeIcon.classList.add("fas");
                likeIcon.style.color = "#ff0000"; // Set the liked icon color to red
            }
            isLiked[index] = !isLiked[index];
        };
    }

    // Add a click event listener to each "like" button
    likeButtons.forEach((button, index) => {
        button.addEventListener("click", toggleLike(index));
    });

    const input = document.getElementById('imageUpload');
    input.addEventListener('change', function (event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            const imagePreview = document.createElement('img');
            imagePreview.src = e.target.result;
            // Add the existing class to the dynamically created image
            imagePreview.classList.add('post-image');
            // Append the dynamically added image to the "buttom-profil" div
            document.getElementById('posts').appendChild(imagePreview);
            // Attach popup functionality to the dynamically added image
            attachPopupToNewPost(imagePreview);
        };
        reader.readAsDataURL(file);
    });
    
    //delete function
    const delet=document.getElementById("delete_button");
    const search=document.getElementById("id-search");

    delet.addEventListener('click', function (event) {
        search.value
    });
});
