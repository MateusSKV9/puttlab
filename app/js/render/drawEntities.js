export function drawHole(ctx, hole) {
	if (!hole) return;

	ctx.save();

	// 1. TRANSLAÇÃO: Move o sistema de coordenadas para o centro do buraco (espaço do objeto)
	ctx.translate(hole.x, hole.y);

	// Aro metálico externo (alumínio escovado)
	ctx.beginPath();
	ctx.arc(0, 0, hole.radius + 2, 0, Math.PI * 2);
	ctx.fillStyle = "#b0bec5";
	ctx.fill();

	// Interior profundo do buraco
	ctx.beginPath();
	ctx.arc(0, 0, hole.radius, 0, Math.PI * 2);
	ctx.fillStyle = "#0d1310";
	ctx.fill();

	// Haste da bandeira (dourado fosco)
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(0, -26);
	ctx.strokeStyle = "#e6d5b8";
	ctx.lineWidth = 2;
	ctx.stroke();

	// 2. TRANSLAÇÃO, ROTAÇÃO E ESCALA HIERÁRQUICA: Animação de ondulação da bandeira pelo vento
	ctx.save();
	// Translação até o topo do mastro
	ctx.translate(0, -26);

	const time = performance.now() * 0.003;
	// Rotação sutil da bandeira provocada pela brisa
	const windAngle = Math.sin(time) * 0.08;
	ctx.rotate(windAngle);

	// Escala oscilante simulando o tecido da bandeira ondulando no vento
	const waveScale = 1 + Math.sin(time * 1.8) * 0.12;
	ctx.scale(waveScale, 1);

	// Bandeira triangular bordô/vinho clássico desenhada na origem local do mastro
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(13, 5);
	ctx.lineTo(0, 10);
	ctx.closePath();
	ctx.fillStyle = "#a62639";
	ctx.fill();

	ctx.restore(); // Restaura transformações da bandeira

	ctx.restore(); // Restaura contexto geral
}

export function drawObstacles(ctx, obstacles = []) {
	ctx.save();

	for (const obs of obstacles) {
		// Sombra suave projetada na grama
		ctx.fillStyle = "rgba(8, 22, 14, 0.35)";
		ctx.fillRect(obs.x + 4, obs.y + 4, obs.width, obs.height);

		ctx.save();

		// 1. TRANSLAÇÃO: Move a origem para o centro geométrico do obstáculo
		const centerX = obs.x + obs.width / 2;
		const centerY = obs.y + obs.height / 2;
		ctx.translate(centerX, centerY);

		const halfW = obs.width / 2;
		const halfH = obs.height / 2;

		// Corpo do obstáculo em madeira nogueira (centrado em 0, 0)
		ctx.fillStyle = "#4e2e1e";
		ctx.fillRect(-halfW, -halfH, obs.width, obs.height);

		// Friso superior claro (luz) e contorno refinado
		ctx.strokeStyle = "#8c6d46";
		ctx.lineWidth = 1.5;
		ctx.strokeRect(-halfW, -halfH, obs.width, obs.height);

		// Rebites metálicos decorativos nos cantos desenhados em coordenadas locais
		if (obs.width >= 20 && obs.height >= 20) {
			ctx.fillStyle = "#b0bec5";
			const inset = 5;
			const rivetRadius = 1.5;
			const corners = [
				{ x: -halfW + inset, y: -halfH + inset },
				{ x: halfW - inset, y: -halfH + inset },
				{ x: -halfW + inset, y: halfH - inset },
				{ x: halfW - inset, y: halfH - inset },
			];

			for (const c of corners) {
				ctx.beginPath();
				ctx.arc(c.x, c.y, rivetRadius, 0, Math.PI * 2);
				ctx.fill();
			}
		}

		ctx.restore();
	}

	ctx.restore();
}

