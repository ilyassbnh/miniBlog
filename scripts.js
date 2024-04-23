document.addEventListener("DOMContentLoaded", function () {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let editingPostIndex = null; // Track the index of the post being edited
  
    const renderPosts = () => {
      const postsContainer = document.getElementById("postsContainer");
      postsContainer.innerHTML = "";
  
      posts.forEach((post, index) => {
        const card = document.createElement("div");
        card.classList.add("card", "mb-3");
        card.style.maxWidth = "540px";
        card.style.position = "relative";
  
        card.innerHTML = `
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img src="${post.image}"
                                        class="img-fluid rounded-start" alt="...">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">${post.title}</h5>
                                        <i class="fa-regular fa-heart${
                                          post.liked ? " fas" : ""
                                        }" style="color: #000000;"></i>
                                        <i class="fa-regular fa-comment" style="color: #000000;"></i>
                                        <i class="fa-regular fa-paper-plane" style="color: #000000;"></i>
                                        <p class="card-text">${
                                          post.likes
                                        } likes</p>
                                        <p class="card-text">${
                                          post.description
                                        }</p>
                                        <div class="input-group mb-3">
                                            <input type="text" class="form-control" placeholder="Add comment"
                                                aria-label="Recipient's username" aria-describedby="button-addon2">
                                            <button class="btn btn-outline-secondary" type="button" id="button-addon2"><i
                                                    class="fa-regular fa-face-smile" style="color: #000000;"></i></button>
                                        </div>
                                        <button class="btn btn-primary edit-btn" style="position: absolute; top: 10px; right: 60px;">Edit</button>
                                        <button class="btn btn-danger delete-btn" style="position: absolute; top: 10px; right: 10px;">X</button>
                                    </div>
                                </div>
                            </div>
                `;
  
        postsContainer.appendChild(card);
  
        const likeButton = card.querySelector(".fa-heart");
        likeButton.addEventListener("click", () => {
          post.liked = !post.liked;
          post.likes = post.liked ? post.likes + 1 : post.likes - 1;
          localStorage.setItem("posts", JSON.stringify(posts));
          renderPosts();
        });
  
        const deleteButton = card.querySelector(".delete-btn");
        deleteButton.addEventListener("click", () => {
          posts.splice(index, 1);
          localStorage.setItem("posts", JSON.stringify(posts));
          renderPosts();
        });
  
        const editButton = card.querySelector(".edit-btn");
        editButton.addEventListener("click", () => {
          editingPostIndex = index; // Set the index of the post being edited
          const post = posts[index];
          document.getElementById("imageInput").value = ""; // Clear the input value to prevent re-uploading the image
          document.getElementById("titleInput").value = post.title;
          document.getElementById("descriptionInput").value = post.description;
          document.getElementById("submitButton").innerText = "Update"; // Change submit button text
        });
      });
    };
  
    renderPosts();
  
    const imageUploadForm = document.getElementById("imageUploadForm");
    imageUploadForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const imageInput = document.getElementById("imageInput");
      const titleInput = document.getElementById("titleInput");
      const descriptionInput = document.getElementById("descriptionInput");
  
      const imageFile = imageInput.files[0];
      const reader = new FileReader();
  
      reader.onload = function () {
        const imageData = reader.result;
  
        if (editingPostIndex !== null) {
          // If editingPostIndex is not null, it means we are updating an existing post
          const editedPost = {
            image: imageData || posts[editingPostIndex].image, // Keep the existing image if no new image is selected
            title: titleInput.value,
            likes: posts[editingPostIndex].likes, // Retain the existing likes count
            liked: posts[editingPostIndex].liked, // Retain the existing liked status
            description: descriptionInput.value,
          };
  
          posts[editingPostIndex] = editedPost;
          editingPostIndex = null; // Reset editingPostIndex after updating the post
        } else {
          // If editingPostIndex is null, it means we are adding a new post
          const newPost = {
            image: imageData,
            title: titleInput.value,
            likes: 0,
            liked: false,
            description: descriptionInput.value,
          };
          posts.push(newPost);
        }
  
        localStorage.setItem("posts", JSON.stringify(posts));
        renderPosts();
        resetForm();
      };
  
      reader.readAsDataURL(imageFile);
    });
  
    const resetForm = () => {
      // Reset the form fields and submit button text after submission
      document.getElementById("imageInput").value = "";
      document.getElementById("titleInput").value = "";
      document.getElementById("descriptionInput").value = "";
      document.getElementById("submitButton").innerText = "Upload Image";
    };
  });
  
  
  

// var popupImage = document.getElementById("popup-image");

// // Popup function for both existing and dynamically added posts
// function attachPopupFunctionality() {
//     document.querySelectorAll('.post-image').forEach(image => {
//         image.onclick = () => {
//             var clickedImageSrc = image.querySelector("img").getAttribute("src");
//             popupImage.setAttribute("src", clickedImageSrc);
//             document.querySelector(".popup").style.display = "block";
//         }
//     });
// }

// // Initially attach popup functionality to existing posts
// attachPopupFunctionality();

// // Popup function for dynamically added posts
// function attachPopupToNewPost(image) {
//     image.onclick = () => {
//         var clickedImageSrc = image.getAttribute("src");
//         popupImage.setAttribute("src", clickedImageSrc);
//         document.querySelector(".popup").style.display = "block";
//     }
// }

// document.querySelector(".popup span").addEventListener("click", function () {
//     document.querySelector(".popup").style.display = "none";
// });

// // Get a reference to the like button element and the icon element
// const likeButton = document.getElementById("like-button");
// // Get all "like" buttons by their class name
// const likeButtons = document.querySelectorAll(".like-button");

// // Initialize a variable to track the like state for each item
// const isLiked = Array.from(likeButtons).fill(false);

// // Function to toggle the like state and update the button icon
// function toggleLike(index) {
//     return function () {
//         const likeButton = likeButtons[index];
//         const likeIcon = likeButton.querySelector("i");

//         if (isLiked[index]) {
//             likeIcon.classList.remove("fas");
//             likeIcon.classList.add("far");
//             likeIcon.style.color = ""; // Remove the liked icon color
//         } else {
//             likeIcon.classList.remove("far");
//             likeIcon.classList.add("fas");
//             likeIcon.style.color = "#ff0000"; // Set the liked icon color to red
//         }
//         isLiked[index] = !isLiked[index];
//     };
// }

// // Add a click event listener to each "like" button
// likeButtons.forEach((button, index) => {
//     button.addEventListener("click", toggleLike(index));
// });

// const input = document.getElementById('imageUpload');
// input.addEventListener('change', function (event) {
//     const file = event.target.files[0];
//     const reader = new FileReader();
//     reader.onload = function (e) {
//         const imagePreview = document.createElement('img');
//         imagePreview.src = e.target.result;
//         // Add the existing class to the dynamically created image
//         imagePreview.classList.add('post-image');
//         // Append the dynamically added image to the "buttom-profil" div
//         document.getElementById('posts').appendChild(imagePreview);
//         // Attach popup functionality to the dynamically added image
//         attachPopupToNewPost(imagePreview);
//     };
//     reader.readAsDataURL(file);
// });

// //delete function
// const delet=document.getElementById("delete_button");
// const search=document.getElementById("id-search");

// delet.addEventListener('click', function (event) {
//     search.value
// });
