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
        console.log("Asignar puntuación conectado");
        this.button.addEventListener("click", () => {
            this.dispatchEvent(new CustomEvent("pedir-valoraciones", {
                bubbles: true, // Permitir que el evento burbujee (que suba por la estructura DOM y que no sea visible sólo por el componente hijo)
                composed: true, // Permitir que el evento salga del shadow DOM
                detail: { origen: "asignar-puntuacion" }    // Pasa datos personalizados al receptor
            }));
            // De momento, solo mostramos un aviso simple
            alert("Valoraciones simuladas (a implementar)");
        });
    }
}

customElements.define("asignar-puntuacion", GenerarAsignarPuntuacion);