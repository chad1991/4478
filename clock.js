const canvas = document.getElementById("clockCanvas");
const ctx = canvas.getContext("2d");
const radius = canvas.width / 2;

function drawClock() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(radius, radius);

  drawFace(ctx, radius);
  drawTicks(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);

  ctx.restore();
}

function drawFace(ctx, radius) {
  // White clock face
  ctx.beginPath();
  ctx.arc(0, 0, radius - 10, 0, 2 * Math.PI);
  ctx.fillStyle = "white";
  ctx.fill();

  // Center dot
  ctx.beginPath();
  ctx.arc(0, 0, 6, 0, 2 * Math.PI);
  ctx.fillStyle = "#333";
  ctx.fill();
}

function drawTicks(ctx, radius) {
  for (let i = 0; i < 60; i++) {
    let angle = (i * Math.PI) / 30;
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, -radius + 10);

    if (i % 5 === 0) {
      // Hour tick (thicker & longer)
      ctx.lineWidth = 3;
      ctx.lineTo(0, -radius + 25);
    } else {
      // Minute tick (thin)
      ctx.lineWidth = 1;
      ctx.lineTo(0, -radius + 20);
    }

    ctx.stroke();
    ctx.rotate(-angle);
  }
}

function drawNumbers(ctx, radius) {
  ctx.font = radius * 0.18 + "px Arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  for (let num = 1; num <= 12; num++) {
    let ang = (num * Math.PI) / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.65);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.65);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius) {
  const now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();

  // hour hand
  hour = hour % 12;
  hour = (hour * Math.PI) / 6 + (minute * Math.PI) / 360;
  drawHand(ctx, hour, radius * 0.5, 6, "#333");

  // minute hand
  let minAngle = (minute * Math.PI) / 30 + (second * Math.PI) / 1800;
  drawHand(ctx, minAngle, radius * 0.75, 4, "#333");

  // second hand (red)
  let secAngle = (second * Math.PI) / 30;
  drawHand(ctx, secAngle, radius * 0.85, 2, "red");
}

function drawHand(ctx, pos, length, width, color) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.strokeStyle = color;
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}

setInterval(drawClock, 1000);
drawClock();

