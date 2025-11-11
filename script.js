const canvas = document.getElementById('galaxia');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const palabras = ["Te amo", "Eres mi universo", "Mi vida", "Mi estrella", "Amor eterno", "Contigo hasta el fin", "te amo", "princesa", "colochita", "hermosa", "preciosa", "linda", "bella", "guapa", "te quiero", "te necesito", "mi vida", "mi mundo", "mi amor", "mi reina", "mi tesoro", "mi cielo", "corazón", "mi luz", "mi todo", "mi razón", "solo tú", "mi estrella"];
const estrellas = [];

function nuevaEstrella() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const palabra = palabras[Math.floor(Math.random() * palabras.length)];
  const tamaño = Math.random() * 20 + 10;
  const velocidad = Math.random() * 0.5 + 0.2;
  const brillo = Math.random() * 0.7 + 0.3;
  return { x, y, palabra, tamaño, velocidad, brillo };
}

for (let i = 0; i < 150; i++) {
  estrellas.push(nuevaEstrella());
}

function animar() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  estrellas.forEach(e => {
    ctx.font = `${e.tamaño}px 'Courier New'`;
    ctx.fillStyle = `rgba(255, ${150 + Math.random() * 100}, ${200 + Math.random() * 55}, ${e.brillo})`;
    ctx.fillText(e.palabra, e.x, e.y);
    e.y -= e.velocidad;
    if (e.y < -20) {
      e.y = canvas.height + 20;
      e.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(animar);
}

animar();

  "te amo", "princesa", "colochita", "hermosa", "preciosa", "linda", "bella", "guapa",
  "te quiero", "te necesito", "mi vida", "mi mundo", "mi amor", "mi reina", "mi tesoro",
  "mi cielo", "corazón", "mi luz", "mi todo", "mi razón", "solo tú", "mi estrella"

