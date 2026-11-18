import { Ball } from "../entities/ball.js";
import { Hole } from "../entities/hole.js";
import { Obstacle } from "../entities/obstacle.js";

import { updateBall } from "../systems/physics.js";

import { checkWallCollision, checkObstacleCollision } from "../systems/collision.js";

import { createGameState, startGame, checkVictory, checkDefeat, resetGameState } from "../systems/rules.js";

import { Input } from "./input.js";

import { LEVELS, getLevelById } from "../levels/levels.js";

import { render } from "../render/renderer.js";

import { canvas, initCanvas } from "../render/canvas.js";

export class Game {
	constructor() {
		this.currentLevelIndex = 0;

		this.level = null;
		this.ball = null;
		this.hole = null;
		this.obstacles = [];

		this.gameState = createGameState();
		this.input = null;

		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleCanvasClick = this.handleCanvasClick.bind(this);

		window.addEventListener("keydown", this.handleKeyDown);
		canvas.addEventListener("pointerdown", this.handleCanvasClick);

		this.lastTime = 0;
		this.animationFrameId = null;

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
		this.obstacles = level.obstacles.map((obstacle) => new Obstacle(obstacle.x, obstacle.y, obstacle.width, obstacle.height));

		// Reinicia o estado da partida
		resetGameState(this.gameState, level, resetTotal);

		if (isInitialStart) {
			this.gameState.status = "start";
		}

		// Inicializa os controles
		if (this.input) {
			this.input.destroy();
		}

		this.input = new Input(canvas, this.ball, this.gameState);
	}

	update(deltaTime) {
		if (this.gameState.status !== "playing") {
			return;
		}

		// Atualiza a física da bola
		updateBall(this.ball, deltaTime);

		// Verifica colisões com as paredes
		checkWallCollision(this.ball, canvas.width, canvas.height);

		// Verifica colisões com os obstáculos
		for (const obstacle of this.obstacles) {
			checkObstacleCollision(this.ball, obstacle);
		}

		// Verifica primeiro se venceu; se não venceu e a bola parou no limite, verifica derrota
		const won = checkVictory(this.gameState, this.ball, this.hole);
		if (!won) {
			checkDefeat(this.gameState, this.ball);
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
		if (this.gameState.status === "start") {
			return;
		}

		if (this.gameState.status === "completed") {
			this.currentLevelIndex = 0;
			this.loadLevel(LEVELS[this.currentLevelIndex].id, true, false);
			return;
		}

		if (this.gameState.status === "won") {
			this.gameState.totalStrokes = Math.max(0, this.gameState.totalStrokes - this.gameState.strokes);
		}

		this.loadLevel(LEVELS[this.currentLevelIndex].id, false, false);
	}

	nextLevel() {
		if (this.currentLevelIndex + 1 >= LEVELS.length) {
			this.gameState.status = "completed";
			console.log("Parabéns! Você concluiu todas as fases!");
			return;
		}

		this.currentLevelIndex++;

		const nextLevel = LEVELS[this.currentLevelIndex];
		this.loadLevel(nextLevel.id, false, false);
	}

	handleCanvasClick() {
		if (this.gameState.status === "start") {
			startGame(this.gameState);
		}
	}

	handleKeyDown(event) {
		// Reinicia a fase atual ao pressionar R
		if (event.key.toLowerCase() === "r") {
			this.restart();
		}

		// Inicia na tela inicial, avança ao vencer ou reinicia ao perder com Espaço
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
}
