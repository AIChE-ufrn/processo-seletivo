
// Link único do formulário de inscrição
const inscricaoURL = 'https://forms.gle/13yJs31cuJRycKgu8'; // Substitua pelo link real

function openForm() {
    if (inscricaoURL && !inscricaoURL.includes('SEU_LINK_AQUI')) {
        window.open(inscricaoURL, '_blank');
    } else {
        alert('Formulário em breve! Por favor, aguarde a configuração do link.');
        console.log('Formulário de inscrição solicitado');
    }
}

// Adiciona efeito de carregamento suave
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});


// Carrossel de fotos com efeito de arrastar lateral (slide)
let currentPhoto = 0;
let carouselInterval = null;
let isSliding = false;

function showPhoto(index, direction = 1) {
    const photos = document.querySelectorAll('.carousel-photo');
    if (!photos.length || isSliding) return;
    const total = photos.length;
    const prev = currentPhoto;
    if (index === prev) return;
    isSliding = true;
    photos.forEach((img, i) => {
        img.classList.remove('slide-in-left', 'slide-in-right', 'slide-out-left', 'slide-out-right', 'active');
        img.style.display = 'none';
    });
    // Foto anterior sai
    if (direction === 1) {
        photos[prev].classList.add('slide-out-left');
    } else {
        photos[prev].classList.add('slide-out-right');
    }
    photos[prev].style.display = 'block';
    // Foto nova entra
    if (direction === 1) {
        photos[index].classList.add('slide-in-right');
    } else {
        photos[index].classList.add('slide-in-left');
    }
    photos[index].style.display = 'block';
    setTimeout(() => {
        photos.forEach((img, i) => {
            img.classList.remove('slide-in-left', 'slide-in-right', 'slide-out-left', 'slide-out-right');
            img.style.display = i === index ? 'block' : 'none';
            if (i === index) img.classList.add('active');
        });
        isSliding = false;
    }, 500);
    currentPhoto = index;
}

function prevPhoto() {
    const photos = document.querySelectorAll('.carousel-photo');
    if (!photos.length) return;
    const prev = (currentPhoto - 1 + photos.length) % photos.length;
    showPhoto(prev, -1);
    resetCarouselInterval();
}

function nextPhoto() {
    const photos = document.querySelectorAll('.carousel-photo');
    if (!photos.length) return;
    const next = (currentPhoto + 1) % photos.length;
    showPhoto(next, 1);
    resetCarouselInterval();
}

function startCarouselInterval() {
    if (carouselInterval) clearInterval(carouselInterval);
    carouselInterval = setInterval(() => {
        nextPhoto();
    }, 1800);
}

function resetCarouselInterval() {
    startCarouselInterval();
}

window.addEventListener('DOMContentLoaded', () => {
    // Inicializa mostrando a primeira foto
    const photos = document.querySelectorAll('.carousel-photo');
    photos.forEach((img, i) => {
        img.style.display = i === 0 ? 'block' : 'none';
        if (i === 0) img.classList.add('active');
    });
    startCarouselInterval();
});
