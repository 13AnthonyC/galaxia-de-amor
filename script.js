import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js';

let escena = new THREE.Scene();
let camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderizador = new THREE.WebGLRenderer({ antialias: true });
renderizador.setSize(window.innerWidth, window.innerHeight);
document.getElementById("contenedor").appendChild(renderizador.domElement);

// Fondo estrellado
let geometriaEstrellas = new THREE.BufferGeometry();
let cantidadEstrellas = 2000;
let posiciones = [];

for (let i = 0; i < cantidadEstrellas; i++) {
  posiciones.push((Math.random() - 0.5) * 2000);
  posiciones.push((Math.random() - 0.5) * 2000);
  posiciones.push((Math.random() - 0.5) * 2000);
}

geometriaEstrellas.setAttribute('position', new THREE.Float32BufferAttribute(posiciones, 3));
let materialEstrellas = new THREE.PointsMaterial({ color: 0xff66cc, size: 2 });
let estrellas = new THREE.Points(geometriaEstrellas, materialEstrellas);
escena.add(estrellas);

// Sol central
let materialSol = new THREE.MeshBasicMaterial({ color: 0xffbb00 });
let sol = new THREE.Mesh(new THREE.SphereGeometry(20, 64, 64), materialSol);
escena.add(sol);

// Texto central
let canvas = document.createElement('canvas');
let ctx = canvas.getContext('2d');
canvas.width = 1024;
canvas.height = 256;
ctx.fillStyle = "#fff";
ctx.font = "80px Poppins";
ctx.textAlign = "center";
ctx.fillText("Sofía, amor de mi vida 💖", 512, 150);
let texturaTexto = new THREE.CanvasTexture(canvas);
let materialTexto = new THREE.SpriteMaterial({ map: texturaTexto });
let spriteTexto = new THREE.Sprite(materialTexto);
spriteTexto.scale.set(80, 20, 1);
spriteTexto.position.set(0, 40, 0);
escena.add(spriteTexto);

// Palabras románticas
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
  escena.add(s);
});

camara.position.z = 150;

let controles = new OrbitControls(camara, renderizador.domElement);
controles.enableZoom = true;
controles.enableDamping = true;
controles.dampingFactor = 0.1;

function animar() {
  requestAnimationFrame(animar);
  sol.rotation.y += 0.005;
  estrellas.rotation.y += 0.0005;
  controles.update();
  renderizador.render(escena, camara);
}
animar();
