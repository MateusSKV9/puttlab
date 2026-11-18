import { getScoreLabel } from "../systems/rules.js";

function drawStartScreen(ctx) {
	const width = ctx.canvas.width;
	const height = ctx.canvas.height;

	ctx.save();

	// Escurece o campo ao fundo
	ctx.fillStyle = "rgba(8, 18, 13, 0.82)";
	ctx.fillRect(0, 0, width, height);

	// Painel central
	const boxWidth = 550;
	const boxHeight = 350;
	const boxX = (width - boxWidth) / 2;
	const boxY = (height - boxHeight) / 2;

	ctx.fillStyle = "#13261c";
	ctx.beginPath();
	ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 12);
	ctx.fill();

	ctx.strokeStyle = "#c5a880";
	ctx.lineWidth = 2.5;
	ctx.stroke();

	// Título
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillStyle = "#e6d5b8";
	ctx.font = "bold 24px 'Lucida Sans', sans-serif";
	ctx.fillText("COMO JOGAR", width / 2, boxY + 38);

	// Linha divisória
	ctx.strokeStyle = "rgba(197, 168, 128, 0.3)";
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(boxX + 36, boxY + 68);
	ctx.lineTo(boxX + boxWidth - 36, boxY + 68);
	ctx.stroke();

	const textX = boxX + 40;

	// Regra 1: Como jogar
	ctx.textAlign = "left";
	ctx.fillStyle = "#f2c879";
	ctx.font = "bold 14px 'Lucida Sans', sans-serif";
	ctx.fillText("• COMO TACAR:", textX, boxY + 100);

	ctx.fillStyle = "#f4f1ea";
	ctx.font = "13px 'Lucida Sans', sans-serif";
	ctx.fillText("Clique na bola, arraste para trás para mirar e solte para tacar.", textX + 14, boxY + 123);

	// Regra 2: Objetivo
	ctx.fillStyle = "#f2c879";
	ctx.font = "bold 14px 'Lucida Sans', sans-serif";
	ctx.fillText("• OBJETIVO:", textX, boxY + 160);

	ctx.fillStyle = "#f4f1ea";
	ctx.font = "13px 'Lucida Sans', sans-serif";
	ctx.fillText("Leve a bola até o buraco utilizando o menor número", textX + 14, boxY + 183);
	ctx.fillText("possível de tacadas.", textX + 14, boxY + 201);

	// Regra 3: Par e limite de tacadas
	ctx.fillStyle = "#f2c879";
	ctx.font = "bold 14px 'Lucida Sans', sans-serif";
	ctx.fillText("• PAR E LIMITE DE TACADAS:", textX, boxY + 238);

	ctx.fillStyle = "#f4f1ea";
	ctx.font = "13px 'Lucida Sans', sans-serif";
	ctx.fillText("O Par é a quantidade de tacadas esperada para concluir a fase.", textX + 14, boxY + 261);
	ctx.fillText("Você pode ultrapassar o Par, mas existe um limite máximo.", textX + 14, boxY + 279);
	ctx.fillText("Se atingir esse limite sem acertar o buraco, terá de reiniciar.", textX + 14, boxY + 297);

	// Instrução para começar
	ctx.textAlign = "center";
	ctx.fillStyle = "#e6d5b8";
	ctx.font = "bold 14px 'Lucida Sans', sans-serif";
	ctx.fillText("Clique na tela ou pressione ESPAÇO para começar", width / 2, boxY + 328);

	ctx.restore();
}

// Retorna uma explicação para o resultado da fase
function getScoreDescription(strokes, par) {
	if (strokes === 1) {
		return "Você acertou o buraco em uma única tacada!";
	}

	const difference = strokes - par;

	if (difference <= -2) {
		return "Você concluiu pelo menos duas tacadas abaixo do Par!";
	}

	if (difference === -1) {
		return "Você concluiu com uma tacada abaixo do Par!";
	}

	if (difference === 0) {
		return "Você concluiu exatamente dentro da meta de tacadas!";
	}

	if (difference === 1) {
		return "Você concluiu com uma tacada acima do Par.";
	}

	if (difference === 2) {
		return "Você concluiu com duas tacadas acima do Par.";
	}

	return `Você concluiu com ${difference} tacadas acima do Par.`;
}

