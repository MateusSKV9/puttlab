const FRICTION = 180;
const STOP_THRESHOLD = 0.01;

// Aplica a velocidade inicial de uma tacada
export function applyShot(ball, velocityX, velocityY) {
	ball.vx = velocityX;
	ball.vy = velocityY;
}

// Atualiza a posição e a velocidade da bola
export function updateBall(ball, deltaTime) {
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

	ball.x += directionX * averageSpeed * deltaTime;
	ball.y += directionY * averageSpeed * deltaTime;

	// Atualiza as componentes da velocidade
	const speedRatio = newSpeed / speed;

	ball.vx *= speedRatio;
	ball.vy *= speedRatio;

	// Interrompe completamente a bola quando necessário
	if (newSpeed <= STOP_THRESHOLD) {
		ball.stop();
	}
}
