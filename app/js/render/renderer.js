import { ctx, clearCanvas } from './canvas.js';
import { drawField } from './drawField.js';
import { drawHole, drawObstacles, drawAimLine, drawBall } from './drawEntities.js';
import { drawHUD } from './hud.js';

export function render({ level, ball, hole, obstacles, input, gameState }) {
	// 1. Limpa o frame anterior
	clearCanvas();

	// 2. Desenha o campo / gramado
	drawField(ctx, level);

	// 3. Desenha o buraco no chão (antes da bola para que ela passe por cima ao cair)
	drawHole(ctx, hole);

	// 4. Desenha os obstáculos
	drawObstacles(ctx, obstacles);

	// 5. Desenha a linha de mira (se o jogador estiver arrastando)
	drawAimLine(ctx, ball, input);

	// 6. Desenha a bola
	drawBall(ctx, ball);

	// 7. Desenha a interface (HUD e tela de vitória) por cima de tudo
	drawHUD(ctx, gameState, level);
}
