// ============================================
// MUNDO DE VICENTE — Interactividad y Lógica
// ============================================

// Variables Globales
const secciones = document.querySelectorAll('.seccion');
const enlacesNav = document.querySelectorAll('.nav-menu a');

// ---------- Pantalla de Bienvenida ----------
function cerrarBienvenida() {
  const pantalla = document.getElementById('pantalla-bienvenida');
  pantalla.classList.add('ocultar');
  
  // Guardar en localStorage para que sea persistente (solo una vez en la vida)
  localStorage.setItem('bienvenidaVisto', 'true');
  
  // Activar contadores cuando desaparezca la pantalla
  setTimeout(() => {
    iniciarContadores();
  }, 1000);
}

// Ocultar la pantalla de bienvenida si ya se ha visto
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('bienvenidaVisto')) {
    const pantalla = document.getElementById('pantalla-bienvenida');
    if (pantalla) pantalla.style.display = 'none';
    setTimeout(iniciarContadores, 500);
  }
  
  // Inicializar navegación según dispositivo
  controlarNavegacion();
});

// ---------- Control de Navegación (Móvil vs PC) ----------
let modoMovil = window.innerWidth <= 768;

function controlarNavegacion() {
  // Ahora todas las secciones son siempre visibles para permitir scroll vertical tradicional
  document.querySelectorAll('.seccion').forEach(seccion => {
    seccion.style.display = 'block';
  });
}

// Escuchar cambios de tamaño de ventana
window.addEventListener('resize', () => {
  const esMovilAhora = window.innerWidth <= 768;
  if (esMovilAhora !== modoMovil) {
    modoMovil = esMovilAhora;
    controlarNavegacion();
  }
});

function marcarEnlaceActivo(id) {
  enlacesNav.forEach(enlace => {
    enlace.classList.remove('activo-nav');
    if (enlace.getAttribute('href') === `#${id}`) {
      enlace.classList.add('activo-nav');
    }
  });
}

// ---------- Menú de Navegación ----------
// Todas las secciones son visibles por defecto. 
// No interceptamos el clic para ocultar/mostrar, dejamos que el scroll nativo haga su trabajo.

// Resaltar enlace activo al hacer scroll (Solo PC)

// Resaltar enlace activo al hacer scroll (Solo PC)
window.addEventListener('scroll', () => {
  if (modoMovil) return; // En móvil no resaltamos por scroll ya que solo hay una sección

  let scrollY = window.scrollY;
  secciones.forEach(seccion => {
    const sectionHeight = seccion.offsetHeight;
    const sectionTop = seccion.offsetTop - 100;
    const sectionId = seccion.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      marcarEnlaceActivo(sectionId);
    }
  });
});

// ---------- Acordeón de Dinosaurios ----------
function toggleAcordeon(boton) {
  const item = boton.parentElement;
  
  // Si está activo, lo cerramos
  if (item.classList.contains('activo')) {
    item.classList.remove('activo');
  } else {
    // Cerrar todos los demás primero
    document.querySelectorAll('.acordeon-item').forEach(i => i.classList.remove('activo'));
    // Abrir este
    item.classList.add('activo');
  }
}

// ---------- Animaciones al hacer Scroll ----------
function checkScrollAnimaciones() {
  const elementos = document.querySelectorAll('.aparicion, .aparicion-izquierda, .aparicion-derecha');
  const triggerBottom = window.innerHeight * 0.85;

  elementos.forEach(elemento => {
    const elementoTop = elemento.getBoundingClientRect().top;
    
    if (elementoTop < triggerBottom) {
      elemento.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', checkScrollAnimaciones);
// Chequeo inicial
setTimeout(checkScrollAnimaciones, 100);

// ---------- Contadores Animados ----------
let contadoresAnimados = false;

function iniciarContadores() {
  // Evitar que se animen más de una vez
  if (contadoresAnimados) return;
  contadoresAnimados = true;
  
  const contadores = document.querySelectorAll('.contador-numero');
  const speed = 200;
  
  contadores.forEach(contador => {
    const target = +contador.getAttribute('data-target');
    let count = 0;
    const inc = target / speed;
    
    const updateCount = () => {
      count += inc;
      if (count < target) {
        contador.innerText = Math.ceil(count).toLocaleString('es-CL');
        setTimeout(updateCount, 20);
      } else {
        contador.innerText = target.toLocaleString('es-CL');
      }
    };
    
    updateCount();
  });
}

// Activar contadores cuando se llega a esa sección
window.addEventListener('scroll', () => {
  const gridContadores = document.querySelector('.contador-grid');
  if (gridContadores) {
    const topElemento = gridContadores.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (topElemento < windowHeight * 0.9) {
      iniciarContadores();
    }
  }
});

// Botón de subir arriba
window.addEventListener('scroll', () => {
  const btnSubir = document.getElementById('btnSubir');
  if (btnSubir) {
    if (window.scrollY > 400) {
      btnSubir.classList.add('visible');
    } else {
      btnSubir.classList.remove('visible');
    }
  }
});

// ============================================
// MENÚ HAMBURGUESA (MOBILE)
// ============================================
function toggleMenu() {
  const menu = document.getElementById('navMenu');
  const btn  = document.getElementById('btnHamburguesa');
  if (!menu) return;
  const abierto = menu.classList.toggle('abierto');
  btn.textContent = abierto ? '✕' : '☰';
  btn.style.background = abierto ? 'var(--color-cielo-claro)' : '';
}

// Cerrar menú al hacer clic en un enlace
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      const menu = document.getElementById('navMenu');
      const btn  = document.getElementById('btnHamburguesa');
      if (menu) menu.classList.remove('abierto');
      if (btn)  { btn.textContent = '☰'; btn.style.background = ''; }
    });
  });
});

// Cerrar menú al hacer clic fuera
document.addEventListener('click', (e) => {
  const nav  = document.getElementById('nav');
  const menu = document.getElementById('navMenu');
  const btn  = document.getElementById('btnHamburguesa');
  if (menu && menu.classList.contains('abierto') && nav && !nav.contains(e.target)) {
    menu.classList.remove('abierto');
    if (btn) { btn.textContent = '☰'; btn.style.background = ''; }
  }
});

function subirArriba() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---------- Pepe Guía Interactivo ----------
const pepeTooltips = [
  "¡Haz clic en las secciones para aprender cosas nuevas! 🌟",
  "¿Encontraste a los pingüinos? Son mis favoritos 🐧",
  "¡Cuidado con las plantas carnívoras! 🪴",
  "¡Los dinosaurios eran gigantes! 🦕",
  "El mar está lleno de colores y peces increíbles 🐠",
  "Los perros y gatos son grandes amigos 🐶🐱",
  "¡Intenta responder el Quiz al final! 🧠"
];

const pepeGuia = document.getElementById('pepeGuia');
const pepeTooltipText = document.getElementById('pepeTooltip');
let tooltipActual = 0;

pepeGuia.addEventListener('click', () => {
  tooltipActual = (tooltipActual + 1) % pepeTooltips.length;
  pepeTooltipText.style.opacity = 0;
  
  setTimeout(() => {
    pepeTooltipText.innerText = pepeTooltips[tooltipActual];
    pepeTooltipText.style.opacity = 1;
  }, 300);
});

// Hacer que Pepe siga un poco el mouse en la pantalla principal hero
const heroPepe = document.querySelector('.hero-pepe');
if (heroPepe) {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    heroPepe.style.transform = `translate(${x}px, ${y - 15}px) rotate(${x/2}deg)`;
  });
}

// ---------- Quiz Interactivo ----------

