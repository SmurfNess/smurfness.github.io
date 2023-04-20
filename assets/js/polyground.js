const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const width = canvas.width = canvas.offsetWidth;
const height = canvas.height = canvas.offsetHeight;
const colors = [  '#3131312a',  '#afafaf2a',  '#0000002a',  '#9292922a',];

function draw() {
  context.clearRect(0, 0, width, height);
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = {
      width: Math.random() * 100 + 1500,
      height: Math.random() * 100 + 1500
    };
    const color = colors[Math.floor(Math.random() * colors.length)];
    const gradient = context.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, '#a6b3ff');
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
  }, 300);
}


draw();
setInterval(transition, 5000);

