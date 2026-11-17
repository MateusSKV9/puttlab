import { getScoreLabel } from "../systems/rules.js";

function drawStartScreen(ctx) {
	const width = ctx.canvas.width;
	const height = ctx.canvas.height;

	ctx.save();

	// Escurece suavemente o campo visível ao fundo
	ctx.fillStyle = "rgba(8, 18, 13, 0.82)";
	ctx.fillRect(0, 0, width, height);

	// Painel central de regras
	const boxWidth = 520;
	const boxHeight = 330;
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
	ctx.fillText("REGRAS DO CAMPO", width / 2, boxY + 42);

	// Linha divisória dourada
	ctx.strokeStyle = "rgba(197, 168, 128, 0.3)";
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(boxX + 36, boxY + 68);
	ctx.lineTo(boxX + boxWidth - 36, boxY + 68);
	ctx.stroke();

	// Regras alinhadas à esquerda dentro do painel
	const textX = boxX + 42;
	ctx.textAlign = "left";

	// Regra 1: Como jogar
	ctx.fillStyle = "#f2c879";
	ctx.font = "bold 14px 'Lucida Sans', sans-serif";
	ctx.fillText("• COMO TACAR:", textX, boxY + 100);
	ctx.fillStyle = "#f4f1ea";
	ctx.font = "13px 'Lucida Sans', sans-serif";
	ctx.fillText("Clique na bola, arraste para trás para mirar e solte.", textX + 14, boxY + 122);

	// Regra 2: O que é o Par
	ctx.fillStyle = "#f2c879";
	ctx.font = "bold 14px 'Lucida Sans', sans-serif";
	ctx.fillText("• O QUE É O PAR?", textX, boxY + 158);
	ctx.fillStyle = "#f4f1ea";
	ctx.font = "13px 'Lucida Sans', sans-serif";
	ctx.fillText("É o número ideal de tacadas da fase. Acerte abaixo do Par", textX + 14, boxY + 180);
	ctx.fillText("para conquistar Birdie, Eagle ou Hole-in-One!", textX + 14, boxY + 198);

	// Regra 3: Limite de tacadas
	ctx.fillStyle = "#f28b82";
	ctx.font = "bold 14px 'Lucida Sans', sans-serif";
	ctx.fillText("• LIMITE DE TACADAS:", textX, boxY + 234);
	ctx.fillStyle = "#f4f1ea";
	ctx.font = "13px 'Lucida Sans', sans-serif";
	ctx.fillText("Cada fase possui um máximo de tacadas. Se estourar sem", textX + 14, boxY + 256);
	ctx.fillText("acertar o buraco, você precisará reiniciar a fase.", textX + 14, boxY + 274);

	// Chamada para começar
	ctx.textAlign = "center";
	ctx.fillStyle = "#e6d5b8";
	ctx.font = "bold 14px 'Lucida Sans', sans-serif";
	ctx.fillText("Clique na tela ou pressione ESPAÇO para começar", width / 2, boxY + 308);

	ctx.restore();
}

