const FRICTION = 180;
const STOP_THRESHOLD = 0.01;

// Aplica a velocidade inicial de uma tacada
export function applyShot(ball, velocityX, velocityY) {
	ball.vx = velocityX;
	ball.vy = velocityY;

	// Efeito elástico visual de impacto (compressão para posterior expansão com ctx.scale)
	ball.scale = 0.88;
}

// Atualiza a posição e a velocidade da bola
export function updateBall(ball, deltaTime) {
	// Restaura suavemente a escala da bola para o normal após impactos ou tacadas
	if (ball.scale < 1) {
		ball.scale = Math.min(1, ball.scale + deltaTime * 3);
	}

	const speed = Math.hypot(ball.vx, ball.vy);

	// Evita cálculos desnecessários quando a bola está parada
	if (speed <= STOP_THRESHOLD) {
		ball.stop();
		return;
	}

	// Reduz a velocidade de acordo com o atrito
	const newSpeed = Math.max(0, speed - FRICTION * deltaTime);

	// Calcula o deslocamento considerando a desaceleração
	const averageSpeed = (speed + newSpeed) / 2;

	const directionX = ball.vx / speed;
	const directionY = ball.vy / speed;

	const distanceMoved = averageSpeed * deltaTime;
	ball.x += directionX * distanceMoved;
	ball.y += directionY * distanceMoved;

	// Atualiza o ângulo de rotação da bola conforme ela rola na grama (theta = d / r)
	// Sentido condizente com a direção do deslocamento horizontal
	const rotationDirection = directionX >= 0 ? 1 : -1;
	ball.rotation += rotationDirection * (distanceMoved / ball.radius);

	// Atualiza as componentes da velocidade
	const speedRatio = newSpeed / speed;

	ball.vx *= speedRatio;
	ball.vy *= speedRatio;

	// Interrompe completamente a bola quando necessário
	if (newSpeed <= STOP_THRESHOLD) {
		ball.stop();
	}
}