// Configuración de secciones (niveles)
const seccionesQuiz = [
  { id:'fauna',       emoji:'🐧', nombre:'Fauna',       color:'linear-gradient(135deg,#2E7D32,#66BB6A)' },
  { id:'carnivoras',  emoji:'🪴', nombre:'Carnívoras',  color:'linear-gradient(135deg,#7B1FA2,#CE93D8)' },
  { id:'dinosaurios', emoji:'🦕', nombre:'Dinosaurios', color:'linear-gradient(135deg,#E65100,#FFCC80)' },
  { id:'flora',       emoji:'🌿', nombre:'Flora',       color:'linear-gradient(135deg,#388E3C,#A5D6A7)' },
  { id:'arboles',     emoji:'🌳', nombre:'Árboles',     color:'linear-gradient(135deg,#1B5E20,#69F0AE)' },
  { id:'insectos',    emoji:'🦋', nombre:'Insectos',    color:'linear-gradient(135deg,#F57F17,#FFF176)' },
  { id:'oceano',      emoji:'🐋', nombre:'Océano',      color:'linear-gradient(135deg,#0277BD,#81D4FA)' },
  { id:'mascotas',    emoji:'🐱', nombre:'Mascotas',    color:'linear-gradient(135deg,#AD1457,#F48FB1)' },
  { id:'octonautas',  emoji:'🚢', nombre:'Octonautas',  color:'linear-gradient(135deg,#006064,#80DEEA)' },
];

