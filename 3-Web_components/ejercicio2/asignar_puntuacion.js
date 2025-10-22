// Se extrae la plantilla del web component 'asignar_puntuacion' 
const plantillaAsignarPuntuacion = document.getElementById("asignar-puntuacion-template");

// Definición del web component 'generar-asignar-puntuacion'
class GenerarAsignarPuntuacion extends HTMLElement {
    constructor() {
        super();
        // Adjuntar un shadow DOM
        this.attachShadow({ mode: "open" });
        // Clonar el contenido de la plantilla y adjuntarlo al shadow DOM
        const clone = plantillaAsignarPuntuacion.content.cloneNode(true);
        this.shadowRoot.appendChild(clone);
        // Coger una referencia al botón con id asignar-puntuacion-btn que está en el elemento creado.
        this.button = this.shadowRoot.querySelector('#asignar-puntuacion-btn');
        
        // Añadir hoja de estilos al shadow DOM
        const link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "estilos.css");
        this.shadowRoot.appendChild(link);
    }

    connectedCallback() {
        console.log("Generar puntuación conectado");
        this.button.addEventListener("click", () => {
            this.dispatchEvent(new CustomEvent("pedir-valoraciones", {
                bubbles: true, // Permitir que el evento burbujee (que suba por la estructura DOM y que no sea visible sólo por el componente hijo)
                composed: true, // Permitir que el evento salga del shadow DOM
                detail: { origen: "generar-puntuacion" }    // Pasa datos personalizados al receptor
            }));
            // Se genera un número aleatorio del 1 al 5
            const puntuacion = Math.floor(Math.random() * 5) + 1;
            // Se reemplaza el contenido del botón por la puntuación generada
            this.button.textContent = `${puntuacion}`;
            // Crear estrellas (rellenas y vacías)
            const estrellas = "★".repeat(puntuacion) + "☆".repeat(5 - puntuacion);
            // Reemplazar el contenido del botón por las estrellas
            this.button.textContent = estrellas;
            // Desactivar el botón para que solo se pueda pulsar una vez
            this.button.disabled = true;
            // Se genera un número que represente un comentario, extraído de un fichero json
            const numeroComentario = Math.floor(Math.random() * 9) + 1;
            fetch("valoraciones.json")
                .then(response => response.json())
                .then(data => {
                    const comentario = '"' + data.valoraciones[numeroComentario] + '"';
                    // Mostrar el comentario debajo del botón
                    const comentarioElem = document.createElement("p");
                    comentarioElem.textContent = comentario;
                    this.shadowRoot.appendChild(comentarioElem);
                });
        });
    }
}

customElements.define("asignar-puntuacion", GenerarAsignarPuntuacion);