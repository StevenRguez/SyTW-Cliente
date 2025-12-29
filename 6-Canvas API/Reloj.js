// Extraer el canvas y el contexto 2D
const canvas = document.getElementById("reloj");
const context = canvas.getContext("2d");

// Función auxiliar: convierte una fracción de vuelta a radianes.
//    - En trigonometría 0 rad está a la derecha, pero en un reloj queremos “arriba”.
//    - Por eso restamos PI/2 (90 grados).
function fraccionARadianes(fraccion) {
  return fraccion * Math.PI * 2 - Math.PI / 2;
}

// Dibujar un círculo simple para la esfera del reloj
function dibujarEsfera(centroX, centroY, radio) {
  context.beginPath();                                  // Inicia un nuevo trazo
  context.arc(centroX, centroY, radio, 0, Math.PI * 2); // Dibuja círculos  
  context.fillStyle = "rgba(255,255,255,0.06)";       // Color de relleno
  context.fill();                                       // Rellena el círculo

  context.lineWidth = 6;                                // Ancho del borde
  context.strokeStyle = "rgba(127, 127, 127, 0.55)";  // Color del borde
  context.stroke();                                     // Dibuja el borde
}

// Dibuja una aguja genérica desde el centro con un ángulo y una longitud
function dibujarAguja(centroX, centroY, angulo, longitud, grosor) {
  context.beginPath();
  context.lineWidth = grosor;
  context.lineCap = "round";                            // Bordes redondeados
  context.moveTo(centroX, centroY);                     // Punto de inicio
  context.lineTo(
    (centroX + Math.cos(angulo) * longitud),
    (centroY + Math.sin(angulo) * longitud)
  );                                                    // Punto final  
  context.stroke();
}

// Render: limpia y vuelve a dibujar todo el reloj según la hora actual
function renderizarReloj() {
  const ancho = canvas.width;
  const alto = canvas.height;
  const centroX = ancho / 2;
  const centroY = alto / 2;
  const radio = Math.min(ancho, alto) * 0.4;

  context.clearRect(0, 0, ancho, alto);         // Limpia el canvas

  dibujarEsfera(centroX, centroY, radio);

  const now = new Date();
  const ms = now.getMilliseconds();
  const segundos = now.getSeconds() + (ms / 1000); 
  const minutos = now.getMinutes() + (segundos / 60);
  const horas = (now.getHours() % 12) + (minutos / 60);

  const aSec  = fraccionARadianes(segundos / 60); 
  const aMin  = fraccionARadianes(minutos / 60);
  const aHour = fraccionARadianes(horas / 12);

  // Horas
  context.strokeStyle = "rgba(240,240,240,0.92)";
  dibujarAguja(centroX, centroY, aHour, radio * 0.4, 10);
  // Minutos
  context.strokeStyle = "rgba(240, 240, 240, 0.68)";
  dibujarAguja(centroX, centroY, aMin, radio * 0.7, 7);
  // Segundos
  context.strokeStyle = "rgba(57, 222, 255, 0.9)";
  dibujarAguja(centroX, centroY, aSec, radio * 0.8, 3);

  // Punto central
  context.beginPath();
  context.arc(centroX, centroY, 6, 0, Math.PI * 2);
  context.fillStyle = "rgba(25, 125, 207, 0.9)";
  context.fill();
}

// Repinta usando requestAnimationFrame (animación fluida)
function loop() {
  renderizarReloj();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);