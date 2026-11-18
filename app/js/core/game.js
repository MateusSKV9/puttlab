import { Ball, Hole, Obstacle } from "../entities/index.js";
import {
	updateBall,
	checkWallCollision,
	checkObstacleCollision,
	createGameState,
	startGame,
	checkVictory,
	checkDefeat,
	resetGameState,
	playSound,
} from "../systems/index.js";
import { Input } from "./index.js";
import { LEVELS, getLevelById } from "../levels/levels.js";
import { render, canvas, initCanvas } from "../render/index.js";

export class Game {
	constructor() {
		this.currentLevelIndex = 0;

		this.level = null;
		this.ball = null;
		this.hole = null;
		this.obstacles = [];

		this.gameState = createGameState();
		this.input = null;

		this.lastTime = 0;
		this.animationFrameId = null;

		// Vincula os métodos ao contexto da instância
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleCanvasClick = this.handleCanvasClick.bind(this);

		// Registra os eventos
		window.addEventListener("keydown", this.handleKeyDown);
		canvas.addEventListener("click", this.handleCanvasClick);

		// Carrega a primeira fase e apresenta a tela inicial
		this.loadLevel(LEVELS[this.currentLevelIndex].id, true, true);
	}

	loadLevel(levelId, resetTotal = false, isInitialStart = false) {
		const level = getLevelById(levelId);

		if (!level) {
			console.error("Fase não encontrada:", levelId);
			return;
		}

		// Configura a fase
		this.level = level;

		initCanvas(level.width, level.height);

		// Cria as entidades
		this.ball = new Ball(level.ball.x, level.ball.y, level.ball.radius);

		this.hole = new Hole(level.hole.x, level.hole.y, level.hole.radius);

		this.obstacles = level.obstacles.map(
			(obstacle) => new Obstacle(obstacle.x, obstacle.y, obstacle.width, obstacle.height)
		);

		// Reinicia o estado da partida conforme a configuração da fase
		resetGameState(this.gameState, level, resetTotal);

		this.lastSoundedStrokes = this.gameState.strokes;

		if (isInitialStart) {
			this.gameState.status = "start";
		}

		// Reinicializa os controles para as novas entidades
		if (this.input) {
			this.input.destroy();
		}

		this.input = new Input(canvas, this.ball, this.gameState);
	}

	update(deltaTime) {
		if (this.gameState.status !== "playing") {
			return;
		}

		// Detecta uma nova tacada
		if (this.gameState.strokes > this.lastSoundedStrokes) {
			playSound("shot");
			this.lastSoundedStrokes = this.gameState.strokes;
		}

		// Atualiza a física da bola
		updateBall(this.ball, deltaTime);

		// Verifica colisões com as paredes
		checkWallCollision(this.ball, canvas.width, canvas.height);

		// Verifica colisões com os obstáculos
		for (const obstacle of this.obstacles) {
			checkObstacleCollision(this.ball, obstacle);
		}

		// Guarda o estado antes das verificações
		const previousStatus = this.gameState.status;

		const won = checkVictory(this.gameState, this.ball, this.hole);

		if (!won) {
			checkDefeat(this.gameState, this.ball);
		}

		// Reproduz o som correspondente à mudança de estado
		if (previousStatus !== this.gameState.status) {
			if (this.gameState.status === "won") {
				playSound("hole");
			} else if (this.gameState.status === "lost") {
				playSound("lose");
			}
		}
	}

	draw() {
		render({
			level: this.level,
			ball: this.ball,
			hole: this.hole,
			obstacles: this.obstacles,
			input: this.input,
			gameState: this.gameState,
		});
	}

	loop(timestamp) {
		const deltaTime = Math.min((timestamp - this.lastTime) / 1000, 0.05);

		this.lastTime = timestamp;

		this.update(deltaTime);
		this.draw();

		this.animationFrameId = requestAnimationFrame((time) => this.loop(time));
	}

	start() {
		if (this.animationFrameId !== null) {
			return;
		}

		this.lastTime = 0;

		this.animationFrameId = requestAnimationFrame((time) => this.loop(time));
	}

	stop() {
		if (this.animationFrameId !== null) {
			cancelAnimationFrame(this.animationFrameId);
			this.animationFrameId = null;
		}
	}

	restart() {
		// Não permite reiniciar antes de começar
		if (this.gameState.status === "start") {
			return;
		}

		// Reinicia o circuito completo após a conclusão
		if (this.gameState.status === "completed") {
			this.currentLevelIndex = 0;

			this.loadLevel(LEVELS[this.currentLevelIndex].id, true);

			return;
		}

		// Remove do total as tacadas da fase já concluída
		if (this.gameState.status === "won") {
			this.gameState.totalStrokes = Math.max(0, this.gameState.totalStrokes - this.gameState.strokes);
		}

		// Reinicia somente a fase atual
		this.loadLevel(LEVELS[this.currentLevelIndex].id);
	}

	nextLevel() {
		if (this.gameState.status !== "won") {
			return;
		}

		// Verifica se todas as fases foram concluídas
		if (this.currentLevelIndex + 1 >= LEVELS.length) {
			this.gameState.status = "completed";

			playSound("victory");

			return;
		}

		// Reproduz o som de conclusão da fase
		playSound("nextLevel");

		this.currentLevelIndex++;

		const nextLevel = LEVELS[this.currentLevelIndex];

		this.loadLevel(nextLevel.id);
	}

	handleCanvasClick() {
		if (this.gameState.status === "start") {
			startGame(this.gameState);
		}
	}

	handleKeyDown(event) {
		// Evita repetir ações enquanto a tecla estiver pressionada
		if (event.repeat) {
			return;
		}

		// Reinicia a fase atual com R
		if (event.key.toLowerCase() === "r") {
			this.restart();
		}

		// Inicia, avança ou reinicia com Espaço
		if (event.code === "Space") {
			event.preventDefault();

			if (this.gameState.status === "start") {
				startGame(this.gameState);
			} else if (this.gameState.status === "won") {
				this.nextLevel();
			} else if (this.gameState.status === "lost") {
				this.restart();
			}
		}
	}

	destroy() {
		// Encerra o loop de animação
		this.stop();

		// Remove os eventos registrados
		window.removeEventListener("keydown", this.handleKeyDown);
		canvas.removeEventListener("click", this.handleCanvasClick);

		// Remove os controles de tacada
		if (this.input) {
			this.input.destroy();
			this.input = null;
		}
	}
}