const todasLasPreguntas = [
  // ══════════════════ FAUNA ══════════════════
  { seccion:'fauna', emoji:'🐧',
    pregunta:'¿Cuál es el pingüino que vive cerca de Punta Arenas?',
    opciones:['Pingüino Emperador','Pingüino de Magallanes','Pingüino Rey','Pingüino Azul'], correcta:1,
    explicacion:'El Pingüino de Magallanes vive en la Patagonia y se puede ver en colonias de miles de pingüinos cerca de Punta Arenas. ¡Son animales increíblemente sociales!' },
  { seccion:'fauna', emoji:'🦅',
    pregunta:'¿Cuál es el ave de mayor envergadura que puede volar en Sudamérica?',
    opciones:['Águila calva','Cóndor de los Andes','Flamenco','Loro'], correcta:1,
    explicacion:'El Cóndor de los Andes tiene alas que pueden medir hasta 3 metros de punta a punta. ¡Es como un avión viviente que planea por horas sin mover las alas aprovechando el viento!' },
  { seccion:'fauna', emoji:'🦌',
    pregunta:'¿Qué animal patagónico con cuernos está en el escudo de Chile?',
    opciones:['Guanaco','Puma','Huemul','Zorro'], correcta:2,
    explicacion:'El Huemul es el ciervo patagónico y es el animal del escudo de Chile. Está en peligro de extinción, por eso hay que cuidarlo mucho. ¡Es un tesoro de la Patagonia!' },
  { seccion:'fauna', emoji:'🐆',
    pregunta:'¿Cuál es el animal terrestre más veloz del mundo?',
    opciones:['León','Guepardo','Caballo','Lobo'], correcta:1,
    explicacion:'El Guepardo puede correr hasta 120 km/h en pocos segundos. ¡Es más rápido que un auto en la ciudad! Pero se cansa muy rápido y solo corre así por distancias cortas.' },
  { seccion:'fauna', emoji:'🦙',
    pregunta:'¿Qué animal de la Patagonia vive en manadas y es pariente de la llama?',
    opciones:['Puma','Huemul','Guanaco','Zorro'], correcta:2,
    explicacion:'El Guanaco vive en la Patagonia en grandes manadas. Es pariente de la llama y la alpaca. Su peor enemigo es el Puma, que los caza para comer. ¡Son muy rápidos para escapar!' },
  { seccion:'fauna', emoji:'🦜',
    pregunta:'¿Qué animal es el más grande de la familia de los gatos?',
    opciones:['Leopardo','Puma','Tigre','León'], correcta:2,
    explicacion:'El Tigre es el felino más grande del mundo. Puede pesar hasta 300 kilos. A diferencia de los leones, los tigres viven solos y les encanta el agua. ¡Son nadadores increíbles!' },
  { seccion:'fauna', emoji:'🐨',
    pregunta:'¿En qué país viven los koalas salvajes?',
    opciones:['China','India','Australia','Brasil'], correcta:2,
    explicacion:'Los koalas solo viven en Australia y comen casi exclusivamente hojas de eucalipto. ¡Duermen hasta 22 horas al día porque las hojas que comen les dan muy poca energía!' },
  { seccion:'fauna', emoji:'🦒',
    pregunta:'¿Cuál es el animal terrestre más alto del mundo?',
    opciones:['Elefante','Jirafa','Camello','Rinoceronte'], correcta:1,
    explicacion:'La Jirafa puede medir hasta 6 metros de altura. ¡Su cuello solo tiene 7 huesos, los mismos que el cuello humano, pero cada uno mide casi 30 centímetros! Son los rascacielos del reino animal.' },
  // ══════════════════ CARNÍVORAS ══════════════════
  { seccion:'carnivoras', emoji:'🪴',
    pregunta:'¿Qué come la planta Venus Atrapamoscas?',
    opciones:['Hamburguesas','Frutas','Insectos','Pan'], correcta:2,
    explicacion:'La Venus Atrapamoscas cierra sus hojas en menos de medio segundo cuando un insecto la toca dos veces. ¡Es la planta más rápida del mundo! Necesita dos toques para no cerrarse por el viento.' },
  { seccion:'carnivoras', emoji:'🌿',
    pregunta:'¿Cómo atrapa insectos la Drosera (rocío del sol)?',
    opciones:['Con dientes afilados','Con pelos pegajosos como melaza','Con redes','Corriendo tras ellos'], correcta:1,
    explicacion:'La Drosera tiene gotitas brillantes en sus pelos que parecen rocío. Los insectos piensan que es agua o néctar y se acercan... ¡pero se quedan pegados para siempre! Es un truco brillante.' },
  { seccion:'carnivoras', emoji:'🫙',
    pregunta:'¿Qué planta carnívora tiene hojas en forma de jarra con agua adentro?',
    opciones:['Venus Atrapamoscas','Sarracenia','Cactus','Margarita'], correcta:1,
    explicacion:'La Sarracenia tiene hojas que parecen jarras llenas de agua y néctar. Los insectos entran atraídos por el olor, resbalan en las paredes súper lisas y caen al agua. ¡No pueden escapar!' },
  { seccion:'carnivoras', emoji:'🌏',
    pregunta:'¿En qué continente vive el Nepenthes, la planta carnívora más grande?',
    opciones:['América','Europa','Asia','África'], correcta:2,
    explicacion:'El Nepenthes vive en las selvas tropicales de Asia. Algunas son tan grandes que pueden atrapar no solo insectos, ¡sino también ranas, ratones y hasta pájaros pequeños dentro de sus jarras!' },
  { seccion:'carnivoras', emoji:'💧',
    pregunta:'¿Cómo atrapa la Utricularia (vejigosa) a sus presas bajo el agua?',
    opciones:['Con dientes','Con veneno','Con trampas como mini-aspiradoras','Con redes pegajosas'], correcta:2,
    explicacion:'¡La Utricularia tiene pequeñas vejigas bajo el agua que funcionan como mini-aspiradoras! En menos de una milésima de segundo aspiran los pequeños organismos que pasan cerca. ¡Es la trampa más rápida del mundo vegetal!' },
  { seccion:'carnivoras', emoji:'🌀',
    pregunta:'¿Qué planta carnívora tiene trampas en espiral bajo tierra?',
    opciones:['Drosera','Genlisea','Sundew','Pinguicula'], correcta:1,
    explicacion:'La Genlisea tiene trampas espirales BAJO TIERRA, así que nadie la ve cazar. Los microorganismos entran por la espiral y unos pelitos apuntando hacia adentro no los dejan escapar. ¡Un ninja del mundo vegetal!' },
  // ══════════════════ DINOSAURIOS ══════════════════
  { seccion:'dinosaurios', emoji:'🦕',
    pregunta:'¿Cuál fue el dinosaurio más grande del mundo, encontrado en la Patagonia?',
    opciones:['T-Rex','Ballena Azul','Patagotitan','Triceratops'], correcta:2,
    explicacion:'El Patagotitan mayorum fue encontrado en Argentina, cerca de la Patagonia. Medía 37 metros de largo y pesaba como 70 elefantes juntos. ¡El ser más pesado que caminó sobre la Tierra!' },
  { seccion:'dinosaurios', emoji:'🦖',
    pregunta:'¿Qué dinosaurio tenía tres cuernos en la cabeza?',
    opciones:['Velociraptor','Triceratops','Estegosaurio','Braquiosaurio'], correcta:1,
    explicacion:'El Triceratops tenía un cuerno en la nariz y dos cuernos grandes sobre los ojos. También tenía un gran escudo óseo llamado gorguera. ¡Usaba los cuernos para pelear con el T-Rex y proteger a su familia!' },
  { seccion:'dinosaurios', emoji:'🐦',
    pregunta:'¿Qué animales modernos son los parientes MÁS cercanos de los dinosaurios?',
    opciones:['Los cocodrilos','Las ballenas','Las aves','Los lagartos'], correcta:2,
    explicacion:'¡Las aves evolucionaron directamente de los dinosaurios terópodos hace 150 millones de años! El pingüino, el cóndor y hasta el pollo son dinos. Los cocodrilos son parientes lejanos, pero las aves ganaron esa carrera.' },
  { seccion:'dinosaurios', emoji:'🦴',
    pregunta:'¿Qué dinosaurio tenía grandes placas óseas a lo largo de su espalda?',
    opciones:['T-Rex','Estegosaurio','Diplodocus','Velociraptor'], correcta:1,
    explicacion:'El Estegosaurio tenía grandes placas óseas en su espalda que usaba para regular su temperatura, ¡como un radiador viviente! También tenía una cola con 4 púas afiladas para defenderse del T-Rex.' },
  { seccion:'dinosaurios', emoji:'🌋',
    pregunta:'¿Qué causó principalmente la extinción de los dinosaurios hace 66 millones de años?',
    opciones:['Una inundación','Un asteroide gigante','Mucho frío','Que se comieron entre ellos'], correcta:1,
    explicacion:'Un asteroide de 10 km golpeó la Tierra hace 66 millones de años. La explosión levantó tanto polvo que bloqueó el sol por años, haciendo que las plantas murieran y los dinosaurios no tuvieran qué comer.' },
  { seccion:'dinosaurios', emoji:'🥚',
    pregunta:'¿Cómo nacían los dinosaurios?',
    opciones:['De huevos','De la tierra','Del agua','Ya grandes'], correcta:0,
    explicacion:'Todos los dinosaurios ponían huevos, igual que las aves y los reptiles de hoy. Se han encontrado nidos de dinosaurios con huevos fosilizados en todo el mundo, incluso en la Patagonia Argentina.' },
  // ══════════════════ FLORA ══════════════════
  { seccion:'flora', emoji:'🍂',
    pregunta:'¿De qué color son las hojas de la Lenga en otoño?',
    opciones:['Azul y morado','Verde brillante','Rojo, naranja y dorado','Blanco'], correcta:2,
    explicacion:'En otoño, los bosques de Lenga en la Patagonia se pintan de rojo, naranja y dorado. ¡Parece que los cerros están en llamas! Es uno de los espectáculos naturales más hermosos del mundo.' },
  { seccion:'flora', emoji:'🌲',
    pregunta:'¿Cuántos años puede vivir un Alerce patagónico?',
    opciones:['50 años','200 años','Más de 3.600 años','10 años'], correcta:2,
    explicacion:'El Alerce más viejo conocido tiene más de 3.600 años. ¡Nació mucho antes que el Imperio Romano! Es el ser vivo más antiguo de América del Sur. ¡Hay que protegerlo con todo!' },
  { seccion:'flora', emoji:'🫐',
    pregunta:'¿Qué planta de la Patagonia tiene frutos azules muy ricos y tiene una leyenda?',
    opciones:['Lenga','Calafate','Ñire','Notro'], correcta:1,
    explicacion:'El Calafate tiene frutitos azules deliciosos. La leyenda dice: quien come calafate siempre vuelve a la Patagonia. ¡Con sus frutos se hace una mermelada increíble!' },
  { seccion:'flora', emoji:'🌺',
    pregunta:'¿Qué árbol-arbusto de la Patagonia tiene flores rojas brillantes?',
    opciones:['Lenga','Alerce','Notro','Ñire'], correcta:2,
    explicacion:'El Notro o Ciruelillo tiene flores rojas brillantes que son el alimento favorito del Colibrí patagónico. ¡Es como un restaurante natural con campanitas rojas! Los pájaros lo adoran.' },
  { seccion:'flora', emoji:'🌵',
    pregunta:'¿Cómo almacena agua el cactus para sobrevivir en el desierto?',
    opciones:['En sus raíces','En sus flores','En su tallo grueso','Bajo tierra'], correcta:2,
    explicacion:'El cactus tiene un tallo grueso y esponjoso que funciona como un tanque de agua. Puede almacenar cientos de litros y vivir meses sin lluvia. ¡Sus espinas también evitan que los animales lo coman!' },
  { seccion:'flora', emoji:'🪲',
    pregunta:'¿Qué planta produce flores que huelen a carne podrida para atraer moscas?',
    opciones:['Rosa','Orquídea','Rafflesia','Margarita'], correcta:2,
    explicacion:'La Rafflesia tiene la flor más grande del mundo (casi 1 metro) y huele horrible, como carne podrida. Pero es un truco: atrae moscas para que la polinicen. ¡La belleza del mundo natural es muy rara a veces!' },
  // ══════════════════ ÁRBOLES ══════════════════
  { seccion:'arboles', emoji:'🌲',
    pregunta:'¿Cuál es el árbol más alto del mundo?',
    opciones:['Palmera','Roble','Secuoya','Pino'], correcta:2,
    explicacion:'La Secuoya más alta del mundo se llama Hyperion y mide 115 metros. ¡Es más alto que un edificio de 35 pisos! Vive en California y tiene casi 800 años.' },
  { seccion:'arboles', emoji:'💨',
    pregunta:'¿Qué gas muy importante para respirar producen los árboles?',
    opciones:['Agua','Oxígeno','Fuego','Tierra'], correcta:1,
    explicacion:'Los árboles absorben el dióxido de carbono del aire y producen oxígeno con la fotosíntesis. ¡Sin los bosques del planeta no podríamos respirar! Un árbol grande puede producir oxígeno para 4 personas.' },
  { seccion:'arboles', emoji:'🪵',
    pregunta:'¿Cómo se llaman los círculos en el tronco que muestran la edad del árbol?',
    opciones:['Anillos de agua','Anillos de crecimiento','Anillos de color','Anillos de savia'], correcta:1,
    explicacion:'Cada año los árboles forman un anillo nuevo en su tronco. Contando esos anillos sabemos exactamente cuántos años tiene. ¡Los científicos pueden leer la historia del árbol como páginas de un libro!' },
  { seccion:'arboles', emoji:'🌊',
    pregunta:'¿Qué árbol vive con sus raíces dentro del agua del mar?',
    opciones:['Pino','Mangle','Roble','Alerce'], correcta:1,
    explicacion:'El Mangle vive en la orilla del mar con raíces especiales que respiran aunque estén bajo el agua salada. ¡Es el árbol que vive entre la tierra y el mar! Sus raíces forman hogares para muchos peces.' },
  { seccion:'arboles', emoji:'🍁',
    pregunta:'¿Cómo se llaman los árboles que pierden todas sus hojas en invierno?',
    opciones:['Siempreverdes','Caducifolios','Cactáceos','Palmáceos'], correcta:1,
    explicacion:'Los árboles caducifolios pierden sus hojas en otoño para ahorrar energía durante el frío invierno. La Lenga patagónica es un ejemplo. ¡En primavera vuelven a salir hojas nuevas y frescas!' },
  { seccion:'arboles', emoji:'🌰',
    pregunta:'¿Qué árbol produce bellotas como fruto?',
    opciones:['Pino','Roble','Palma','Bambú'], correcta:1,
    explicacion:'El Roble produce bellotas, que son el alimento favorito de muchos animales del bosque como ardillas, ciervos y jabalíes. ¡Un roble puede vivir más de 500 años y dar hogar a miles de animales!' },
  // ══════════════════ INSECTOS ══════════════════
  { seccion:'insectos', emoji:'✨',
    pregunta:'¿Qué animal produce su propia luz en la oscuridad?',
    opciones:['Luciérnaga','Mariposa','Gato','Cóndor'], correcta:0,
    explicacion:'La Luciérnaga produce luz con una reacción química en su abdomen, sin calor ni electricidad. ¡Es la linterna más eficiente que existe en la naturaleza! La usan para comunicarse y encontrar pareja de noche.' },
  { seccion:'insectos', emoji:'🐜',
    pregunta:'¿Cuántas patas tiene un insecto?',
    opciones:['4 patas','8 patas','6 patas','12 patas'], correcta:2,
    explicacion:'Todos los insectos tienen exactamente 6 patas, sin excepción. ¡Las arañas tienen 8 patas y por eso NO son insectos, son arácnidos! Contar patas es el truco más fácil para identificar un insecto.' },
  { seccion:'insectos', emoji:'🍯',
    pregunta:'¿Qué insecto construye panales y produce miel?',
    opciones:['Hormiga','Mosca','Abeja','Escarabajo'], correcta:2,
    explicacion:'Las abejas construyen panales de cera con forma hexagonal perfecta. ¡Una colmena puede tener hasta 80.000 abejas! Una abeja produce solo una cucharadita de miel en toda su vida. ¡Por eso es tan valiosa!' },
  { seccion:'insectos', emoji:'🦋',
    pregunta:'¿Cómo se llama el proceso por el que una oruga se convierte en mariposa?',
    opciones:['Evolución','Metamorfosis','Transformación','Muda'], correcta:1,
    explicacion:'¡La metamorfosis es una de las maravillas de la naturaleza! La oruga se encierra en una crisálida y su cuerpo se reorganiza completamente. ¡Dentro de la crisálida casi todo se disuelve y se reconstruye como mariposa!' },
  { seccion:'insectos', emoji:'🐝',
    pregunta:'¿Qué hace una abeja cuando encuentra flores con néctar?',
    opciones:['Avisa a las otras abejas bailando','Trae a todas las abejas gritando','Pone una marca en la flor','Lo guarda en secreto'], correcta:0,
    explicacion:'¡Las abejas tienen una danza increíble llamada "danza de la abeja"! Cuando encuentran comida, vuelven a la colmena y bailan en círculos para indicar exactamente en qué dirección y a qué distancia están las flores. ¡GPS natural!' },
  { seccion:'insectos', emoji:'🪲',
    pregunta:'¿Qué grupo de insectos es el más numeroso del mundo?',
    opciones:['Mariposas','Escarabajos','Moscas','Abejas'], correcta:1,
    explicacion:'Los escarabajos son el grupo de animales con más especies en el planeta. Hay más de 400.000 especies conocidas. El científico Charles Darwin dijo que Dios debía tener "una predilección especial por los escarabajos".' },
  // ══════════════════ OCÉANO ══════════════════
  { seccion:'oceano', emoji:'🐋',
    pregunta:'¿Cuál es el animal más grande que ha existido en la Tierra?',
    opciones:['Elefante','Tiburón blanco','Ballena Azul','Patagotitan'], correcta:2,
    explicacion:'La Ballena Azul puede pesar 180 toneladas y medir 30 metros. ¡Su corazón es tan grande como un auto pequeño y sus arterias son tan anchas que un bebé podría gatear por ellas! El rey absoluto de todos los animales.' },
  { seccion:'oceano', emoji:'🐙',
    pregunta:'¿Cuántos brazos tiene un pulpo?',
    opciones:['4 brazos','6 brazos','10 brazos','8 brazos'], correcta:3,
    explicacion:'El pulpo tiene exactamente 8 brazos llenos de ventosas con las que puede tocar, saborear y agarrar cosas. ¡Además tiene 3 corazones, sangre azul y puede cambiar de color en un segundo para camuflarse!' },
  { seccion:'oceano', emoji:'🐬',
    pregunta:'¿Qué animal marino usa sonidos para orientarse y cazar?',
    opciones:['Tiburón','Delfín','Estrella de mar','Cangrejo'], correcta:1,
    explicacion:'Los delfines emiten clics de sonido y escuchan el eco que rebota en los objetos. Se llama ecolocalización. ¡Pueden detectar un pez pequeño a 100 metros! Son los radares naturales más sofisticados del océano.' },
  { seccion:'oceano', emoji:'🦈',
    pregunta:'¿Cuál es el tiburón más grande del mundo?',
    opciones:['Tiburón blanco','Tiburón ballena','Tiburón toro','Tiburón martillo'], correcta:1,
    explicacion:'El Tiburón ballena puede medir hasta 18 metros y es totalmente inofensivo. Come plancton y peces pequeños filtrando el agua con su enorme boca abierta. ¡Puedes nadar con él y no pasa nada!' },
  { seccion:'oceano', emoji:'🌊',
    pregunta:'¿Cuánta parte de la superficie de la Tierra está cubierta por océanos?',
    opciones:['Más o menos la mitad','Un cuarto','Casi tres cuartos','Toda'], correcta:2,
    explicacion:'Los océanos cubren casi el 71% de la superficie de la Tierra. Por eso desde el espacio, nuestro planeta se ve completamente azul. ¡El océano es el hogar de la mayoría de los seres vivos del planeta!' },
  { seccion:'oceano', emoji:'🐡',
    pregunta:'¿Cómo se defiende el pez globo de sus enemigos?',
    opciones:['Nadando muy rápido','Inflándose como un globo con púas','Cambiando de color','Siendo invisible'], correcta:1,
    explicacion:'Cuando el pez globo siente peligro, traga agua rapidísimo y se infla como un globo cubierto de púas. ¡Pasa de ser un pez normal a una bola espinosa en segundos! Ningún depredador puede comérselo así.' },
  // ══════════════════ MASCOTAS ══════════════════
  { seccion:'mascotas', emoji:'🐶',
    pregunta:'¿Qué sentido tienen los perros MUCHO más desarrollado que los humanos?',
    opciones:['La vista','El oído','El olfato','El gusto'], correcta:2,
    explicacion:'Los perros tienen hasta 300 millones de receptores olfativos. ¡Los humanos tenemos solo 6 millones! Pueden oler cosas que pasaron hace horas y detectar enfermedades. Por eso ayudan a la policía y a los médicos.' },
  { seccion:'mascotas', emoji:'🐱',
    pregunta:'¿Por qué los gatos ronronean?',
    opciones:['Siempre tienen hambre','Están felices o quieren calmarse','Quieren dormir','Están enojados'], correcta:1,
    explicacion:'Los gatos ronronean cuando están contentos, pero también cuando están nerviosos para calmarse. ¡Las vibraciones del ronroneo incluso les ayudan a sanar sus huesos! Es como tener un médico integrado.' },
  { seccion:'mascotas', emoji:'😴',
    pregunta:'¿Cuántas horas al día duermen los gatos?',
    opciones:['4 horas','8 horas','Entre 12 y 16 horas','24 horas'], correcta:2,
    explicacion:'Los gatos duermen entre 12 y 16 horas al día. ¡Son los campeones del sueño! Esto viene de sus ancestros salvajes que dormían para ahorrar energía entre cacerías. ¡Aunque dormidos, siempre están listos para reaccionar!' },
  { seccion:'mascotas', emoji:'🐕',
    pregunta:'¿Por qué los perros mueven la cola?',
    opciones:['Para espantar moscas','Para indicar cómo se sienten','Para hacer ejercicio','Para limpiar el suelo'], correcta:1,
    explicacion:'Los perros mueven la cola para comunicar sus emociones. Cola rápida y alta = alegría. Cola baja = miedo o sumisión. Cola que mueve más a la derecha = emoción positiva. ¡Es su lenguaje de señas!' },
  { seccion:'mascotas', emoji:'🐰',
    pregunta:'¿Qué característica especial tienen los dientes de los conejos?',
    opciones:['Son muy pequeños','Crecen toda la vida','Son de colores','Son de metal'], correcta:1,
    explicacion:'¡Los dientes de los conejos crecen continuamente durante toda su vida! Por eso necesitan siempre cosas para masticar (como heno o madera) para que no crezcan demasiado. Sin eso, no podrían comer.' },
  { seccion:'mascotas', emoji:'🐠',
    pregunta:'¿Cuánta memoria tienen los peces dorados realmente?',
    opciones:['3 segundos','3 minutos','Meses o años','Ninguna'], correcta:2,
    explicacion:'¡Es un mito que los peces tengan solo 3 segundos de memoria! Los científicos han demostrado que los peces pueden recordar cosas por meses e incluso años. ¡Son mucho más inteligentes de lo que pensamos!' },
  // ══════════════════ OCTONAUTAS ══════════════════
  { seccion:'octonautas', emoji:'🚢',
    pregunta:'¿Quién es el capitán de los Octonautas?',
    opciones:['Kwazii','Peso','Capitán Barnaclas','Dashi'], correcta:2,
    explicacion:'¡El Capitán Barnaclas es un valiente oso polar que lidera a todos los Octonautas! Su lema es: Desplegar, explorar, rescatar. Siempre pone la seguridad de su equipo y de los animales marinos primero.' },
  { seccion:'octonautas', emoji:'🌊',
    pregunta:'¿Cómo se llama la base submarina de los Octonautas?',
    opciones:['El Castillo del Mar','El Octópodo','La Nave Espacial','El Submarino Rojo'], correcta:1,
    explicacion:'El Octópodo es la base de los Octonautas, ¡con forma de pulpo! Tiene 8 brazos como un pulpo real. Desde ahí salen en sus pequeños GUP (vehículos submarinos) a explorar el océano y rescatar animales.' },
  { seccion:'octonautas', emoji:'🏴‍☠️',
    pregunta:'¿Qué animal es Kwazii, el aventurero de los Octonautas?',
    opciones:['Perro','Gato','Zorro','Conejo'], correcta:1,
    explicacion:'¡Kwazii es un gato atigrado súper aventurero! Es el segundo al mando y le encanta la emoción y el peligro. Su bisabuelo fue un famoso pirata, ¡y Kwazii heredó toda su valentía!' },
  { seccion:'octonautas', emoji:'🏥',
    pregunta:'¿Qué animal es Peso, el médico de los Octonautas?',
    opciones:['Oso','Pingüino','Foca','Delfín'], correcta:1,
    explicacion:'¡Peso es un adorable pingüino médico! A veces siente miedo, pero siempre encuentra el valor para ayudar a los animales heridos. Lleva su maletín médico a todas las misiones y nunca falla a sus amigos.' },
  { seccion:'octonautas', emoji:'📸',
    pregunta:'¿Qué hace Dashi en los Octonautas?',
    opciones:['Es la cocinera','Es la fotógrafa y técnica de computadoras','Es la médica','Es la piloto del Octópodo'], correcta:1,
    explicacion:'Dashi es una perrita Dachshund que es la experta en tecnología y fotografía de los Octonautas. Maneja las computadoras del Octópodo y documenta con fotos todos los descubrimientos de las misiones.' },
  { seccion:'octonautas', emoji:'🍳',
    pregunta:'¿Quién cocina en el Octópodo de los Octonautas?',
    opciones:['Barnaclas','Peso','Tunip (el vegimal)','Kwazii'], correcta:2,
    explicacion:'¡Tunip es un "vegimal", mezcla de vegetal y animal! Trabaja en la cocina del Octópodo y prepara comidas especiales para todo el equipo. Los vegimals son criaturas únicas del mundo de los Octonautas.' },
];

