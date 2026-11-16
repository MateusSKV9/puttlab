export function drawHUD(ctx, gameState, level) {
	const width = ctx.canvas.width;
	const height = ctx.canvas.height;

	ctx.save();

	// Barra superior translúcida
	ctx.fillStyle = 'rgba(10, 22, 16, 0.55)';
	ctx.fillRect(0, 0, width, 40);

	// Linha divisória dourada sutil
	ctx.strokeStyle = 'rgba(230, 213, 184, 0.25)';
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(0, 40);
	ctx.lineTo(width, 40);
	ctx.stroke();

	// Fase (esquerda)
	ctx.fillStyle = '#e6d5b8';
	ctx.font = "600 14px 'Lucida Sans', sans-serif";
	ctx.textAlign = 'left';
	ctx.textBaseline = 'middle';
	const levelText = level ? `FASE ${level.id}  •  ${level.name.toUpperCase()}` : 'FASE 1';
	ctx.fillText(levelText, 18, 20);

	// Tacadas (direita)
	ctx.textAlign = 'right';
	ctx.fillStyle = '#f4f1ea';
	ctx.fillText(`TACADAS: ${gameState?.strokes ?? 0}`, width - 18, 20);

	// Instrução discreta antes da primeira tacada
	if (gameState?.status === 'playing' && gameState?.strokes === 0) {
		ctx.fillStyle = 'rgba(244, 241, 234, 0.75)';
		ctx.font = "13px 'Lucida Sans', sans-serif";
		ctx.textAlign = 'center';
		ctx.fillText('Clique na bola, arraste para trás para mirar e solte para tacar', width / 2, height - 18);
	}

	// Cartão de Vitória estilo Country Club
	if (gameState?.status === 'won') {
		ctx.fillStyle = 'rgba(8, 18, 13, 0.72)';
		ctx.fillRect(0, 0, width, height);

		const boxWidth = 370;
		const boxHeight = 165;
		const boxX = (width - boxWidth) / 2;
		const boxY = (height - boxHeight) / 2;

		ctx.fillStyle = '#13261c';
		ctx.beginPath();
		ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 8);
		ctx.fill();

		ctx.strokeStyle = '#c5a880';
		ctx.lineWidth = 2;
		ctx.stroke();

		ctx.fillStyle = '#e6d5b8';
		ctx.font = "bold 22px 'Lucida Sans', sans-serif";
		ctx.textAlign = 'center';
		ctx.fillText('BURACO CONCLUÍDO', width / 2, boxY + 46);

		ctx.fillStyle = '#f4f1ea';
		ctx.font = "15px 'Lucida Sans', sans-serif";
		const strokes = gameState.strokes;
		const label = strokes === 1 ? '1 tacada (Hole-in-One!)' : `${strokes} tacadas`;
		ctx.fillText(`Você completou em ${label}`, width / 2, boxY + 88);

		ctx.fillStyle = '#9eb3a8';
		ctx.font = "12px 'Lucida Sans', sans-serif";
		ctx.fillText('Pressione R para reiniciar ou Espaço para avançar', width / 2, boxY + 130);
	}

	ctx.restore();
}
