// Cria o estado inicial da partida
export function createGameState() {
	return {
		strokes: 0,
		status: "playing",
	};
}

// —————————————————————————————————————————————————————————————————————

// Registra uma tacada
export function registerShot(gameState, ball) {
	// Não permite tacadas após a conclusão da fase
	if (gameState.status !== "playing") {
		return false;
	}

	// Só permite uma nova tacada quando a bola estiver parada
	if (ball.isMoving()) {
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
		return true;
	}

	return false;
}

// Reinicia o estado da partida
export function resetGameState(gameState) {
	gameState.strokes = 0;
	gameState.status = "playing";
}
