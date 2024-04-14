document.querySelectorAll('.post-image').forEach(image => {
    image.onclick = () => {
        image.parentElement.nextElementSibling.style.display = 'block'; 
    }
});
document.querySelectorAll('.popup span').forEach(closeButton => {
    closeButton.onclick = () => {
        closeButton.parentElement.style.display = 'none';
    }
});