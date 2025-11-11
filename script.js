const canvas = document.getElementById("galaxia");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const palabras = [
  "te amo", "princesa", "colochita", "hermosa", "preciosa", "linda", "bella",
  "guapa", "te quiero", "te necesito", "mi vida", "mi mundo", "mi amor",
  "mi reina", "mi tesoro", "mi cielo", "corazón", "mi luz", "mi todo"
];

const estrellas = [];

for (let i = 0; i < 700; i++) {
  estrellas.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 1.5,
    vel: 0.2 + Math.random() * 0.8,
    palabra: palabras[Math.floor(Math.random() * palabras.length)],
    color: `hsl(${Math.random() * 360}, 80%, 80%)`
  });
}

function animar() {
  ctx.fillStyle = "rgba(0, 0, 20, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  estrellas.forEach(e => {
    ctx.fillStyle = e.color;
    ctx.font = `${10 + e.size * 8}px cursive`;
    ctx.fillText(e.palabra, e.x, e.y);

    e.y -= e.vel;
    if (e.y < -20) {
      e.y = canvas.height + 20;
      e.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(animar);
}

animar();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
