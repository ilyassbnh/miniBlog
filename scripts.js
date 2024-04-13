
document.querySelectorAll('.popup .image').forEach(image => {
    image.onclick = () => {
        document.querySelector('.popup .card').style.display = 'block';
        document.querySelector('.popup .card img').src = image.querySelector('img').src;
    }
});

document.querySelector('.popup span').onclick = () => {
    document.querySelector('.popup').style.display = 'none';
}
