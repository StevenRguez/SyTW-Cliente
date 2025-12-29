const audio = document.getElementById('myAudioPlayer');
const playPauseBtn = document.getElementById('playPause');
const stopBtn = document.getElementById('stop');
const volumeSlider = document.getElementById('volume');
const progressContainer = document.getElementById('progressContainer'); // Modificación 1: Contenedor de barra de progreso
const progressBar = document.getElementById('progressBar');             // Modificación 1: Barra de progreso    
const speedBtn = document.getElementById('speedBtn');                   // Modificación 2: Botón de velocidad de reproducción
const backwardBtn = document.getElementById('backward');                // Modificación 3: Botón de retroceso
const forwardBtn = document.getElementById('forward');                  // Modificación 3: Botón de avance
const muteBtn = document.getElementById('muteBtn');                     // Modificación 4: Botón de silencio

/* Variables y constantes para las modificaciones: */

// Modificación 2: Velocidad de reproducción
const speeds = [0.5, 1, 1.5, 2]; // velocidades disponibles, en orden
let currentSpeedIndex = 1; // Comienza en 1x

// Modificación 4: Silencio
let lastVolume = audio.volume; // Guarda el volumen previo al silencio


// Formato de tiempo
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2,'0')}`;
}

// Play / Pause
playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = '⏸ Pause';
    } else {
        audio.pause();
        playPauseBtn.textContent = '▶ Play';
    }
});

// Stop
stopBtn.addEventListener('click', () => {
    audio.pause();
    audio.currentTime = 0;
    playPauseBtn.textContent = '▶ Play';
});

// Volumen
volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value / 100;

    // Cambia el icono según el volumen
    muteBtn.textContent = audio.volume === 0 ? '🔇' : '🔊';

    // Actualiza el último volumen válido
    if (audio.volume > 0) {
        lastVolume = audio.volume;
    }
});

// Tiempo actual
audio.addEventListener('timeupdate', () => {
    // Actualiza el texto del tiempo actual
    document.getElementById('currentTime')
        .textContent = formatTime(audio.currentTime);

    // Modificación 1: Barra de progreso
    // Calcula el porcentaje reproducido y actualiza el ancho de la barra
    if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${percent}%`;
    }

    // Modificación 5: Guarda la posición actual en localStorage
    localStorage.setItem('audioTime', audio.currentTime);
});

// Duración
audio.addEventListener('loadedmetadata', () => {
    document.getElementById('duration')
        .textContent = formatTime(audio.duration);

    // Modificación 5: Restaura la posición guardada al recargar la página
    const savedTime = localStorage.getItem('audioTime');

    if (savedTime !== null) { // Si existe un valor guardado, se asigna al audio
        audio.currentTime = savedTime;
    }
});

// Auto-reset al finalizar
audio.addEventListener('ended', () => {
    playPauseBtn.textContent = '▶ Play';
    audio.currentTime = 0;
    localStorage.removeItem('audioTime'); // Limpia el tiempo guardado
});


/* Implementación de las modificaciones */

// Modificación 1: Barra de progreso interactiva
progressContainer.addEventListener('click', (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  // Se calcula el nuevo tiempo basado en el punto clicado
  audio.currentTime = (clickX / width) * audio.duration;
});

// Modificación 2: Cambio de velocidad de reproducción
speedBtn.addEventListener('click', () => {
    // Avanza al siguiente índice
    currentSpeedIndex = (currentSpeedIndex + 1) % speeds.length;
    // Aplica la velocidad al audio
    audio.playbackRate = speeds[currentSpeedIndex];
    // Actualiza el texto del botón
    speedBtn.textContent = `${speeds[currentSpeedIndex]}x`;
});

// Modificación 3: Retroceso 10 segundos
backwardBtn.addEventListener('click', () => {
    audio.currentTime = Math.max(0, audio.currentTime - 10); // Evita tiempo negativo
});

// Modificación 3: Avance 10 segundos
forwardBtn.addEventListener('click', () => {
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 10); // Evita exceder la duración
});

// Modificación 4: Botón de silencio
muteBtn.addEventListener('click', () => {
    // Si el volumen es mayor que 0, se silencia
    if (audio.volume > 0) {
        lastVolume = audio.volume;   // guarda el volumen actual
        audio.volume = 0;            // silencia
        volumeSlider.value = 0;      // actualiza el slider
        muteBtn.textContent = '🔇';  // cambia icono
    } 
    // Si está silenciado, se restaura el volumen anterior
    else {
        audio.volume = lastVolume;
        volumeSlider.value = lastVolume * 100;
        muteBtn.textContent = '🔊';
    }
});