// Seleccionar y mezclar preguntas para cada partida
let preguntasQuiz = [];

function barajarPreguntas(seccion) {
  const pool = seccion
    ? todasLasPreguntas.filter(q => q.seccion === seccion)
    : todasLasPreguntas;
  const copia = [...pool];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  preguntasQuiz = copia.slice(0, Math.min(5, copia.length)); // 5 por sección
}

let seccionActual = null;
let preguntaActual = 0;
let puntaje = 0;
let respondido = false;

function guardarProgresoQuiz() {
  const dProgreso = document.getElementById('quizProgreso');
  dProgreso.innerHTML = '';
  
  preguntasQuiz.forEach((_, index) => {
    const punto = document.createElement('div');
    punto.className = `quiz-punto ${index === preguntaActual ? 'activo' : ''} ${index < preguntaActual ? 'completado' : ''}`;
    dProgreso.appendChild(punto);
  });
}

function mostrarPregunta() {
  const preguntaData = preguntasQuiz[preguntaActual];
  document.getElementById('quizPregunta').innerText = `${preguntaActual + 1}. ${preguntaData.pregunta}`;
  
  const dContenedorOpciones = document.getElementById('quizOpciones');
  dContenedorOpciones.innerHTML = '';
  
  preguntaData.opciones.forEach((opcion, index) => {
    const boton = document.createElement('button');
    boton.className = 'quiz-opcion';
    boton.innerText = opcion;
    boton.onclick = () => verificarRespuesta(index, boton);
    dContenedorOpciones.appendChild(boton);
  });
  
  document.getElementById('quizResultado').className = 'quiz-resultado';
  document.getElementById('quizSiguiente').className = 'quiz-btn-siguiente';
  
  // Actualizar emoji de la pregunta (usa el del datos o rota entre los genéricos)
  const emojisGenericos = ['🤔', '🤓', '🤫', '🧐', '😎', '🌟', '🎯', '🧩', '🔍', '💡'];
  const emojiPregunta = preguntasQuiz[preguntaActual].emoji || emojisGenericos[preguntaActual % emojisGenericos.length];
  document.getElementById('quizEmoji').innerText = emojiPregunta;
  
  respondido = false;
  guardarProgresoQuiz();
}