export function drawAimLine(ctx, ball, input) {
	if (!ball || !input || !input.isAiming) return;

	const dx = ball.x - input.aimX;
	const dy = ball.y - input.aimY;
	const distance = Math.hypot(dx, dy);

	if (distance < 5) return;

	const maxPull = 150;
	const clampedDistance = Math.min(distance, maxPull);
	const powerRatio = clampedDistance / maxPull;

	// Ângulo de lançamento
	const angle = Math.atan2(dy, dx);

	// Transição elegante: creme/champagne (fraco) -> dourado (médio) -> terracota (forte)
	let aimColor = "#f4f1ea";
	if (powerRatio > 0.7) {
		aimColor = "#d9534f";
	} else if (powerRatio > 0.35) {
		aimColor = "#e6b85c";
	}

	ctx.save();

	// 1. TRANSLAÇÃO: Move o referencial para a posição atual da bola
	ctx.translate(ball.x, ball.y);

	// 2. ROTAÇÃO: Alinha o eixo X local na direção da mira (dispensa trigonometria manual no traçado)
	ctx.rotate(angle);

	// Desenha a linha de mira tracejada ao longo do eixo X local de 0 até clampedDistance
	ctx.beginPath();
	ctx.setLineDash([5, 5]);
	ctx.moveTo(0, 0);
	ctx.lineTo(clampedDistance, 0);
	ctx.strokeStyle = aimColor;
	ctx.lineWidth = 2.5;
	ctx.stroke();

	// 3. TRANSLAÇÃO E ESCALA NA PONTA DA MIRA:
	// Translada até o fim do vetor de mira e escala a seta indicadora proporcionalmente à força
	ctx.translate(clampedDistance, 0);

	const arrowScale = 0.8 + powerRatio * 0.7;
	ctx.scale(arrowScale, arrowScale);

	// Seta direcional indicativa
	ctx.setLineDash([]);
	ctx.beginPath();
	ctx.moveTo(6, 0);
	ctx.lineTo(-6, -4.5);
	ctx.lineTo(-3, 0);
	ctx.lineTo(-6, 4.5);
	ctx.closePath();
	ctx.fillStyle = aimColor;
	ctx.fill();

	ctx.restore();
}

export function drawBall(ctx, ball) {
	if (!ball) return;

	ctx.save();

	// 1. TRANSLAÇÃO: Posiciona o sistema de coordenadas no centro da bola (espaço do objeto)
	ctx.translate(ball.x, ball.y);

	// 2. ESCALA: Efeito de escala visual (deformação elástica de impacto e afundamento em perspectiva no buraco)
	const currentScale = ball.scale ?? 1;
	ctx.scale(currentScale, currentScale);

	// Sombra de contato na grama projetada ligeiramente abaixo e à direita em espaço local
	ctx.beginPath();
	ctx.arc(2, 3, ball.radius, 0, Math.PI * 2);
	ctx.fillStyle = "rgba(8, 22, 14, 0.4)";
	ctx.fill();

	// 3. ROTAÇÃO: Aplica a rotação física acumulada pelo rolamento na grama à textura da bola
	ctx.save();
	ctx.rotate(ball.rotation ?? 0);

	// Corpo branco pérola da bola
	ctx.beginPath();
	ctx.arc(0, 0, ball.radius, 0, Math.PI * 2);
	ctx.fillStyle = "#f8f9fa";
	ctx.fill();

	// Contorno sutil
	ctx.strokeStyle = "#cbd5e1";
	ctx.lineWidth = 1;
	ctx.stroke();

	// Textura clássica de bola de golfe (dimples / alvéolos simétricos girando com o rolamento)
	ctx.fillStyle = "rgba(180, 195, 205, 0.55)";
	const dimpleRadius = 1.3;
	const dimpleOffset = ball.radius * 0.45;
	const dimplePositions = [
		{ x: -dimpleOffset, y: 0 },
		{ x: dimpleOffset, y: 0 },
		{ x: 0, y: -dimpleOffset },
		{ x: 0, y: dimpleOffset },
	];

	for (const pos of dimplePositions) {
		ctx.beginPath();
		ctx.arc(pos.x, pos.y, dimpleRadius, 0, Math.PI * 2);
		ctx.fill();
	}

	// Linha guia de alinhamento de putt (típica em bolas de golfe para calibrar a tacada)
	ctx.strokeStyle = "rgba(166, 38, 57, 0.45)";
	ctx.lineWidth = 1.2;
	ctx.beginPath();
	ctx.moveTo(-ball.radius * 0.65, 0);
	ctx.lineTo(ball.radius * 0.65, 0);
	ctx.stroke();

	ctx.restore(); // Restaura rotação da textura para manter o ponto de iluminação da cena fixo

	// Brilho especular (fixo em relação à fonte de luz externa superior-esquerda)
	ctx.beginPath();
	ctx.arc(-ball.radius * 0.3, -ball.radius * 0.3, ball.radius * 0.25, 0, Math.PI * 2);
	ctx.fillStyle = "#ffffff";
	ctx.fill();

	ctx.restore();
}