function drawDefeatScreen(ctx, gameState) {
	const width = ctx.canvas.width;
	const height = ctx.canvas.height;

	ctx.save();

	// Escurece o fundo
	ctx.fillStyle = "rgba(18, 6, 6, 0.78)";
	ctx.fillRect(0, 0, width, height);

	// Painel de derrota
	const boxWidth = 430;
	const boxHeight = 190;
	const boxX = (width - boxWidth) / 2;
	const boxY = (height - boxHeight) / 2;

	ctx.fillStyle = "#261313";
	ctx.beginPath();
	ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 10);
	ctx.fill();

	ctx.strokeStyle = "#d9534f";
	ctx.lineWidth = 2.5;
	ctx.stroke();

	ctx.textAlign = "center";
	ctx.textBaseline = "middle";

	ctx.fillStyle = "#f28b82";
	ctx.font = "bold 22px 'Lucida Sans', sans-serif";
	ctx.fillText("LIMITE DE TACADAS", width / 2, boxY + 45);

	ctx.fillStyle = "#f4f1ea";
	ctx.font = "14px 'Lucida Sans', sans-serif";
	ctx.fillText(`Você atingiu o limite de ${gameState.maxStrokes} tacadas.`, width / 2, boxY + 88);

	ctx.fillStyle = "#c9a8a8";
	ctx.font = "13px 'Lucida Sans', sans-serif";
	ctx.fillText("Pressione R ou ESPAÇO para reiniciar a fase.", width / 2, boxY + 137);

	ctx.restore();
}

function drawCompletionScreen(ctx, gameState) {
	const width = ctx.canvas.width;
	const height = ctx.canvas.height;

	ctx.save();

	// Escurece o campo ao fundo
	ctx.fillStyle = "rgba(5, 15, 10, 0.85)";
	ctx.fillRect(0, 0, width, height);

	// Painel principal
	const panelWidth = 460;
	const panelHeight = 270;
	const panelX = (width - panelWidth) / 2;
	const panelY = (height - panelHeight) / 2;

	ctx.fillStyle = "#173c2b";
	ctx.strokeStyle = "#a77b45";
	ctx.lineWidth = 4;

	ctx.beginPath();
	ctx.roundRect(panelX, panelY, panelWidth, panelHeight, 18);
	ctx.fill();
	ctx.stroke();

	ctx.textAlign = "center";
	ctx.textBaseline = "middle";

	// Título
	ctx.font = "bold 36px 'Lucida Sans', sans-serif";
	ctx.fillStyle = "#f2c879";
	ctx.fillText("PARABÉNS!", width / 2, panelY + 58);

	// Mensagem
	ctx.font = "bold 20px 'Lucida Sans', sans-serif";
	ctx.fillStyle = "#ffffff";
	ctx.fillText("Você concluiu todas as fases!", width / 2, panelY + 112);

	// Total de tacadas
	ctx.font = "bold 17px 'Lucida Sans', sans-serif";
	ctx.fillStyle = "#e6d5b8";
	ctx.fillText(`Total de tacadas no circuito: ${gameState?.totalStrokes ?? 0}`, width / 2, panelY + 152);

	// Mensagem adicional
	ctx.font = "15px 'Lucida Sans', sans-serif";
	ctx.fillStyle = "#c5d8ca";
	ctx.fillText("Você dominou o laboratório de tacadas.", width / 2, panelY + 185);

	// Reiniciar
	ctx.font = "bold 16px 'Lucida Sans', sans-serif";
	ctx.fillStyle = "#f2c879";
	ctx.fillText("Pressione R para jogar novamente", width / 2, panelY + 230);

	ctx.restore();
}

