// 💖 Galaxia de Amor - creada por Anthony para Sofía 💫

// Configuración básica
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 500;

// Palabras románticas que serán las "estrellas"
const palabras = [
  "Te amo", "Princesa", "Colochita", "Hermosa", "Preciosa", "Linda",
  "Bella", "Guapa", "Mi vida", "Mi mundo", "Te quiero", "Te necesito",
  "Bonita", "Mi sol", "Mi reina", "Encanto", "Cielo", "Tesoro", "Amor",
  "Mi corazón", "Mi razón", "Mi todo", "Mi luz", "Amorcito"
];

// Cargar fuente y crear estrellas-palabras
const loader = new THREE.FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {

  const grupo = new THREE.Group();
  scene.add(grupo);

  for (let i = 0; i < 1000; i++) {
    const texto = palabras[Math.floor(Math.random() * palabras.length)];
    const geometry = new THREE.TextGeometry(texto, {
      font: font,
      size: Math.random() * 2 + 1,
      height: 0.1,
    });

    const color = new THREE.Color().setHSL(Math.random(), 0.8, 0.8);
    const material = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.8 });
    const mesh = new THREE.Mesh(geometry, material);

    const radius = Math.random() * 400 - 200;
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.random() * Math.PI;

    mesh.position.set(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi)
    );

    mesh.userData = { baseScale: mesh.scale.clone() };
    grupo.add(mesh);
  }

  // Texto central: Sofía, amor de mi vida 💗
  const geoCentro = new THREE.TextGeometry("Sofía, amor de mi vida, te amo", {
    font: font,
    size: 10,
    height: 1,
  });
  const matCentro = new THREE.MeshBasicMaterial({ color: 0xff66cc });
  const centro = new THREE.Mesh(geoCentro, matCentro);
  centro.position.set(-80, 0, 0);
  grupo.add(centro);

  // Animación
  function animate() {
    requestAnimationFrame(animate);
    grupo.rotation.y += 0.0008;
    grupo.rotation.x += 0.0003;
    renderer.render(scene, camera);
  }

  animate();

  // Zoom suave
  window.addEventListener('wheel', (e) => {
    camera.position.z += e.deltaY * 0.3;
    camera.position.z = Math.max(100, Math.min(1000, camera.position.z));
  });

  // Efecto de clic: cambio de color y tamaño
  window.addEventListener('click', () => {
    grupo.children.forEach(obj => {
      if (obj.material) {
        obj.material.color.setHSL(Math.random(), 0.8, 0.8);
        const s = 0.5 + Math.random() * 1.5;
        obj.scale.set(s, s, s);
      }
    });
  });

  // Redimensionar
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