function verificarRespuesta(indiceSelec, boton) {
  if (respondido) return;
  respondido = true;
  
  const correcta = preguntasQuiz[preguntaActual].correcta;
  const opcionesBotones = document.querySelectorAll('.quiz-opcion');
  
  if (indiceSelec === correcta) {
    boton.classList.add('correcto');
    puntaje++;
    mostrarMensajeBingo('¡Excelente! 🎉 ¡Correcto!', 'exito', preguntasQuiz[preguntaActual].explicacion);
    lanzarConfeti();
  } else {
    boton.classList.add('incorrecto');
    opcionesBotones[correcta].classList.add('correcto');
    mostrarMensajeBingo('¡Casi! La respuesta correcta era la verde. 👇', 'error', preguntasQuiz[preguntaActual].explicacion);
  }
  
  // Desactivar botones
  opcionesBotones.forEach(b => {
    b.onclick = null;
    b.style.cursor = 'default';
  });
  
  document.getElementById('quizSiguiente').classList.add('mostrar');
}

function mostrarMensajeBingo(mensaje, clase, explicacion) {
  const dRes = document.getElementById('quizResultado');
  dRes.innerHTML = `<div class="quiz-msg-texto">${mensaje}</div>` +
    (explicacion ? `<div class="quiz-explicacion">💡 ${explicacion}</div>` : '');
  dRes.className = `quiz-resultado mostrar ${clase}`;
}

function siguientePregunta() {
  preguntaActual++;
  
  if (preguntaActual < preguntasQuiz.length) {
    mostrarPregunta();
  } else {
    mostrarPantallaFinalQuiz();
  }
}