export function drawHUD(ctx, gameState, level) {
	const width = ctx.canvas.width;
	const height = ctx.canvas.height;

	ctx.save();

	// Barra superior translúcida
	ctx.fillStyle = "rgba(10, 22, 16, 0.55)";
	ctx.fillRect(0, 0, width, 40);

	// Linha divisória
	ctx.strokeStyle = "rgba(230, 213, 184, 0.25)";
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(0, 40);
	ctx.lineTo(width, 40);
	ctx.stroke();

	// Identificação da fase
	ctx.fillStyle = "#e6d5b8";
	ctx.font = "600 14px 'Lucida Sans', sans-serif";
	ctx.textAlign = "left";
	ctx.textBaseline = "middle";

	const levelText = level ? `FASE ${level.id}  •  ${level.name.toUpperCase()}` : "FASE 1";

	ctx.fillText(levelText, 18, 20);

	// Tacadas, limite e Par
	const strokes = gameState?.strokes ?? 0;
	const maxStrokes = gameState?.maxStrokes ?? level?.maxStrokes ?? 5;
	const par = gameState?.par ?? level?.par ?? 2;
	const remaining = maxStrokes - strokes;

	ctx.textAlign = "right";

	if (remaining <= 1 && gameState?.status === "playing") {
		ctx.fillStyle = "#f28b82";
	} else {
		ctx.fillStyle = "#f4f1ea";
	}

	ctx.fillText(`TACADAS: ${strokes}/${maxStrokes}  •  PAR (META): ${par}`, width - 18, 20);

	// Instrução inicial e avisos de última tacada
	if (gameState?.status === "playing") {
		ctx.textAlign = "center";
		ctx.font = "13px 'Lucida Sans', sans-serif";

		if (strokes === 0) {
			ctx.fillStyle = "rgba(244, 241, 234, 0.75)";
			ctx.fillText("Clique na bola, arraste para trás para mirar e solte para tacar", width / 2, height - 18);
		} else if (remaining === 1) {
			ctx.fillStyle = "#f28b82";
			ctx.font = "bold 13px 'Lucida Sans', sans-serif";
			ctx.fillText("Resta apenas uma tacada! Acerte o buraco.", width / 2, height - 18);
		} else if (remaining === 0) {
			ctx.fillStyle = "#f28b82";
			ctx.font = "bold 13px 'Lucida Sans', sans-serif";
			ctx.fillText("Última tacada em andamento! Acerte o buraco.", width / 2, height - 18);
		}
	}

	// Tela de vitória
	if (gameState?.status === "won") {
		ctx.fillStyle = "rgba(8, 18, 13, 0.72)";
		ctx.fillRect(0, 0, width, height);

		const boxWidth = 420;
		const boxHeight = 195;
		const boxX = (width - boxWidth) / 2;
		const boxY = (height - boxHeight) / 2;

		ctx.fillStyle = "#13261c";
		ctx.beginPath();
		ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 8);
		ctx.fill();

		ctx.strokeStyle = "#c5a880";
		ctx.lineWidth = 2;
		ctx.stroke();

		// Classificação
		const scoreTitle = getScoreLabel(strokes, par);

		ctx.textAlign = "center";
		ctx.fillStyle = "#e6d5b8";
		ctx.font = "bold 24px 'Lucida Sans', sans-serif";
		ctx.fillText(scoreTitle.toUpperCase(), width / 2, boxY + 42);

		// Quantidade de tacadas
		const label = strokes === 1 ? "1 tacada" : `${strokes} tacadas`;

		ctx.fillStyle = "#f4f1ea";
		ctx.font = "15px 'Lucida Sans', sans-serif";
		ctx.fillText(`Buraco concluído em ${label} (Par ${par})`, width / 2, boxY + 82);

		// Explicação do resultado
		ctx.fillStyle = "#c5d8ca";
		ctx.font = "12px 'Lucida Sans', sans-serif";
		ctx.fillText(getScoreDescription(strokes, par), width / 2, boxY + 113);

		// Próximas ações
		ctx.fillStyle = "#e6d5b8";
		ctx.font = "bold 12px 'Lucida Sans', sans-serif";
		ctx.fillText("Pressione R para reiniciar ou ESPAÇO para avançar", width / 2, boxY + 157);
	}

	// Tela inicial
	if (gameState?.status === "start") {
		drawStartScreen(ctx);
	}

	// Tela de derrota
	if (gameState?.status === "lost") {
		drawDefeatScreen(ctx, gameState);
	}

	// Tela de conclusão
	if (gameState?.status === "completed") {
		drawCompletionScreen(ctx, gameState);
	}

	ctx.restore();
}
