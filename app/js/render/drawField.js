export function drawField(ctx, level) {
	const width = level?.width || ctx.canvas.width;
	const height = level?.height || ctx.canvas.height;

	ctx.save();

	// 1. Fundo base verde-esmeralda profundo
	ctx.fillStyle = "#1f5c3a";
	ctx.fillRect(0, 0, width, height);

	// 2. Faixas sutis de corte de grama (efeito veludo)
	const stripeWidth = 50;
	ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
	for (let x = 0; x < width; x += stripeWidth * 2) {
		ctx.fillRect(x, 0, stripeWidth, height);
	}

	// 3. Sombra interna sutil junto à borda de madeira (profundidade)
	ctx.strokeStyle = "rgba(10, 25, 16, 0.45)";
	ctx.lineWidth = 6;
	ctx.strokeRect(3, 3, width - 6, height - 6);

	ctx.restore();
}
