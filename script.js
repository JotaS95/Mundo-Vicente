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
  const seccionInicial = 'fauna'; // Sección por defecto
  
  if (modoMovil) {
    // Modo Mobile: Solo mostramos una sección a la vez
    document.querySelectorAll('.seccion').forEach(seccion => {
      seccion.style.display = 'none';
    });
    const activa = document.getElementById(seccionInicial);
    if (activa) activa.style.display = 'block';
    
    // Marcar el primer enlace como activo
    marcarEnlaceActivo(seccionInicial);
  } else {
    // Modo Desktop: Todo visible
    document.querySelectorAll('.seccion').forEach(seccion => {
      seccion.style.display = 'block';
    });
  }
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
function toggleMenu() {
  const menu = document.getElementById('navMenu');
  if (menu) {
    menu.classList.toggle('abierto');
  }
}

// Cerrar menú al hacer clic en un enlace
enlacesNav.forEach(enlace => {
  enlace.addEventListener('click', (e) => {
    const id = enlace.getAttribute('href').substring(1);
    
    if (modoMovil) {
      e.preventDefault();
      // Ocultar todas y mostrar la seleccionada
      document.querySelectorAll('.seccion').forEach(seccion => {
        seccion.style.display = 'none';
      });
      const target = document.getElementById(id);
      if (target) {
        target.style.display = 'block';
        window.scrollTo(0, 0); // Ir arriba de la sección
        marcarEnlaceActivo(id);
      }
      const menu = document.getElementById('navMenu');
      if (menu) menu.classList.remove('abierto');
    }
  });
});

// Cerrar menú al hacer clic fuera de él
document.addEventListener('click', (e) => {
  const menu = document.getElementById('navMenu');
  const btn = document.querySelector('.nav-hamburguesa');
  
  if (menu && menu.classList.contains('abierto')) {
    // Si el clic NO fue en el menú Y NO fue en el botón del menú
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
      menu.classList.remove('abierto');
    }
  }
});

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
const preguntasQuiz = [
  {
    pregunta: "¿Cuál es el pinguino que vive cerca de Punta Arenas?",
    opciones: ["Pingüino Emperador", "Pingüino de Magallanes", "Pingüino Rey", "Pingüino de Galápagos"],
    correcta: 1
  },
  {
    pregunta: "¿Qué come la planta carnívora Venus Atrapamoscas?",
    opciones: ["Hamburguesas", "Frutas", "Insectos", "Pan"],
    correcta: 2
  },
  {
    pregunta: "¿Cuál fue el animal terrestre más grande del mundo que vivió en la Patagonia?",
    opciones: ["Elefante", "Ballena Azul", "Patagotitan", "Triceratops"],
    correcta: 2
  },
  {
    pregunta: "¿De qué color son las hojas de la Lenga en otoño?",
    opciones: ["Azul y Morado", "Verde brillante", "Rojo, Naranja y Dorado", "Blanco"],
    correcta: 2
  },
  {
    pregunta: "¿Qué animal produce su propia luz?",
    opciones: ["Luciérnaga", "Mariposa", "Gato", "Cóndor"],
    correcta: 0
  }
];

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
  
  // Actualizar emojis según avance
  const emojis = ['🤔', '🤓', '🤫', '🧐', '😎'];
  document.getElementById('quizEmoji').innerText = emojis[preguntaActual];
  
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
    mostrarMensajeBingo('¡Excelente! 🎉 Respuesta correcta.', 'exito');
    lanzarConfeti();
  } else {
    boton.classList.add('incorrecto');
    opcionesBotones[correcta].classList.add('correcto');
    mostrarMensajeBingo('¡Ups! La respuesta correcta era la verde. ¡Casi!', 'error');
  }
  
  // Desactivar botones
  opcionesBotones.forEach(b => {
    b.onclick = null;
    b.style.cursor = 'default';
  });
  
  document.getElementById('quizSiguiente').classList.add('mostrar');
}

function mostrarMensajeBingo(mensaje, clase) {
  const dRes = document.getElementById('quizResultado');
  dRes.innerText = mensaje;
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
  
  const textPuntaje = document.getElementById('quizPuntaje');
  if (puntaje === preguntasQuiz.length) {
    textPuntaje.innerHTML = `¡Eres un SÚPER EXPLORADOR! <br>Adivinaste todas las respuestas (${puntaje}/${preguntasQuiz.length}). 🌟🐧`;
    repeticionConfeti(3);
  } else if (puntaje >= 3) {
    textPuntaje.innerHTML = `¡Muy buen trabajo! <br>Acertaste ${puntaje} de ${preguntasQuiz.length}. Eres muy inteligente. 👍`;
    lanzarConfeti();
  } else {
    textPuntaje.innerHTML = `Acertaste ${puntaje} de ${preguntasQuiz.length}. <br>¡Sigue explorando la página para aprender más! 📚`;
  }
}

function reiniciarQuiz() {
  preguntaActual = 0;
  puntaje = 0;
  respondido = false;
  
  document.getElementById('quizPregunta').style.display = 'block';
  document.getElementById('quizOpciones').style.display = 'grid';
  document.getElementById('quizEmoji').style.display = 'block';
  document.getElementById('quizProgreso').style.display = 'flex';
  document.getElementById('quizFinal').style.display = 'none';
  
  mostrarPregunta();
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
    mostrarPregunta();
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
    // Estilos para alinear el botón sin romper el centrado
    titulo.style.display = 'flex';
    titulo.style.flexDirection = 'column';
    titulo.style.alignItems = 'center';
    titulo.style.justifyContent = 'center';
    titulo.style.gap = '15px';

    btn.style.marginTop = '10px'; // Un poco de espacio debajo del texto
    btn.style.marginLeft = '0'; // Quitar el margen izquierdo original


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
    
    const iconoLupa = document.createElement('div');
    iconoLupa.innerHTML = '🔍';
    iconoLupa.className = 'icono-lupa-img';
    
    // Asegurar que el contenedor tenga position relative
    img.parentElement.style.position = 'relative';
    img.parentElement.appendChild(iconoLupa);
    
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
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    
    // Calcular posición (intentar ponerlo arriba del botón clickeado)
    let top = rect.top + scrollY - 65; 
    let left = rect.left + scrollX - 20;
    
    // Si se sale por arriba (ej: al hacer scroll del menú), ponerlo abajo del botón
    if (rect.top < 70) {
      top = rect.bottom + scrollY + 15;
    }
    // Si se sale por la derecha de la pantalla (en teléfonos móbiles)
    if (left + 150 > window.innerWidth) {
      left = window.innerWidth - 160;
    }
    // Si se sale por la izquierda
    if (left < 10) left = 10;
    
    controles.style.top = `${top}px`;
    controles.style.left = `${left}px`;
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
    audioPapaPersonalizado = new Audio('./img/audio-papa.m4a'); 
    
    audioPapaPersonalizado.onended = () => {
      btn.classList.remove('hablando');
      btn.innerHTML = '🔊 ¡Escucha el saludo de Papá!';
    };
    
    // Control de errores básicos
    audioPapaPersonalizado.onerror = () => {
      alert("¡Ups! Hubo un problema cargando tu audio. Asegúrate de llamarlo 'audio-papa.m4a' y ponerlo en la carpeta 'img'.");
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
