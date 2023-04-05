const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const width = canvas.width = canvas.offsetWidth;
const height = canvas.height = canvas.offsetHeight;
const colors = [  '#ffffff41',  '#c7c1fa41',  '#95b0fa6b',  '#5d87fa41',];

function draw() {
  context.clearRect(0, 0, width, height);
  for (let i = 0; i < 250; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = {
      width: Math.random() * 200 + 200,
      height: Math.random() * 200 + 200
    };
    const color = colors[Math.floor(Math.random() * colors.length)];
    const gradient = context.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, '#00d6f8');
    context.fillStyle = gradient;
    context.beginPath();
    context.save();
    context.translate(x, y);
    const rotationAngle = Math.random() * Math.PI * 45;
    context.rotate(rotationAngle);
    context.moveTo(-(size.width / 2), 0);
    for (let j = 1; j <= 5; j++) {
      const angle = j * (Math.PI * 2) / 5;
      const sideSize = (j % 2 === 0) ? size.width : size.height;
      context.lineTo(-(sideSize / 2) * Math.cos(angle), -(size.height / 2) * Math.sin(angle));
    }
    context.closePath();
    context.fill();
    context.restore();
  }
}

function transition() {
  canvas.classList.remove('fade-in');
  canvas.classList.add('fade-out');
  setTimeout(() => {
    draw();
    canvas.classList.remove('fade-out');
    canvas.classList.add('fade-in');
  }, 250);
}


draw();
setInterval(transition, 30000);

