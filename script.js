// --- Galaxia de Amor ---
// Creado por Anthony para Sofía 💖

// Cargar librería Three.js desde CDN
import('https://cdn.jsdelivr.net/npm/three@0.159.0/build/three.module.js').then(THREE => {
  const { Scene, PerspectiveCamera, WebGLRenderer, TextureLoader, PointsMaterial, BufferGeometry, Points, Vector3, FontLoader, TextGeometry, MeshBasicMaterial, Mesh, AdditiveBlending, Color } = THREE;

  // Crear escena
  const scene = new Scene();
  const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.style.margin = '0';
  document.body.style.overflow = 'hidden';
  document.body.appendChild(renderer.domElement);

  // Palabras románticas 💕
  const palabras = [
    "Te amo", "Princesa", "Colochita", "Hermosa", "Preciosa", "Linda",
    "Bella", "Guapa", "Mi vida", "Mi mundo", "Te quiero", "Te necesito",
    "Bonita", "Mi sol", "Mi reina", "Encanto", "Cielo", "Tesoro", "Amor",
    "Mi corazón", "Mi razón", "Mi todo", "Mi luz", "Amorcito"
  ];

  // Crear partículas como texto flotante
  const loader = new FontLoader();
  loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
    const numPalabras = 800;
    for (let i = 0; i < numPalabras; i++) {
      const texto = palabras[Math.floor(Math.random() * palabras.length)];
      const geometry = new TextGeometry(texto, {
        font: font,
        size: Math.random() * 2 + 1,
        height: 0.1,
      });
      const color = new Color().setHSL(Math.random(), 0.8, 0.8);
      const material = new MeshBasicMaterial({ color, transparent: true, opacity: 0.8 });
      const mesh = new Mesh(geometry, material);

      const radius = Math.random() * 400 - 200;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.random() * Math.PI;

      mesh.position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );

      scene.add(mesh);
    }

    // Texto central: Sofía 💖
    const geoCentro = new TextGeometry("Sofía, amor de mi vida, te amo", {
      font: font,
      size: 10,
      height: 1,
    });
    const matCentro = new MeshBasicMaterial({ color: 0xffaaff });
    const centro = new Mesh(geoCentro, matCentro);
    centro.position.set(-80, 0, 0);
    scene.add(centro);
  });

  camera.position.z = 500;

  // Animación suave de rotación
  function animate() {
    requestAnimationFrame(animate);
    scene.rotation.y += 0.0008;
    scene.rotation.x += 0.0003;
    renderer.render(scene, camera);
  }

  // Control de zoom con scroll
  window.addEventListener('wheel', (e) => {
    camera.position.z += e.deltaY * 0.3;
  });

  // Redimensionar
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  animate();
});


