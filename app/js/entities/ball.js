export class Ball {
	constructor(x, y, radius = 10) {
		// Posição da bola
		this.x = x;
		this.y = y;

		// Tamanho da bola
		this.radius = radius;

		// Velocidade da bola
		this.vx = 0;
		this.vy = 0;

		// Ângulo de rotação da bola (em radianos) para renderização com ctx.rotate
		this.rotation = 0;

		// Fator de escala visual da bola para renderização com ctx.scale (squash e queda no buraco)
		this.scale = 1;
	}

	// Verifica se a bola está em movimento
	isMoving() {
		return Math.abs(this.vx) > 0.01 || Math.abs(this.vy) > 0.01;
	}

	// Interrompe completamente o movimento
	stop() {
		this.vx = 0;
		this.vy = 0;
	}
}
