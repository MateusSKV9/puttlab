import { Ball } from "../entities/ball.js";
import { Hole } from "../entities/hole.js";
import { Obstacle } from "../entities/obstacle.js";

import { updateBall } from "../systems/physics.js";

import { checkWallCollision, checkObstacleCollision } from "../systems/collision.js";

import { createGameState, checkVictory, resetGameState } from "../systems/rules.js";

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
		window.addEventListener("keydown", this.handleKeyDown);

		this.lastTime = 0;
		this.animationFrameId = null;

		this.loadLevel(LEVELS[this.currentLevelIndex].id);
	}

	loadLevel(levelId) {
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

		// Reinicia o estado da partida
		resetGameState(this.gameState);

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

		// Verifica se o jogador venceu
		checkVictory(this.gameState, this.ball, this.hole);
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
    if (this.gameState.status === "completed") {
      this.currentLevelIndex = 0;
    }
  
    this.loadLevel(LEVELS[this.currentLevelIndex].id);
  }

	nextLevel() {
		if (this.currentLevelIndex + 1 >= LEVELS.length) {
			this.gameState.status = "completed";
			console.log("Parabéns! Você concluiu todas as fases!");
			return;
		}

		this.currentLevelIndex++;

		const nextLevel = LEVELS[this.currentLevelIndex];

		this.loadLevel(nextLevel.id);
	}

	handleKeyDown(event) {
		// Reinicia a fase atual ao pressionar R
		if (event.key.toLowerCase() === "r") {
			this.restart();
		}

		// Avança para a próxima fase ao pressionar Espaço
		if (event.code === "Space") {
			event.preventDefault();

			if (this.gameState.status === "won") {
				this.nextLevel();
			}
		}
	}
}
