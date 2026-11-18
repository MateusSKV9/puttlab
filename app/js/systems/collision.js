export function checkWallCollision(ball, canvasWidth, canvasHeight) {
	let collided = false;

	// Colisão com a parede esquerda
	if (ball.x - ball.radius < 0) {
		ball.x = ball.radius;
		ball.vx *= -1;
		collided = true;
	}

	// Colisão com a parede direita
	if (ball.x + ball.radius > canvasWidth) {
		ball.x = canvasWidth - ball.radius;
		ball.vx *= -1;
		collided = true;
	}

	// Colisão com a parede superior
	if (ball.y - ball.radius < 0) {
		ball.y = ball.radius;
		ball.vy *= -1;
		collided = true;
	}

	// Colisão com a parede inferior
	if (ball.y + ball.radius > canvasHeight) {
		ball.y = canvasHeight - ball.radius;
		ball.vy *= -1;
		collided = true;
	}

	return collided;
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

	// Não existe colisão
	if (distance >= ball.radius) {
		return false;
	}

	// Caso o centro da bola esteja dentro do retângulo
	if (distance === 0) {
		const distances = [
			{ distance: ball.x - obstacle.x, axis: "x", direction: -1 },
			{ distance: obstacle.x + obstacle.width - ball.x, axis: "x", direction: 1 },
			{ distance: ball.y - obstacle.y, axis: "y", direction: -1 },
			{ distance: obstacle.y + obstacle.height - ball.y, axis: "y", direction: 1 },
		];

		const nearest = distances.reduce((a, b) => (a.distance < b.distance ? a : b));

		if (nearest.axis === "x") {
			ball.x += nearest.direction * (nearest.distance + ball.radius);
			ball.vx *= -1;
		} else {
			ball.y += nearest.direction * (nearest.distance + ball.radius);
			ball.vy *= -1;
		}

		return true;
	}

	// Calcula a direção da colisão
	const normalX = dx / distance;
	const normalY = dy / distance;

	// Corrige a sobreposição da bola com o obstáculo
	const penetration = ball.radius - distance;

	ball.x += normalX * penetration;
	ball.y += normalY * penetration;

	// Reflete a velocidade na direção da colisão
	const dotProduct = ball.vx * normalX + ball.vy * normalY;

	if (dotProduct < 0) {
		ball.vx -= 2 * dotProduct * normalX;
		ball.vy -= 2 * dotProduct * normalY;
	}

	return true;
}