function mostrarPantallaFinalQuiz() {
  document.getElementById('quizPregunta').style.display = 'none';
  document.getElementById('quizOpciones').style.display = 'none';
  document.getElementById('quizResultado').style.display = 'none';
  document.getElementById('quizSiguiente').style.display = 'none';
  document.getElementById('quizEmoji').style.display = 'none';
  document.getElementById('quizProgreso').style.display = 'none';
  
  const final = document.getElementById('quizFinal');
  final.style.display = 'block';
  
  const total = preguntasQuiz.length;
  const estrellas = puntaje === total ? 3 : puntaje >= Math.ceil(total * 0.6) ? 2 : puntaje >= 1 ? 1 : 0;
  // Guardar mejor puntaje por sección
  if (seccionActual) {
    const key = 'quiz_estrellas_' + seccionActual;
    const mejor = parseInt(localStorage.getItem(key) || '0');
    if (estrellas > mejor) localStorage.setItem(key, String(estrellas));
  }
  const textPuntaje = document.getElementById('quizPuntaje');
  const estrellasStr = '⭐'.repeat(estrellas) + '☆'.repeat(3 - estrellas);
  if (puntaje === total) {
    textPuntaje.innerHTML = `<div style="font-size:2rem;margin-bottom:8px">${estrellasStr}</div>¡Eres un SÚPER EXPLORADOR!<br>¡Todas correctas! (${puntaje}/${total}) 🌟🐧`;
    repeticionConfeti(3);
  } else if (puntaje >= Math.ceil(total * 0.6)) {
    textPuntaje.innerHTML = `<div style="font-size:2rem;margin-bottom:8px">${estrellasStr}</div>¡Muy buen trabajo!<br>Acertaste ${puntaje} de ${total}. ¡Eres muy inteligente! 👍`;
    lanzarConfeti();
  } else if (puntaje >= 1) {
    textPuntaje.innerHTML = `<div style="font-size:2rem;margin-bottom:8px">${estrellasStr}</div>¡Buen intento!<br>Acertaste ${puntaje} de ${total}. ¡Sigue practicando! 💪`;
  } else {
    textPuntaje.innerHTML = `<div style="font-size:2rem;margin-bottom:8px">${estrellasStr}</div>Acertaste ${puntaje} de ${total}.<br>¡Lee más en la sección y vuelve a intentarlo! 📚`;
  }
}

function reiniciarQuiz() {
  barajarPreguntas(seccionActual); // nuevas preguntas de la sección activa
  preguntaActual = 0;
  puntaje = 0;
  respondido = false;

  document.getElementById('quizPregunta').style.display = 'block';
  document.getElementById('quizOpciones').style.display = 'grid';
  document.getElementById('quizEmoji').style.display = 'block';
  document.getElementById('quizProgreso').style.display = 'flex';
  document.getElementById('quizResultado').style.display = 'block';
  document.getElementById('quizSiguiente').style.display = 'block';
  document.getElementById('quizFinal').style.display = 'none';

  mostrarPregunta();
}

// ---- Selector de Secciones (Niveles) ----
function mostrarSelectorSecciones() {
  const selector = document.getElementById('selectorSecciones');
  const contenedor = document.getElementById('quizContenedor');
  if (!selector || !contenedor) return;
  contenedor.style.display = 'none';
  selector.style.display = 'block';

  const grid = document.getElementById('seccionesGrid');
  if (!grid) return;
  grid.innerHTML = '';

  seccionesQuiz.forEach(sec => {
    const estrellas = parseInt(localStorage.getItem('quiz_estrellas_' + sec.id) || '0');
    const stStr = '⭐'.repeat(estrellas) + '☆'.repeat(3 - estrellas);
    const card = document.createElement('div');
    card.className = 'seccion-quiz-card';
    card.style.background = sec.color;
    card.onclick = () => iniciarSeccionQuiz(sec.id);
    card.innerHTML = `<div class="sqc-emoji">${sec.emoji}</div>
      <div class="sqc-nombre">${sec.nombre}</div>
      <div class="sqc-estrellas">${stStr}</div>`;
    grid.appendChild(card);
  });
}

function iniciarSeccionQuiz(seccionId) {
  seccionActual = seccionId;
  document.getElementById('selectorSecciones').style.display = 'none';
  document.getElementById('quizContenedor').style.display = 'block';
  reiniciarQuiz();
}

function volverAlSelector() {
  document.getElementById('quizFinal').style.display = 'none';
  mostrarSelectorSecciones();
}


// --- Confeti Básico (Efecto Visual Simple) ---
function lanzarConfeti() {
  const colors = ['#FFD54F', '#4FC3F7', '#FF7043', '#66BB6A', '#AB47BC'];
  const seccion = document.getElementById('quiz');
  if (!seccion) return;
  
  const rect = seccion.getBoundingClientRect();
  
  for (let i = 0; i < 50; i++) {
    const p = document.createElement('div');
    p.style.position = 'absolute';
    p.style.width = Math.random() * 10 + 5 + 'px';
    p.style.height = Math.random() * 5 + 5 + 'px';
    p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    p.style.left = (Math.random() * 100) + '%';
    p.style.top = (Math.random() * 40 + 60) + '%';
    p.style.opacity = Math.random() + 0.5;
    p.style.transform = `rotate(${Math.random() * 360}deg)`;
    p.style.pointerEvents = 'none';
    p.style.zIndex = '100';
    
    // Animación simple con CSS transitions
    p.style.transition = 'all forwards 2.5s cubic-bezier(0.25, 1, 0.5, 1)';
    seccion.appendChild(p);
    
    setTimeout(() => {
      p.style.top = '120%';
      p.style.transform = `rotate(${Math.random() * 360 + 360}deg) translateX(${Math.random() * 100 - 50}px)`;
      p.style.opacity = 0;
    }, 10);
    
    setTimeout(() => {
      p.remove();
    }, 2600);
  }
}

function repeticionConfeti(veces) {
  let contador = 0;
  const intervalo = setInterval(() => {
    lanzarConfeti();
    contador++;
    if (contador >= veces) {
      clearInterval(intervalo);
    }
  }, 800);
}

// Inicializar el quiz y el narrador
window.addEventListener('DOMContentLoaded', () => {
    // El quiz solo existe en su propia página
    if (document.getElementById('quizPregunta')) {
        mostrarSelectorSecciones();
    }
    inicializarNarrador();
});

// ============================================
// NARRADOR INTERACTIVO (TEXT-TO-SPEECH)
// ============================================

function inicializarNarrador() {
  if (!('speechSynthesis' in window)) return; // Salir si el navegador no lo soporta

  // 1. Añadir a destacadas (títulos)
  document.querySelectorAll('.destacada-info h3').forEach(titulo => {
    crearBotonAudio(titulo, titulo.closest('.destacada-info'));
  });

  // 2. Añadir a tarjetas
  document.querySelectorAll('.tarjeta-cuerpo h3').forEach(titulo => {
    crearBotonAudio(titulo, titulo.closest('.tarjeta-cuerpo'));
  });

  // 3. Añadir a datos curiosos
  document.querySelectorAll('.dato-curioso h4').forEach(titulo => {
    crearBotonAudio(titulo, titulo.closest('.dato-curioso'));
  });

  // 4. Añadir a diálogos de octonautas
  document.querySelectorAll('.dialogo-nombre').forEach(titulo => {
    crearBotonAudio(titulo, titulo.closest('.dialogo-contenido'));
  });
  
  // 5. Añadir a acordeones (dentro del contenido)
  document.querySelectorAll('.acordeon-contenido').forEach(contenido => {
    const div = document.createElement('div');
    div.style.marginBottom = '15px';
    const btn = document.createElement('button');
    btn.className = 'btn-hablar';
    btn.innerHTML = '🔊 ¡Léemelo!';
    btn.style.width = 'auto';
    btn.style.padding = '0 15px';
    btn.style.borderRadius = '20px';
    btn.style.fontFamily = 'var(--font-divertido)';
    btn.style.fontWeight = '600';
    btn.style.color = 'var(--color-oceano)';
    
    btn.onclick = (e) => {
      e.stopPropagation();
      leerTextoElemento(contenido, btn);
    };
    
    div.appendChild(btn);
    contenido.insertBefore(div, contenido.firstChild);
  });

  // 6. Añadir a los títulos principales de cada sección
  document.querySelectorAll('.seccion-titulo, .seccion-titulo-sub').forEach(titulo => {
    const btn = document.createElement('button');
    btn.className = 'btn-hablar';
    btn.innerHTML = '🔊';
    btn.title = 'Escuchar título';
    btn.style.display = 'block';
    btn.style.margin = '8px auto 0';
    btn.style.marginLeft = 'auto';
    btn.style.marginRight = 'auto';


    btn.onclick = (e) => {
      e.stopPropagation();
      let textoVoz = '';

      // Si esta sección tiene contadores, leer sus números y etiquetas
      const seccion = titulo.closest('section');
      const contadores = seccion ? seccion.querySelectorAll('.contador-item') : [];
      
      if (contadores.length > 0) {
        textoVoz = 'Números Increíbles. ';
        contadores.forEach(item => {
          const num = item.querySelector('.contador-numero');
          const label = item.querySelector('.contador-label');
          if (num && label) {
            textoVoz += `${num.innerText} ${label.innerText}. `;
          }
        });
      } else {
        textoVoz = titulo.textContent;
        // Buscar el subtítulo que está justo debajo para leerlo también
        const subtitulo = titulo.nextElementSibling;
        if (subtitulo && subtitulo.classList.contains('seccion-subtitulo')) {
          textoVoz += '. ' + subtitulo.textContent;
        }
      }

      // Limpiar texto
      textoVoz = textoVoz.replace(/🔊/g, '');
      textoVoz = textoVoz.replace(/[\u{1F300}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}]/gu, '');
      
      leerTexto(textoVoz.trim(), btn);
    };
    
    titulo.appendChild(btn);
  });

  // 7. Hacer que las imágenes se puedan ampliar (Lightbox)
  document.querySelectorAll('.destacada-imagen img, .tarjeta-imagen img, .dato-curioso img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.title = 'Haz clic para ver la imagen en grande';
    
    img.addEventListener('click', () => {
      abrirLightbox(img.src, img.alt);
    });
  });

  // Detener voz al cambiar de pestaña
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      window.speechSynthesis.cancel();
    }
  });
}

