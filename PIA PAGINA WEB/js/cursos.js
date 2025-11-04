const cursos = document.querySelectorAll('.curso')
let secciones = document.querySelectorAll('.seccionCurso')
const parametrosURL = new URLSearchParams(window.location.search)

let idCurso = parametrosURL.get('idCurso')
let cursoActual = null
let seccionActual = null
let seccionesActuales = []

// Conocer el numero de secciones de cada curso
cursos.forEach(curso => {
    let cantidadSecciones = curso.querySelectorAll('.seccionCurso');
    localStorage.setItem(curso.dataset.nombre + 'CantidadSecciones', cantidadSecciones.length);
})

// Seleccionar que curso y que seccion mostrar
secciones.forEach(seccion => {
    if (seccion.dataset.idcurso === idCurso) {
        seccionesActuales.push(seccion)
    }
})
cursos.forEach(curso => {

    if (curso.dataset.idcurso !== idCurso) {
        curso.classList.add('desactivate')
    } else {
        cursoActual = curso
        seccionActual = localStorage.getItem(cursoActual.dataset.nombre)

        mostrarSeccionActual(seccionActual)
    }
})
function mostrarSeccionActual(seccionActual) {

    seccionesActuales.forEach(seccion => {
        if (seccion.dataset.seccion !== seccionActual) {
            seccion.classList.add('desactivate')
        }
    })
}

// Seleccionar que seccion mostrar despues
const botones = document.querySelectorAll('.btn')

botones.forEach(boton => {
    boton.addEventListener('click', () => cambiarSeccion(boton))
})

function cambiarSeccion(boton) {

    let status = boton.dataset.boton
    numSeccion = parseInt(boton.dataset.seccion)

    console.log('hola', cursoActual.dataset.nombre);

    if (status === 'siguiente') {
        localStorage.setItem(cursoActual.dataset.nombre, numSeccion + 1)
    } else {
        localStorage.setItem(cursoActual.dataset.nombre, numSeccion - 1)
    }

    location.reload()
}  

// COPIAR CODIGO DE LAS TERMINALES
document.addEventListener("DOMContentLoaded", function () {
  const botones = document.querySelectorAll(".terminal__btn");

  botones.forEach(boton => {
    boton.addEventListener("click", function () {
      const contenedor = boton.closest(".terminal");
      const codigo = contenedor.querySelector("code").innerText;

      navigator.clipboard.writeText(codigo)
        .then(() => {
          boton.textContent = "¡Copiado!";
          setTimeout(() => {
            boton.textContent = "Copiar Código";
          }, 1500);
        })
        .catch(err => {
          alert("Error al copiar: " + err);
        });
    });
  });
});




