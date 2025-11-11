// Galaxia de Amor 3D para Sofía 💖
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("contenedor").appendChild(renderer.domElement);

// Fondo de estrellas
let starGeometry = new THREE.BufferGeometry();
let starCount = 2000;
let starPositions = [];

for (let i = 0; i < starCount; i++) {
  starPositions.push((Math.random() - 0.5) * 2000);
  starPositions.push((Math.random() - 0.5) * 2000);
  starPositions.push((Math.random() - 0.5) * 2000);
}
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
let starMaterial = new THREE.PointsMaterial({ color: 0xff66cc, size: 2 });
let stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Sol
let sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffbb00 });
let sun = new THREE.Mesh(new THREE.SphereGeometry(20, 64, 64), sunMaterial);
scene.add(sun);

// Texto central
let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 256;
ctx.fillStyle = "#fff";
ctx.font = "80px Poppins";
ctx.textAlign = "center";
ctx.fillText("Sofía, amor de mi vida 💖", 512, 150);
let textTexture = new THREE.CanvasTexture(canvas);
let textMaterial = new THREE.SpriteMaterial({ map: textTexture });
let textSprite = new THREE.Sprite(textMaterial);
textSprite.scale.set(80, 20, 1);
textSprite.position.set(0, 40, 0);
scene.add(textSprite);

// Palabras flotantes
const palabras = [
  "te amo", "princesa", "colochita", "hermosa", "preciosa", "linda",
  "bella", "guapa", "mi vida", "mi mundo", "te necesito", "mi amor",
  "mi cielo", "mi reina", "mi corazón", "mi todo", "solo tú", "mi sol", "mi estrella"
];

palabras.forEach(() => {
  let palabra = palabras[Math.floor(Math.random() * palabras.length)];
  let c = document.createElement('canvas');
  let ct = c.getContext('2d');
  c.width = 512; c.height = 128;
  ct.fillStyle = "#ff99cc";
  ct.font = "50px Poppins";
  ct.textAlign = "center";
  ct.fillText(palabra, 256, 80);
  let t = new THREE.CanvasTexture(c);
  let m = new THREE.SpriteMaterial({ map: t, transparent: true });
  let s = new THREE.Sprite(m);
  s.position.set((Math.random() - 0.5) * 400, (Math.random() - 0.5) * 400, (Math.random() - 0.5) * 400);
  s.scale.set(40, 10, 1);
  scene.add(s);
});

camera.position.z = 150;

// Controles
let controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.enableDamping = true;
controls.dampingFactor = 0.1;

function animate() {
  requestAnimationFrame(animate);
  sun.rotation.y += 0.005;
  stars.rotation.y += 0.0005;
  controls.update();
  renderer.render(scene, camera);
}
animate();

