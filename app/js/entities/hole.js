export class Hole {
	constructor(x, y, radius = 15) {
		// Posição do buraco
		this.x = x;
		this.y = y;

		// Tamanho do buraco
		this.radius = radius;
	}

	// Verifica se a bola entrou no buraco
	contains(ball) {
		const dx = ball.x - this.x;
		const dy = ball.y - this.y;

		const distance = Math.sqrt(dx * dx + dy * dy);

		return distance + ball.radius <= this.radius;
	}
}
