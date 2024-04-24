document.addEventListener("DOMContentLoaded", function () {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let editingPostIndex = null; 
  
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
          editingPostIndex = index; 
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
      
      //allows the user to upload an image
      const imageFile = imageInput.files[0];
      const reader = new FileReader();
  
      reader.onload = function () {
        const imageData = reader.result;
  
        if (editingPostIndex !== null) {
          // Si editingPostIndex n'est pas nul, cela signifie que nous MAJ une publication existante
          const editedPost = {
            image: imageData || posts[editingPostIndex].image, // Keep the existing image if no new image is selected
            title: titleInput.value,
            likes: posts[editingPostIndex].likes, // Keep the existing likes count
            liked: posts[editingPostIndex].liked, // Keep the existing liked status
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
  
  
  