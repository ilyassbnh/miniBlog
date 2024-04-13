document.querySelectorAll('.popup .image').forEach(image => {
    image.onclick = () => {
        image.nextElementSibling.style.display = 'block'; 
    }
});
document.querySelectorAll('.popup span').forEach(closeButton => {
    closeButton.onclick = () => {
        closeButton.parentElement.style.display = 'none';
    }
});

