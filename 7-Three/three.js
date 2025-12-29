import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";

/* =====================================================
   CONFIGURACIÓN BÁSICA
   ===================================================== */

// Canvas y renderer (motor de dibujo)
const canvas = document.querySelector("#scene");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111319);

// Cámara
const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
camera.position.set(3, 2, 4);

// Controles de cámara (interacción del usuario)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;  // Suavizado de movimiento
controls.target.set(0, 0.6, 0); // Punto de enfoque inicial

/* =====================================================
   ILUMINACIÓN Y REFERENCIAS VISUALES
   ===================================================== */

// Luz ambiente + direccional (setup simple y efectivo)
scene.add(new THREE.HemisphereLight(0xffffff, 0x222233, 0.9));

const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
dirLight.position.set(3, 5, 2);
scene.add(dirLight);

// Suelo opcional para referencia espacial
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({ color: 0x2a2d35, roughness: 1 })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

/* =====================================================
   CARGA DE MODELOS GLTF / GLB DESDE URL
   Ejemplos de modelos públicos:
   - https://threejs.org/examples/models/gltf/Flamingo.glb
   - https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf
   ===================================================== */

const loader = new GLTFLoader();
let currentModel = null;

/**
 * Carga un modelo 3D desde una URL, lo centra y lo escala automáticamente
 */
function loadModel(url) {
  loader.load(
    url,
    (gltf) => {
      if (currentModel) scene.remove(currentModel);

      // Grupo contenedor (clave para modelos animados)
      const container = new THREE.Group();
      container.add(gltf.scene);
      scene.add(container);
      currentModel = container;

      // Bounding box correcta sobre el CONTENEDOR
      const box = new THREE.Box3().setFromObject(container);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      // Centrar el contenedor
      container.position.x -= center.x;
      container.position.z -= center.z;
      container.position.y -= box.min.y;

      // Ajustar cámara al tamaño del modelo
      const maxDim = Math.max(size.x, size.y, size.z);
      const distance = maxDim * 2.2;

      // Posicionar la cámara según el tamaño del modelo
      camera.position.set(distance, distance * 0.6, distance);
      camera.near = maxDim / 100;
      camera.far = maxDim * 100;
      camera.updateProjectionMatrix();

      // Ajustar controles
      controls.target.set(0, 0, 0);
      controls.update();
    },
    undefined,
    () => alert("Error cargando el modelo")
  );
}

/* =====================================================
   RESIZE Y BUCLE DE RENDER
   ===================================================== */

// Ajustar renderer y cámara al tamaño real del canvas
function resize() {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

// Bucle principal de animación
function animate() {
  resize();
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

/* =====================================================
   CONEXIÓN CON LA INTERFAZ (INPUT + BOTÓN)
   ===================================================== */

const input = document.querySelector("#modelUrl");
const button = document.querySelector("#loadBtn");

button.addEventListener("click", () => {
  const url = input.value.trim();
  if (url) loadModel(url);
  else alert("Introduce una URL válida");
});