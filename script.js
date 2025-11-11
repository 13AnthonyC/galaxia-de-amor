// Galaxia de Amor — versión estable 🌌
// Anthony ➜ Sofía 💖

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 400;

// Fondo con estrellas básicas
const starGeo = new THREE.BufferGeometry();
const starCount = 2000;
const starPositions = new Float32Array(starCount * 3);
for (let i = 0; i < starCount * 3; i++) starPositions[i] = (Math.random() - 0.5) * 2000;
starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 1 });
const stars = new THREE.Points(starGeo, starMat);
scene.add(stars);

// Luz suave
const ambient = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambient);

// Palabras románticas
const palabras = [
  "Te amo", "Princesa", "Colochita", "Hermosa", "Preciosa", "Linda",
  "Bella", "Guapa", "Mi vida", "Mi mundo", "Te quiero", "Te necesito",
  "Bonita", "Mi sol", "Mi reina", "Encanto", "Cielo", "Tesoro", "Amor",
  "Mi corazón", "Mi razón", "Mi todo", "Mi luz", "Amorcito"
];

// Cargar fuente y crear textos visibles
const loader = new THREE.FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', font => {
  const grupo = new THREE.Group();
  scene.add(grupo);

  for (let i = 0; i < 300; i++) {
    const texto = palabras[Math.floor(Math.random() * palabras.length)];
    const geo = new THREE.TextGeometry(texto, { font, size: 3, height: 0.2 });
    const color = new THREE.Color().setHSL(Math.random(), 0.8, 0.7);
    const mat = new THREE.MeshBasicMaterial({ color });
    const mesh = new THREE.Mesh(geo, mat);

    const r = 300 + Math.random() * 100;
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.random() * Math.PI;
    mesh.position.set(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    );
    mesh.rotation.y = Math.random() * Math.PI;
    mesh.rotation.x = Math.random() * Math.PI;
    grupo.add(mesh);
  }

  // Texto central
  const centroGeo = new THREE.TextGeometry("Sofía, amor de mi vida, te amo", { font, size: 10, height: 1 });
  const centroMat = new THREE.MeshBasicMaterial({ color: 0xff66cc });
  const centro = new THREE.Mesh(centroGeo, centroMat);
  centro.position.set(-120, 0, 0);
  grupo.add(centro);

  // Animación
  function animate() {
    requestAnimationFrame(animate);
    grupo.rotation.y += 0.001;
    grupo.rotation.x += 0.0005;
    stars.rotation.y += 0.0002;
    renderer.render(scene, camera);
  }
  animate();

  // Zoom y clic de color
  window.addEventListener('wheel', e => {
    camera.position.z += e.deltaY * 0.3;
    camera.position.z = Math.max(100, Math.min(800, camera.position.z));
  });
  window.addEventListener('click', () => {
    grupo.children.forEach(obj => {
      if (obj.material && obj.material.color) {
        obj.material.color.setHSL(Math.random(), 0.8, 0.7);
      }
    });
  });
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
