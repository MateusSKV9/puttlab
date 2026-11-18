export function drawHole(ctx, hole) {
	if (!hole) return;

	ctx.save();

	// Aro metálico externo (alumínio escovado)
	ctx.beginPath();
	ctx.arc(hole.x, hole.y, hole.radius + 2, 0, Math.PI * 2);
	ctx.fillStyle = "#b0bec5";
	ctx.fill();

	// Interior profundo do buraco
	ctx.beginPath();
	ctx.arc(hole.x, hole.y, hole.radius, 0, Math.PI * 2);
	ctx.fillStyle = "#0d1310";
	ctx.fill();

	// Haste da bandeira (dourado fosco)
	ctx.beginPath();
	ctx.moveTo(hole.x, hole.y);
	ctx.lineTo(hole.x, hole.y - 26);
	ctx.strokeStyle = "#e6d5b8";
	ctx.lineWidth = 2;
	ctx.stroke();

	// Bandeira triangular bordô/vinho clássico
	ctx.beginPath();
	ctx.moveTo(hole.x, hole.y - 26);
	ctx.lineTo(hole.x + 13, hole.y - 21);
	ctx.lineTo(hole.x, hole.y - 16);
	ctx.closePath();
	ctx.fillStyle = "#a62639";
	ctx.fill();

	ctx.restore();
}

export function drawObstacles(ctx, obstacles = []) {
	ctx.save();

	for (const obs of obstacles) {
		// Sombra suave projetada na grama
		ctx.fillStyle = "rgba(8, 22, 14, 0.35)";
		ctx.fillRect(obs.x + 4, obs.y + 4, obs.width, obs.height);

		// Corpo do obstáculo em madeira nogueira
		ctx.fillStyle = "#4e2e1e";
		ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

		// Friso superior claro (luz) e contorno refinado
		ctx.strokeStyle = "#8c6d46";
		ctx.lineWidth = 1.5;
		ctx.strokeRect(obs.x, obs.y, obs.width, obs.height);
	}

	ctx.restore();
}

export function drawAimLine(ctx, ball, input) {
	if (!ball || !input || !input.isAiming) return;

	const dx = ball.x - input.aimX;
	const dy = ball.y - input.aimY;
	const distance = Math.hypot(dx, dy);

	if (distance < 5) return;

	const maxPull = 150;
	const clampedDistance = Math.min(distance, maxPull);
	const powerRatio = clampedDistance / maxPull;

	const angle = Math.atan2(dy, dx);
	const targetX = ball.x + Math.cos(angle) * clampedDistance;
	const targetY = ball.y + Math.sin(angle) * clampedDistance;

	// Transição elegante: creme/champagne (fraco) -> dourado (médio) -> terracota (forte)
	let aimColor = "#f4f1ea";
	if (powerRatio > 0.7) {
		aimColor = "#d9534f";
	} else if (powerRatio > 0.35) {
		aimColor = "#e6b85c";
	}

	ctx.save();

	ctx.beginPath();
	ctx.setLineDash([5, 5]);
	ctx.moveTo(ball.x, ball.y);
	ctx.lineTo(targetX, targetY);
	ctx.strokeStyle = aimColor;
	ctx.lineWidth = 2.5;
	ctx.stroke();

	ctx.setLineDash([]);
	ctx.beginPath();
	ctx.arc(targetX, targetY, 3.5, 0, Math.PI * 2);
	ctx.fillStyle = aimColor;
	ctx.fill();

	ctx.restore();
}

export function drawBall(ctx, ball) {
	if (!ball) return;

	ctx.save();

	// Sombra de contato na grama
	ctx.beginPath();
	ctx.arc(ball.x + 2, ball.y + 3, ball.radius, 0, Math.PI * 2);
	ctx.fillStyle = "rgba(8, 22, 14, 0.4)";
	ctx.fill();

	// Corpo branco pérola da bola
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
	ctx.fillStyle = "#f8f9fa";
	ctx.fill();

	// Contorno sutil
	ctx.strokeStyle = "#cbd5e1";
	ctx.lineWidth = 1;
	ctx.stroke();

	// Brilho especular
	ctx.beginPath();
	ctx.arc(ball.x - ball.radius * 0.3, ball.y - ball.radius * 0.3, ball.radius * 0.25, 0, Math.PI * 2);
	ctx.fillStyle = "#ffffff";
	ctx.fill();

	ctx.restore();
}
