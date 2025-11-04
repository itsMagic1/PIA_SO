// Toggle para mostrar/ocultar los exámenes de cada curso
function toggleModulo(moduloId) {
    var modulo = document.getElementById(moduloId);
    modulo.classList.toggle('show');
}

// Para el menú hamburguesa
const btnPopup = document.querySelector('.btn-popup');
const popup = document.querySelector('.popup');
const btnClose = document.querySelector('.btn-close');

btnPopup.addEventListener('click', () => {
    popup.classList.add('active');
});

btnClose.addEventListener('click', () => {
    popup.classList.remove('active');
});