// ============================================
// LIGHTBOX MODAL (PANTALLA COMPLETA)
// ============================================
function abrirLightbox(src, alt) {
  const lightbox = document.getElementById('lightboxModal');
  const imgElement = document.getElementById('lightboxImg');
  const captionElement = document.getElementById('lightboxCaption');
  
  if (lightbox && imgElement) {
    imgElement.src = src;
    captionElement.textContent = alt || '';
    lightbox.classList.add('visible');
    // Prevenir que el fondo se mueva
    document.body.style.overflow = 'hidden'; 
  }
}

function cerrarLightbox() {
  const lightbox = document.getElementById('lightboxModal');
  if (lightbox) {
    lightbox.classList.remove('visible');
    // Restaurar movimiento de la página
    document.body.style.overflow = '';
  }
}

// Permitir cerrar el lightbox usando la tecla Escape del teclado
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') cerrarLightbox();
});

function crearBotonAudio(elementoAñadir, contenedorLeer) {
  const btn = document.createElement('button');
  btn.className = 'btn-hablar';
  btn.innerHTML = '🔊';
  btn.title = 'Escuchar narración';
  
  // Estilar título para alinear botón
  elementoAñadir.style.display = 'flex';
  elementoAñadir.style.alignItems = 'center';
  elementoAñadir.style.justifyContent = 'space-between';
  elementoAñadir.style.gap = '10px';
  
  btn.onclick = (e) => {
    e.stopPropagation(); 
    leerTextoElemento(contenedorLeer, btn);
  };
  
  elementoAñadir.appendChild(btn);
}

function leerTextoElemento(contenedor, botonActivo) {
  let textoVoz = "";
  
  // Clonar el contenedor para no afectar el DOM real
  const clon = contenedor.cloneNode(true);
  
  // Eliminar todos los botones del clon para no leer su texto
  clon.querySelectorAll('button, .btn-hablar').forEach(b => b.remove());
  
  // Extraer información en orden jerárquico
  const elementos = clon.querySelectorAll('h3, h4, p, .dato-texto, .dialogo-burbuja');
  
  if (elementos.length > 0) {
    elementos.forEach(el => {
      textoVoz += el.textContent.trim() + ". ";
    });
  } else {
    textoVoz = clon.textContent;
  }
  
  // Limpiar símbolo de flecha
  textoVoz = textoVoz.replace(/▼/g, '');
  
  // Quitar emojis para no entorpecer la narración
  textoVoz = textoVoz.replace(/[\u{1F300}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}]/gu, '');
  
  leerTexto(textoVoz.trim(), botonActivo);
}

// --- Controles y Voces del Narrador ---
let vocesDisponibles = [];
window.speechSynthesis.onvoiceschanged = () => {
  vocesDisponibles = window.speechSynthesis.getVoices();
};

function getMejorVoz() {
  if (vocesDisponibles.length === 0) vocesDisponibles = window.speechSynthesis.getVoices();
  
  // 1. Filtrar voces para rechazar tajantemente el Español de España (es-ES)
  // Dejamos solo los códigos latinos: es-MX, es-US, es-CL, es-AR, etc.
  const vocesLatinas = vocesDisponibles.filter(v => 
    v.lang.startsWith('es') && 
    !v.lang.includes('es-ES') && 
    !v.name.includes('Spain') && 
    !v.name.includes('España')
  );
  
  let bestVoice = null;

  if (vocesLatinas.length > 0) {
    // 2. Buscar voz fluida de Google en variante Latina (Normalmente 'es-US' o 'es-MX' en Chrome)
    bestVoice = vocesLatinas.find(v => v.name.includes('Google') && (v.lang === 'es-US' || v.lang === 'es-MX'));
    
    // Fallback a cualquier voz latina de Google
    if (!bestVoice) bestVoice = vocesLatinas.find(v => v.name.includes('Google'));
    
    // 3. Buscar voces de alta calidad o nativas de Windows para Latinoamérica (Sabina, Dalia, Mia)
    if (!bestVoice) bestVoice = vocesLatinas.find(v => v.name.includes('Sabina') || v.name.includes('Natural') || v.name.includes('Premium'));
    
    // 4. Si nada de eso está, usar la primera voz latina disponible
    if (!bestVoice) bestVoice = vocesLatinas[0];
  } else {
    // Fallback de emergencia por si el sistema *solo* tiene preinstalado el español genérico/España
    bestVoice = vocesDisponibles.find(v => v.lang.startsWith('es'));
  }
  
  return bestVoice;
}

let narradorPausado = false;

function mostrarControlesNarrador(mostrar, botonAsociado) {
  const controles = document.getElementById('controlNarrador');
  if (!controles) return;
  
  if (mostrar && botonAsociado) {
    const rect = botonAsociado.getBoundingClientRect();

    // position: fixed → coordenadas relativas al viewport (sin scroll)
    let top = rect.top - 65;
    let left = rect.left - 20;

    // Si se sale por arriba, ponerlo debajo del botón
    if (rect.top < 80) {
      top = rect.bottom + 10;
    }
    // Si se sale por la derecha (móvil)
    if (left + 130 > window.innerWidth) {
      left = window.innerWidth - 140;
    }
    // Si se sale por la izquierda
    if (left < 10) left = 10;
    // Si se sale por abajo
    if (top + 60 > window.innerHeight) {
      top = window.innerHeight - 70;
    }

    controles.style.top = `${top}px`;
    controles.style.left = `${left}px`;
    controles.style.bottom = 'auto';
    controles.classList.add('visible');
  } else if (!mostrar) {
    controles.classList.remove('visible');
  }
}

function detenerNarrador() {
  window.speechSynthesis.cancel();
  narradorPausado = false;
  const btn = document.getElementById('btnPausarNarrador');
  if (btn) btn.innerText = '⏸️';
  mostrarControlesNarrador(false);
  document.querySelectorAll('.btn-hablar, .icono-hablar-img, .hablando').forEach(b => b.classList.remove('hablando'));
}

function togglePausarNarrador() {
  const btn = document.getElementById('btnPausarNarrador');
  if (!btn) return;
  
  if (window.speechSynthesis.speaking) {
    if (narradorPausado) {
      window.speechSynthesis.resume();
      narradorPausado = false;
      btn.innerText = '⏸️';
    } else {
      window.speechSynthesis.pause();
      narradorPausado = true;
      btn.innerText = '▶️';
    }
  }
}

