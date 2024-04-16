document.addEventListener("DOMContentLoaded", function () {
    var popupImage = document.getElementById("popup-image");
    document.querySelectorAll('.post-image').forEach(image => {
        image.onclick = () => {
            var clickedImageSrc = image.querySelector("img").getAttribute("src");
            popupImage.setAttribute("src", clickedImageSrc);
            document.querySelector(".popup").style.display = "block";
        }
    });
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
    input.addEventListener('change', function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            const imagePreview = document.createElement('img');
            imagePreview.src = e.target.result;
            document.body.appendChild(imagePreview);
        };
        reader.readAsDataURL(file);
    });

    // Function to add a new post
    function addPost() {
        // Get the text and image input elements from the modal
        var text = document.getElementById('postText').value;
        var imageInput = document.getElementById('imageUpload');

        // Get the container where posts will be added
        var postsContainer = document.querySelector('.bottom-profil');

        // Create a new post element
        var post = document.createElement('div');
        post.className = 'post';

        // Create the card element for the post
        var card = document.createElement('div');
        card.className = 'card mb-3';
        card.style.maxWidth = '540px';

        // Create the card content
        var cardContent = `
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${imageInput.files[0].name}" class="img-fluid rounded-start" alt="Post Image">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <!-- Add like, comment, and share icons here -->
                        <p class="card-text">${text}</p>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Add comment" aria-label="Recipient's username" aria-describedby="button-addon2">
                            <button class="btn btn-outline-secondary" type="button" id="button-addon2"><i class="fa-regular fa-face-smile" style="color: #000000;"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Set the card content
        card.innerHTML = cardContent;

        // Append the card to the post element
        post.appendChild(card);

        // Append the post to the posts container
        postsContainer.appendChild(post);

        // Close the modal
        var modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
        modal.hide();

        // Reset the input fields
        document.getElementById('postText').value = '';
        imageInput.value = '';
    }
    

});
