const canvas = document.getElementById("galaxia");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const palabras = [
  "te amo", "princesa", "colochita", "hermosa", "preciosa", "linda", "bella",
  "guapa", "te quiero", "te necesito", "mi vida", "mi mundo", "mi amor",
  "mi reina", "mi tesoro", "mi cielo", "corazón", "mi luz", "mi todo"
];

// Creamos muchas "estrellas-palabras" en espiral
const estrellas = [];
const numEstrellas = 1200;
const centroX = canvas.width / 2;
const centroY = canvas.height / 2;

for (let i = 0; i < numEstrellas; i++) {
  const angulo = i * 0.25;
  const radio = 0.5 * Math.sqrt(i) * 8;
  const x = centroX + Math.cos(angulo) * radio;
  const y = centroY + Math.sin(angulo) * radio;

  estrellas.push({
    x,
    y,
    size: Math.random() * 1.5 + 0.5,
    palabra: palabras[Math.floor(Math.random() * palabras.length)],
    color: `hsl(${Math.random() * 360}, 90%, 80%)`,
    angleOffset: angulo
  });
}

let rotacion = 0;

function animar() {
  ctx.fillStyle = "rgba(0, 0, 15, 0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  rotacion += 0.001;

  estrellas.forEach(e => {
    const a = e.angleOffset + rotacion;
    const r = Math.sqrt((e.x - centroX) ** 2 + (e.y - centroY) ** 2);

    const x = centroX + Math.cos(a) * r;
    const y = centroY + Math.sin(a) * r;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(a / 2);
    ctx.fillStyle = e.color;
    ctx.font = `${8 + e.size * 10}px cursive`;
    ctx.fillText(e.palabra, 0, 0);
    ctx.restore();
  });

  // Luz central (el "sol del amor")
  const gradiente = ctx.createRadialGradient(centroX, centroY, 0, centroX, centroY, 200);
  gradiente.addColorStop(0, "rgba(255,215,0,0.8)");
  gradiente.addColorStop(1, "rgba(255,140,0,0)");
  ctx.fillStyle = gradiente;
  ctx.beginPath();
  ctx.arc(centroX, centroY, 200, 0, Math.PI * 2);
  ctx.fill();

  requestAnimationFrame(animar);
}

animar();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
