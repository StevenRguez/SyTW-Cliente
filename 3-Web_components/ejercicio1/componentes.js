// Extraer referencia de la plantilla para poder crear el elemento
const plantilla = document.getElementById('botones-webComponent');

// Definir la clase del web component
class WebComponent extends HTMLElement {
    // Constructor del web component
    constructor() {
        super();
        // Adjuntar un shadow DOM
        this.attachShadow({ mode: 'open' });
        // Clonar el contenido de la plantilla y adjuntarlo al shadow DOM
        const clone = plantilla.content.cloneNode(true);
        this.shadowRoot.appendChild(clone);
        // Coger una referencia al botón con id anyadir-webComponent que están en el elemento creado.
        this.button = this.shadowRoot.querySelector('#anyadir-webComponent');
        // Coger una referencia al botón con id cambiar-webComponent que están en el elemento creado.
        this.changeButton = this.shadowRoot.querySelector('#cambiar-webComponent');
        console.log(`Creado. Estado inicial: ${this.getAttribute('state')}`); // Mensaje en consola al crear el componente
    }

    // Se requiere declarar los atributos observados para que el navegador llame a attributeChangedCallback
    static get observedAttributes() { 
        return ['state']; 
    }

    connectedCallback() {
        console.log("Conectado");
        // Añadir un nuevo web component al hacer click en el botón Añadir
        this.button.addEventListener('click', () => {
            const nuevoComponente = document.createElement('web-component');
            document.getElementById('Area-webComponent').appendChild(nuevoComponente);
        });

        // Cambiar un atributo simple al hacer click en el botón Cambiar
        this.changeButton.addEventListener('click', () => {
            const estadoActual = this.getAttribute('state') === 'on' ? 'off' : 'on'; // Alternar entre 'on' y 'off'
            this.setAttribute('state', estadoActual); // Cambiar el atributo 'state' al siguiente estado
        });
    }
    disconnectedCallback() {
        console.log("Desconectado");
    }
    adoptedCallback() {
        console.log("Creado");
    }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Atributo cambiado: ${name} -> ${newValue}`);
    }
}

// Registrar el web component con el nombre 'web-component'
customElements.define('web-component', WebComponent);