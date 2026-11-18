export { playSound } from "./audio.js";

export { checkObstacleCollision, checkWallCollision } from "./collision.js";

export { applyShot, updateBall } from "./physics.js";

export {
	checkDefeat,
	checkVictory,
	createGameState,
	getScoreLabel,
	registerShot,
	resetGameState,
	startGame,
} from "./rules.js";