function leerTexto(texto, boton) {
  // Resetear estados
  detenerNarrador();
  
  if (boton) {
    boton.classList.add('hablando');
  }

  const utterance = new SpeechSynthesisUtterance(texto.trim());
  
  const vozFluida = getMejorVoz();
  if (vozFluida) {
    utterance.voice = vozFluida;
  } else {
    utterance.lang = 'es-CL';
  }
  
  // Ajustes de velocidad para hacerla más natural
  utterance.rate = 1.0;  // Velocidad normal
  utterance.pitch = 1.05; // Levemente más agudo
  
  utterance.onstart = () => {
    mostrarControlesNarrador(true, boton);
    narradorPausado = false;
    document.getElementById('btnPausarNarrador').innerText = '⏸️';
  };
  
  utterance.onend = () => {
    if (boton) boton.classList.remove('hablando');
    mostrarControlesNarrador(false);
  };
  
  utterance.onerror = () => {
    if (boton) boton.classList.remove('hablando');
    mostrarControlesNarrador(false);
  };
  
  setTimeout(() => {
    window.speechSynthesis.speak(utterance);
  }, 50);
}

// ============================================
// AUDIO ESPECIAL DE PAPÁ
// ============================================

let audioPapaPersonalizado = null;

function reproducirAudioPapa() {
  const btn = document.getElementById('btnAudioPapa');
  
  // Apagar el TTS si está hablando
  detenerNarrador();
  
  if (!audioPapaPersonalizado) {
    // Cargando el archivo desde la ubicación correcta y con la extensión .m4a
    audioPapaPersonalizado = new Audio('./img/general/audio-papa.m4a');

    audioPapaPersonalizado.onended = () => {
      btn.classList.remove('hablando');
      btn.innerHTML = '🔊 ¡Escucha el saludo de Papá!';
    };

    // Control de errores básicos
    audioPapaPersonalizado.onerror = () => {
      alert("¡Ups! Hubo un problema cargando tu audio. Asegúrate de llamarlo 'audio-papa.m4a' y ponerlo en la carpeta 'img/general'.");
      btn.classList.remove('hablando');
      btn.innerHTML = '🔊 ¡Escucha el saludo de Papá!';
    };
  }
  
  if (audioPapaPersonalizado.paused) {
    audioPapaPersonalizado.play();
    btn.classList.add('hablando');
    btn.innerHTML = '⏸️ Reproduciendo...';
  } else {
    audioPapaPersonalizado.pause();
    btn.classList.remove('hablando');
    btn.innerHTML = '▶️ Pausado';
  }
}


// ============================================
// JUEGO DE MEMORY
// ============================================

// Pool completo — se eligen 10 al azar cada partida
const memoryPool = [
  // Fauna
  { emoji: '🐧', nombre: 'Pingüino' },
  { emoji: '🦅', nombre: 'Cóndor' },
  { emoji: '🦊', nombre: 'Zorro' },
  { emoji: '🦙', nombre: 'Guanaco' },
  { emoji: '🦭', nombre: 'Lobo Marino' },
  // Carnívoras
  { emoji: '🪴', nombre: 'Planta Carnívora' },
  // Dinosaurios
  { emoji: '🦕', nombre: 'Dinosaurio' },
  { emoji: '🦖', nombre: 'T-Rex' },
  // Flora y Árboles
  { emoji: '🌸', nombre: 'Notro' },
  { emoji: '🌲', nombre: 'Alerce' },
  { emoji: '🍂', nombre: 'Lenga' },
  // Insectos
  { emoji: '🦋', nombre: 'Mariposa' },
  { emoji: '🐝', nombre: 'Abeja' },
  { emoji: '🐜', nombre: 'Hormiga' },
  { emoji: '🪲', nombre: 'Escarabajo' },
  // Marinos
  { emoji: '🐋', nombre: 'Ballena' },
  { emoji: '🐬', nombre: 'Delfín' },
  { emoji: '🐙', nombre: 'Pulpo' },
  { emoji: '🦈', nombre: 'Tiburón' },
  { emoji: '🐢', nombre: 'Tortuga' },
  // Mascotas
  { emoji: '🐶', nombre: 'Perro' },
  { emoji: '🐱', nombre: 'Gato' },
  // Octonautas
  { emoji: '🚢', nombre: 'Octonautas' },
];

// Los 10 animales activos para la partida actual
let memoryAnimales = [];

let memoryVolteadas = [];
let memoryEncontradas = 0;
let memoryMoves = 0;
let memoryTimer = null;
let memorySeconds = 0;
let memoryBloqueado = false;

function iniciarMemory() {
  // Reset estado
  memoryVolteadas = [];
  memoryEncontradas = 0;
  memoryMoves = 0;
  memorySeconds = 0;
  memoryBloqueado = false;

  document.getElementById('memory-moves').textContent = '0';
  document.getElementById('memory-pairs').textContent = '0';
  document.getElementById('memory-time').textContent = '0';
  document.getElementById('memoryVictoria').style.display = 'none';

  if (memoryTimer) {
    clearInterval(memoryTimer);
    memoryTimer = null;
  }

  // Seleccionar 10 animales al azar del pool para esta partida
  const poolMezclado = [...memoryPool];
  for (let i = poolMezclado.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [poolMezclado[i], poolMezclado[j]] = [poolMezclado[j], poolMezclado[i]];
  }
  memoryAnimales = poolMezclado.slice(0, 10);

  // Crear pares y mezclar (Fisher-Yates)
  const pares = [...memoryAnimales, ...memoryAnimales];
  for (let i = pares.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pares[i], pares[j]] = [pares[j], pares[i]];
  }

  // Renderizar tablero
  const grid = document.getElementById('memoryGrid');
  grid.innerHTML = '';

  pares.forEach((carta) => {
    const div = document.createElement('div');
    div.className = 'memory-card';
    div.dataset.emoji = carta.emoji;
    div.innerHTML = `
      <div class="memory-card-inner">
        <div class="memory-card-dorso">🐻</div>
        <div class="memory-card-frente">${carta.emoji}</div>
      </div>
    `;
    div.addEventListener('click', () => voltearCartaMemory(div));
    grid.appendChild(div);
  });
}

function voltearCartaMemory(carta) {
  if (memoryBloqueado) return;
  if (carta.classList.contains('volteada') || carta.classList.contains('encontrada')) return;
  if (memoryVolteadas.length >= 2) return;

  // Iniciar timer en el primer clic
  if (!memoryTimer) {
    memoryTimer = setInterval(() => {
      memorySeconds++;
      document.getElementById('memory-time').textContent = memorySeconds;
    }, 1000);
  }

  carta.classList.add('volteada');
  memoryVolteadas.push(carta);

  if (memoryVolteadas.length === 2) {
    memoryMoves++;
    document.getElementById('memory-moves').textContent = memoryMoves;
    memoryBloqueado = true;

    const [c1, c2] = memoryVolteadas;

    if (c1.dataset.emoji === c2.dataset.emoji) {
      // ¡Pareja encontrada!
      setTimeout(() => {
        c1.classList.add('encontrada');
        c2.classList.add('encontrada');
        c1.classList.remove('volteada');
        c2.classList.remove('volteada');
        memoryVolteadas = [];
        memoryBloqueado = false;
        memoryEncontradas++;
        document.getElementById('memory-pairs').textContent = memoryEncontradas;

        if (memoryEncontradas === memoryAnimales.length) {
          clearInterval(memoryTimer);
          memoryTimer = null;
          setTimeout(() => mostrarVictoriaMemory(), 600);
        }
      }, 500);
    } else {
      // No coinciden — voltear de vuelta
      setTimeout(() => {
        c1.classList.remove('volteada');
        c2.classList.remove('volteada');
        memoryVolteadas = [];
        memoryBloqueado = false;
      }, 1100);
    }
  }
}

function mostrarVictoriaMemory() {
  document.getElementById('v-moves').textContent = memoryMoves;
  document.getElementById('v-time').textContent = memorySeconds;
  document.getElementById('memoryVictoria').style.display = 'flex';
  // Celebración con voz
  if ('speechSynthesis' in window) {
    const msg = new SpeechSynthesisUtterance('¡Felicitaciones Vicente! ¡Encontraste todas las parejas! ¡Eres un campeón!');
    msg.lang = 'es-ES';
    msg.rate = 0.9;
    window.speechSynthesis.speak(msg);
  }
}

// Iniciar el juego al cargar la página (solo en la página del memory)
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('memoryGrid')) {
    iniciarMemory();
  }
});
