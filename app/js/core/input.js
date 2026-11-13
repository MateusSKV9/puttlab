import { applyShot } from "../systems/physics.js";
import { registerShot } from "../systems/rules.js";

const SHOT_POWER = 4;
const MAX_SHOT_SPEED = 600;
const MIN_SHOT_SPEED = 20;
const AIM_TOLERANCE = 20;

export class Input {
	constructor(canvas, ball, gameState) {
		this.canvas = canvas;
		this.ball = ball;
		this.gameState = gameState;

		this.isAiming = false;
		this.aimX = 0;
		this.aimY = 0;

		// Vincula os eventos à instância
		this.handlePointerDown = this.handlePointerDown.bind(this);
		this.handlePointerMove = this.handlePointerMove.bind(this);
		this.handlePointerUp = this.handlePointerUp.bind(this);
		this.handlePointerCancel = this.handlePointerCancel.bind(this);

		// Registra os eventos do mouse
		this.canvas.addEventListener("pointerdown", this.handlePointerDown);
		this.canvas.addEventListener("pointermove", this.handlePointerMove);
		this.canvas.addEventListener("pointerup", this.handlePointerUp);
		this.canvas.addEventListener("pointercancel", this.handlePointerCancel);
	}

	// Converte as coordenadas do mouse para as coordenadas do Canvas
	getCanvasPosition(event) {
		const rect = this.canvas.getBoundingClientRect();

		return {
			x: (event.clientX - rect.left) * (this.canvas.width / rect.width),
			y: (event.clientY - rect.top) * (this.canvas.height / rect.height),
		};
	}

	// Inicia a mira
	handlePointerDown(event) {
		if (event.button !== 0) return;
		if (this.gameState.status !== "playing") return;
		if (this.ball.isMoving()) return;

		const position = this.getCanvasPosition(event);

		const dx = position.x - this.ball.x;
		const dy = position.y - this.ball.y;

		const distance = Math.hypot(dx, dy);

		// Verifica se o jogador pressionou próximo à bola
		if (distance > this.ball.radius + AIM_TOLERANCE) return;

		this.isAiming = true;
		this.aimX = position.x;
		this.aimY = position.y;

		this.canvas.setPointerCapture(event.pointerId);
	}

	// Atualiza a posição da mira
	handlePointerMove(event) {
		if (!this.isAiming) return;

		const position = this.getCanvasPosition(event);

		this.aimX = position.x;
		this.aimY = position.y;
	}

	// Aplica a tacada quando o jogador solta o mouse
	handlePointerUp(event) {
		if (!this.isAiming) return;

		const position = this.getCanvasPosition(event);

		const dx = this.ball.x - position.x;
		const dy = this.ball.y - position.y;

		let velocityX = dx * SHOT_POWER;
		let velocityY = dy * SHOT_POWER;

		const speed = Math.hypot(velocityX, velocityY);

		// Limita a velocidade máxima da tacada
		if (speed > MAX_SHOT_SPEED) {
			const ratio = MAX_SHOT_SPEED / speed;

			velocityX *= ratio;
			velocityY *= ratio;
		}

		const finalSpeed = Math.hypot(velocityX, velocityY);

		// Registra e aplica somente tacadas válidas
		if (finalSpeed >= MIN_SHOT_SPEED && registerShot(this.gameState, this.ball)) {
			applyShot(this.ball, velocityX, velocityY);
		}

		this.isAiming = false;
	}

	// Cancela a mira
	handlePointerCancel() {
		this.isAiming = false;
	}

	// Remove os eventos quando os controles não forem mais necessários
	destroy() {
		this.canvas.removeEventListener("pointerdown", this.handlePointerDown);
		this.canvas.removeEventListener("pointermove", this.handlePointerMove);
		this.canvas.removeEventListener("pointerup", this.handlePointerUp);
		this.canvas.removeEventListener("pointercancel", this.handlePointerCancel);
	}
}
