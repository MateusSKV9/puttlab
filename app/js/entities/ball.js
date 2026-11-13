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