function drawDefeatScreen(ctx, gameState) {
	const width = ctx.canvas.width;
	const height = ctx.canvas.height;

	ctx.save();

	// Escurece o fundo
	ctx.fillStyle = "rgba(18, 6, 6, 0.78)";
	ctx.fillRect(0, 0, width, height);

	// Painel de derrota
	const boxWidth = 390;
	const boxHeight = 175;
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
	ctx.fillText("LIMITE DE TACADAS", width / 2, boxY + 46);

	ctx.fillStyle = "#f4f1ea";
	ctx.font = "15px 'Lucida Sans', sans-serif";
	ctx.fillText(`Você usou todas as ${gameState.maxStrokes} tacadas permitidas.`, width / 2, boxY + 90);

	ctx.fillStyle = "#c9a8a8";
	ctx.font = "12px 'Lucida Sans', sans-serif";
	ctx.fillText("Pressione R ou Espaço para tentar novamente", width / 2, boxY + 135);

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

	// Título
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";

	ctx.font = "bold 36px Arial";
	ctx.fillStyle = "#f2c879";

	ctx.fillText("PARABÉNS!", width / 2, panelY + 58);

	// Mensagem
	ctx.font = "bold 20px Arial";
	ctx.fillStyle = "#ffffff";
	ctx.fillText("Você concluiu todas as fases!", width / 2, panelY + 112);

	// Placar total acumulado
	ctx.font = "bold 17px Arial";
	ctx.fillStyle = "#e6d5b8";
	ctx.fillText(`Total de tacadas no circuito: ${gameState?.totalStrokes ?? 0}`, width / 2, panelY + 152);

	// Informação adicional
	ctx.font = "16px Arial";
	ctx.fillStyle = "#c5d8ca";

	ctx.fillText("Você dominou o laboratório de tacadas.", width / 2, panelY + 185);

	// Instrução para reiniciar
	ctx.font = "bold 16px Arial";
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

	// Linha divisória dourada sutil
	ctx.strokeStyle = "rgba(230, 213, 184, 0.25)";
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(0, 40);
	ctx.lineTo(width, 40);
	ctx.stroke();

	// Fase (esquerda)
	ctx.fillStyle = "#e6d5b8";
	ctx.font = "600 14px 'Lucida Sans', sans-serif";
	ctx.textAlign = "left";
	ctx.textBaseline = "middle";
	const levelText = level ? `FASE ${level.id}  •  ${level.name.toUpperCase()}` : "FASE 1";
	ctx.fillText(levelText, 18, 20);

	// Tacadas e Par (direita)
	const strokes = gameState?.strokes ?? 0;
	const maxStrokes = gameState?.maxStrokes ?? level?.maxStrokes ?? 5;
	const par = gameState?.par ?? level?.par ?? 2;
	const remaining = maxStrokes - strokes;

	ctx.textAlign = "right";
	if (remaining <= 1 && gameState?.status === "playing") {
		ctx.fillStyle = "#f28b82"; // Alerta visual na última tacada
	} else {
		ctx.fillStyle = "#f4f1ea";
	}
	ctx.fillText(`TACADAS: ${strokes}/${maxStrokes}  •  PAR ${par}`, width - 18, 20);

	// Instrução discreta antes da primeira tacada
	if (gameState?.status === "playing" && strokes === 0) {
		ctx.fillStyle = "rgba(244, 241, 234, 0.75)";
		ctx.font = "13px 'Lucida Sans', sans-serif";
		ctx.textAlign = "center";
		ctx.fillText("Clique na bola, arraste para trás para mirar e solte para tacar", width / 2, height - 18);
	}

	// Cartão de Vitória estilo Country Club
	if (gameState?.status === "won") {
		ctx.fillStyle = "rgba(8, 18, 13, 0.72)";
		ctx.fillRect(0, 0, width, height);

		const boxWidth = 370;
		const boxHeight = 175;
		const boxX = (width - boxWidth) / 2;
		const boxY = (height - boxHeight) / 2;

		ctx.fillStyle = "#13261c";
		ctx.beginPath();
		ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 8);
		ctx.fill();

		ctx.strokeStyle = "#c5a880";
		ctx.lineWidth = 2;
		ctx.stroke();

		const scoreTitle = getScoreLabel(strokes, par);

		ctx.fillStyle = "#e6d5b8";
		ctx.font = "bold 22px 'Lucida Sans', sans-serif";
		ctx.textAlign = "center";
		ctx.fillText(scoreTitle.toUpperCase(), width / 2, boxY + 46);

		ctx.fillStyle = "#f4f1ea";
		ctx.font = "15px 'Lucida Sans', sans-serif";
		const label = strokes === 1 ? "1 tacada" : `${strokes} tacadas`;
		ctx.fillText(`Buraco concluído em ${label} (Par ${par})`, width / 2, boxY + 90);

		ctx.fillStyle = "#9eb3a8";
		ctx.font = "12px 'Lucida Sans', sans-serif";
		ctx.fillText("Pressione R para reiniciar ou Espaço para avançar", width / 2, boxY + 135);
	}

	// Tela inicial explicando Par e Limite de Tacadas
	if (gameState?.status === "start") {
		drawStartScreen(ctx);
	}

	// Tela de Derrota (estourou o limite de tacadas)
	if (gameState?.status === "lost") {
		drawDefeatScreen(ctx, gameState);
	}

	// Tela de conclusão de todas as fases
	if (gameState?.status === "completed") {
		drawCompletionScreen(ctx, gameState);
	}

	ctx.restore();
}
