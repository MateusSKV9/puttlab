// Cria o estado inicial da partida
export function createGameState() {
	return {
		strokes: 0,
		maxStrokes: 5,
		par: 2,
		totalStrokes: 0,
		status: "start", // "start" | "playing" | "won" | "lost" | "completed"
	};
}

// Inicia a partida a partir da tela inicial de regras
export function startGame(gameState) {
	if (gameState.status === "start") {
		gameState.status = "playing";
	}
}

// —————————————————————————————————————————————————————————————————————

// Registra uma tacada
export function registerShot(gameState, ball) {
	// Não permite tacadas fora do estado ativo
	if (gameState.status !== "playing") {
		return false;
	}

	// Só permite uma nova tacada quando a bola estiver parada
	if (ball.isMoving()) {
		return false;
	}

	// Impede ultrapassar o limite máximo de tacadas
	if (gameState.strokes >= gameState.maxStrokes) {
		return false;
	}

	gameState.strokes++;

	return true;
}

// —————————————————————————————————————————————————————————————————————

// Verifica se o jogador venceu
export function checkVictory(gameState, ball, hole) {
	if (gameState.status !== "playing") {
		return false;
	}

	if (hole.contains(ball)) {
		gameState.status = "won";
		gameState.totalStrokes += gameState.strokes;
		return true;
	}

	return false;
}

// —————————————————————————————————————————————————————————————————————

// Verifica se o jogador atingiu o limite de tacadas sem acertar o buraco
export function checkDefeat(gameState, ball) {
	if (gameState.status !== "playing") {
		return false;
	}

	// Só declara derrota quando a bola parar completamente após a última tacada
	if (gameState.strokes >= gameState.maxStrokes && !ball.isMoving()) {
		gameState.status = "lost";
		return true;
	}

	return false;
}

// —————————————————————————————————————————————————————————————————————

// Retorna a nomenclatura clássica do golfe baseada no Par
export function getScoreLabel(strokes, par) {
	if (strokes === 1) return "Hole-in-One!";

	const diff = strokes - par;
	if (diff <= -2) return "Eagle!";
	if (diff === -1) return "Birdie!";
	if (diff === 0) return "Par";
	if (diff === 1) return "Bogey";
	if (diff === 2) return "Double Bogey";
	return `+${diff} acima do Par`;
}

// —————————————————————————————————————————————————————————————————————

// Reinicia o estado para a fase atual (ou zera o placar total em um novo jogo)
export function resetGameState(gameState, level = null, resetTotal = false) {
	gameState.strokes = 0;
	gameState.status = "playing";

	if (level) {
		gameState.par = level.par ?? 2;
		gameState.maxStrokes = level.maxStrokes ?? 5;
	}

	if (resetTotal) {
		gameState.totalStrokes = 0;
	}
}
