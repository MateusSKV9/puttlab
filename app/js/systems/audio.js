const sounds = {
	shot: new Audio(new URL("../../assets/sounds/golf-shot.wav", import.meta.url)),
	collision: new Audio(new URL("../../assets/sounds/ball-obstacle-collision.mp3", import.meta.url)),
	hole: new Audio(new URL("../../assets/sounds/ball-falling-into-hole.mp3", import.meta.url)),
	lose: new Audio(new URL("../../assets/sounds/defeat.wav", import.meta.url)),
	nextLevel: new Audio(new URL("../../assets/sounds/level-complete.wav", import.meta.url)),
	victory: new Audio(new URL("../../assets/sounds/victory.mp3", import.meta.url)),
};

export function playSound(name) {
	const sound = sounds[name];

	if (!sound) return;

	sound.currentTime = 0;

	sound.play().catch((error) => {
		console.warn(`Não foi possível reproduzir o som "${name}":`, error);
	});
}
