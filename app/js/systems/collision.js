export function checkWallCollision(ball, canvasWidth, canvasHeight) {
	// Colisão com a parede esquerda
	if (ball.x - ball.radius < 0) {
		ball.x = ball.radius;
		ball.vx *= -1;
	}

	// Colisão com a parede direita
	if (ball.x + ball.radius > canvasWidth) {
		ball.x = canvasWidth - ball.radius;
		ball.vx *= -1;
	}

	// Colisão com a parede superior
	if (ball.y - ball.radius < 0) {
		ball.y = ball.radius;
		ball.vy *= -1;
	}

	// Colisão com a parede inferior
	if (ball.y + ball.radius > canvasHeight) {
		ball.y = canvasHeight - ball.radius;
		ball.vy *= -1;
	}
}

// —————————————————————————————————————————————————————————————————————

export function checkObstacleCollision(ball, obstacle) {
	// Encontra o ponto do retângulo mais próximo da bola
	const closestX = Math.max(obstacle.x, Math.min(ball.x, obstacle.x + obstacle.width));

	const closestY = Math.max(obstacle.y, Math.min(ball.y, obstacle.y + obstacle.height));

	// Calcula a distância entre os pontos
	const dx = ball.x - closestX;
	const dy = ball.y - closestY;

	const distance = Math.hypot(dx, dy);

	// Verifica se existe colisão
	if (distance >= ball.radius) {
		return false;
	}

	// Resolve a colisão
	if (Math.abs(dx) > Math.abs(dy)) {
		ball.vx *= -1;
		ball.x += dx > 0 ? ball.radius - Math.abs(dx) : -(ball.radius - Math.abs(dx));
	} else {
		ball.vy *= -1;
		ball.y += dy > 0 ? ball.radius - Math.abs(dy) : -(ball.radius - Math.abs(dy));
	}

	return true;
}
