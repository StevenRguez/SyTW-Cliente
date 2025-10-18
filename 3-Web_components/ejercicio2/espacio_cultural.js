// Se extrae la plantilla del web component 'espacio cultural' 
const plantillaEspacioCultural = document.getElementById("espacio-cultural-template");

// Definición del web component 'generar-espacio-cultural'
class GenerarEspacioCultural extends HTMLElement {
    constructor() {
    super();
    this.attachShadow({ mode: "open" });
    // Añadir hoja de estilos al shadow DOM
    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "estilos.css");
    this.shadowRoot.appendChild(link);

    // Crear el contenedor de la lista
    const container = document.createElement("div");
    container.id = "lista";
    container.textContent = "Cargando...";
    this.shadowRoot.appendChild(container);
    this.$lista = container;

    // Referencia al contenedor de la lista
    this.$lista = this.shadowRoot.querySelector("#lista");

    // Slot para proyectar <asignar-puntuacion> desde el light DOM
    const slot = document.createElement("slot");
    this.shadowRoot.appendChild(slot);
}

connectedCallback() {
    const src = this.getAttribute("src") || "espacios-culturales.json";

    fetch(src)
        .then(res => res.json()) // Convertir la respuesta a JSON
        .then(data => { // 'data' es el array de espacios culturales
            if (!Array.isArray(data) || data.length === 0) {
                this.$lista.textContent = "Sin datos"; // Mensaje si no hay datos
                return;
            }

            this.$lista.innerHTML = ""; // limpiamos el placeholder

            // Tomar 3 aleatorios (muy simple; permite repetidos)
            for (let i = 0; i < 3; i++) {
                const item = data[Math.floor(Math.random() * data.length)]; // Elegir un elemento aleatorio
                const node = plantillaEspacioCultural.content.cloneNode(true); // Clonar la plantilla
                // Rellenar el contenido con los datos del espacio cultural
                node.querySelector(".nombre").textContent =
                item?.espacio_cultura_nombre ?? "Sin título";
                // Rellenar otros campos según la estructura del JSON
                node.querySelector(".tipo_instalacion").textContent = // Tipo de la instalación
                "Tipo de instalación: " + (item?.uso_tipo ?? "Desconocido");
                node.querySelector(".isla").textContent = // Isla donde se encuentra
                item?.direccion_isla_nombre ?? "Desconocida";
                node.querySelector(".municipio").textContent = // Municipio
                item?.direccion_municipio_nombre ?? "Desconocido";

                // Añadir el web component 'asignar-puntuacion' dentro de cada tarjeta
                const acciones = node.querySelector('.acciones');
                acciones.appendChild(document.createElement('asignar-puntuacion'));

                this.$lista.appendChild(node); // Añadir el nodo al contenedor de la lista
            }
        })
        .catch(err => {
            console.error("Error cargando JSON:", err);
            this.$lista.textContent = "Error al cargar";
        });
    }
}

customElements.define("generar-espacio-cultural", GenerarEspacioCultural);