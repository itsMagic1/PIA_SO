
const hamburguerBtn = document.querySelector('.btn-popup')
const hamburguerClose = document.querySelector('.btn-close')
const hamburguerMenu = document.querySelector('.popup')
const body = document.querySelector('body')

hamburguerBtn.addEventListener('click', () => abrirMenu())
hamburguerClose.addEventListener('click', () => abrirMenu())

function abrirMenu() {
    hamburguerMenu.classList.toggle('active')
    body.classList.toggle('no-scroll')
}

window.onload = function() {
  const paginaActual = window.location.pathname.split('/').pop();

  const links = document.querySelectorAll('.nav__links .links__link a, .popup .links__link a');

  links.forEach(link => {
      if (link.getAttribute('href').includes(paginaActual)) {
          link.classList.add('active');
      }
  });
};

function establecerProgresoCursos(curso, iniciado = null) {
    if (iniciado === true) {
        localStorage.setItem(curso.nombre, curso.seccion);
        return;
    }

    const existe = localStorage.getItem(curso.nombre);
    if (existe) {
        return;
    }

    localStorage.setItem(curso.nombre, curso.seccion);
}

function establecerProgresoCursos(curso, iniciado = null) {
    if (iniciado === true) {
        let seccionGuardada = parseInt(localStorage.getItem(curso.nombre));
        
        if (isNaN(seccionGuardada) || seccionGuardada === 0) {
            localStorage.setItem(curso.nombre, 1);
        }
        return;
    }

    const existe = localStorage.getItem(curso.nombre);
    if (existe) {
        return;
    }

    localStorage.setItem(curso.nombre, curso.seccion);
}


establecerProgresoCursos({nombre: 'curso1', seccion: 0})
establecerProgresoCursos({nombre: 'curso2', seccion: 0})
establecerProgresoCursos({nombre: 'curso3', seccion: 0})
establecerProgresoCursos({nombre: 'curso4', seccion: 0})

const botonesIniciar = document.querySelectorAll('.btn-countdown')

botonesIniciar.forEach(boton => {
    boton.addEventListener('click', () => {
        establecerProgresoCursos({nombre: boton.dataset.curso, seccion: 1}, iniciado = true)
        console.log(boton.dataset.curso);
    })
})

function actualizarProgreso(cursoId, progreso) {
    const progressBar = document.querySelector(`.progress-bar[data-curso="${cursoId}"]`);
    // console.log(progressBar);
    if (progressBar) {
        // Actualizamos la variable CSS --progress con el nuevo valor
        progressBar.style.setProperty('--progreso', `${progreso}%`);

        // También puedes actualizar el texto del porcentaje si lo deseas
        const porcentajeElement = progressBar.closest('.progress').querySelector('.porcetaje');
        if (porcentajeElement) {
            porcentajeElement.textContent = `${progreso}%`;
        }
    }
}

const cards = document.querySelectorAll('.card');

cards.forEach(curso => {
    const cursoNombre = curso.dataset.curso;
    const cursoId = curso.dataset.idcurso;

    const seccionesCompletadas = parseInt(localStorage.getItem(cursoNombre)) || 0;
    const cantidadSecciones = parseInt(localStorage.getItem(cursoNombre + 'CantidadSecciones')) || 1; 
    const progreso = (seccionesCompletadas / cantidadSecciones) * 100;

    actualizarProgreso(cursoId, progreso);
});

