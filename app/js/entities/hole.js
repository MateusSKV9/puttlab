export class Hole {
	constructor(x, y, radius = 15) {
		// Posição do buraco
		this.x = x;
		this.y = y;

		// Tamanho do buraco
		this.radius = radius;

		// Margem de tolerância para detectar a entrada da bola
		this.tolerance = 3;
	}

	// Verifica se a bola entrou no buraco, considerando a tolerância
	contains(ball) {
		// Calcula a distância entre o centro da bola e o centro do buraco
		const dx = ball.x - this.x;
		const dy = ball.y - this.y;

		const distance = Math.hypot(dx, dy);

		// Verifica se a bola está dentro da área de aceitação do buraco
		return distance + ball.radius <= this.radius + this.tolerance;
	}
}
