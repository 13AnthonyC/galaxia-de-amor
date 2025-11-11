let scene, camera, renderer;
const container = document.getElementById("container");

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 150;

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Luz central (el “sol”)
const light = new THREE.PointLight(0xffcc66, 2, 500);
light.position.set(0, 0, 0);
scene.add(light);

const palabras = [
  "te amo", "princesa", "colochita", "hermosa", "preciosa", "linda", "bella", "guapa",
  "te quiero", "te necesito", "mi vida", "mi mundo", "mi amor", "mi reina", "mi tesoro",
  "mi cielo", "corazón", "mi luz", "mi todo", "mi razón", "solo tú", "mi estrella"
];

// Crear partículas de palabras
const loader = new THREE.TextureLoader();
const particleMaterial = new THREE.SpriteMaterial({
  map: loader.load("https://threejsfundamentals.org/threejs/resources/images/disc.png"),
  color: 0xffffff
});

for (let i = 0; i < 800; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 50 + Math.random() * 200;
  const y = (Math.random() - 0.5) * 150;

  const sprite = new THREE.Sprite(particleMaterial);
  sprite.position.set(
    Math.cos(angle) * radius,
    y,
    Math.sin(angle) * radius
  );
  sprite.scale.set(0.8, 0.8, 0.8);
  scene.add(sprite);

  // Crear una palabra flotante
  const div = document.createElement("div");
  div.style.position = "absolute";
  div.style.color = `hsl(${Math.random() * 360}, 80%, 70%)`;
  div.style.fontSize = "14px";
  div.style.fontFamily = "cursive";
  div.textContent = palabras[Math.floor(Math.random() * palabras.length)];
  const label = new THREE.CSS2DObject(div);
  label.position.copy(sprite.position);
  sprite.add(label);
}

// Texto central (el “sol del amor”)
const div = document.createElement("div");
div.innerHTML = "Sofía 💖 Amor de mi vida";
div.style.fontSize = "28px";
div.style.color = "#ffd700";
div.style.textShadow = "0 0 10px #ffcc00, 0 0 30px #ff6600";
div.style.fontFamily = "Segoe Script, cursive";
const labelCentral = new THREE.CSS2DObject(div);
scene.add(labelCentral);

const cssRenderer = new THREE.CSS2DRenderer();
cssRenderer.setSize(window.innerWidth, window.innerHeight);
cssRenderer.domElement.style.position = "absolute";
cssRenderer.domElement.style.top = "0";
container.appendChild(cssRenderer.domElement);

// Animación
function animate() {
  requestAnimationFrame(animate);
  scene.rotation.y += 0.0015;
  scene.rotation.x += 0.0003;
  renderer.render(scene, camera);
  cssRenderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  cssRenderer.setSize(window.innerWidth, window.innerHeight);
});
