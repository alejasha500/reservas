// Parallax y efecto ligero sobre la imagen al hacer scroll.
// Reemplaza el selector si cambias nombres de clases.
const hero = document.getElementById('hero');
const heroImage = document.getElementById('heroImage');
const header = document.getElementById('siteHeader');

let lastScroll = 0;

function onScroll(){
  const sc = window.scrollY;
  // Parallax: mueve la imagen más lento que el scroll (transform translate)
  const speed = 0.3; // ajustar intensidad
  const translate = Math.max(-60, -sc * speed);
  hero.style.backgroundPosition = `center ${translate}px`;

  // Efecto sobre la imagen central: pequeña traducción vertical
  const imgTranslate = Math.min(30, sc * 0.08);
  heroImage.style.transform = `translateY(${imgTranslate}px)`;

  // Añadir clase para ajustar sombras/escala cuando ya haya scroll
  if (sc > 30) heroImage.classList.add('scrolled'); else heroImage.classList.remove('scrolled');

  // Header: hacer un sutil fondo más opaco al avanzar
  const headerOpacity = Math.min(0.95, 0.6 + sc / 800);
  header.style.background = `rgba(255,255,255,${headerOpacity})`;
}

window.addEventListener('scroll', onScroll, {passive:true});
onScroll();