gsap.registerPlugin(ScrollTrigger, TextPlugin);

gsap.from('.nav__links', {
    y: -100,
    opacity: 0,
    ease: 'expo.out',
    duration: 1.5,
    delay: 0.25
});

gsap.from('.nav__logo img', {
    x: -100,
    opacity: 0,
    ease: 'expo.out',
    duration: 2.5,
    delay: 0.75
});

gsap.from('.hero__img', 
    { x: 300, duration: 1.5, ease: 'ease'}
);

gsap.from('hero', {
    y: 100,
});

// Teclado //
var opciones = {
    strings: [
        "Aprende <span class='texto-dinamico'>Linux.</span>",
        "Aprende <span class='texto-dinamico'>los comandos básicos.</span>",
        "Aprende <span class='texto-dinamico'>a instalar distros.</span>",
        "Aprende <span class='texto-dinamico'>a gestionar usuarios.</span>",
    ],
    typeSpeed: 50,
    backSpeed: 50,
    backDelay: 3000,
    startDelay: 1000,
    loop: true,
    showCursor: true
};

var t = new Typed(".texto-animado", opciones);



let outer = document.querySelector('.clase');
let slider = document.querySelector('.slider');
let sections = document.querySelectorAll('.section-curso');

let tl = gsap.timeline({
  defaults: {
    ease: 'ease-out',
  },
  scrollTrigger: {
    trigger: outer, 
    pin: true,
    scrub: 3,
    start: 'top top',
    end: () => "+=" + slider.offsetWidth,
  }
});

gsap.to('.hero__img', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'bottom bottom',
        scrub: 2,
    },
    scale: 0,
    opacity: 0
})

gsap.to('.hero__text', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'bottom bottom',
        scrub: 5,
    },
    xPercent: 100
})

let windowWidth = window.innerWidth;
let xPercentValue;

if (windowWidth <= 400) {
    xPercentValue = -81; 
  } else {
    xPercentValue = -77;
  }

tl.to(slider, {
    xPercent: xPercentValue,
    delay: .01
});

sections.forEach((stop, section) => {
    tl.from(stop.querySelector('.card'), {
    //   xPercent: 50,
      yPercent: -80,
      opacity: 0,
      ease: 'elastic.out(1,1)',
      scrollTrigger: {
        trigger: stop.querySelector('.card'),
        containerAnimation: tl,
        scrub: true,
        start: '-100% center',
        end: '100% center',
      }
    });
});

const lenis = new Lenis();
    function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
    }
requestAnimationFrame(raf);

const iconos = document.querySelectorAll('.icon')
const cursos = document.querySelectorAll('.card')

iconos.forEach((icon, i) => {
    let yRandom = gsap.utils.random(-50, 50);  
    let scaleRandom = gsap.utils.random(0.8, 1.5); 
    let rotationRandom = gsap.utils.random(-30, 30); 

    gsap.from(icon, {
      xPercent: icon.dataset.distancia * 4,  
      yPercent: yRandom,  
      scale: scaleRandom, 
      rotation: rotationRandom, 
      scrollTrigger: {
        scrub: 10,
      }
    });
});