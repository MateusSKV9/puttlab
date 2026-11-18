export const LEVELS = [
	// FASE 1
	{
		id: 1,
		name: "Primeiras Tacadas",
		par: 2,
		maxStrokes: 5,
		width: 800,
		height: 500,

		ball: { x: 80, y: 250, radius: 10 },
		hole: { x: 720, y: 250, radius: 15 },

		obstacles: [
			{ x: 300, y: 100, width: 30, height: 150 },
			{ x: 500, y: 250, width: 30, height: 150 },
		],
	},

	// FASE 2
	{
		id: 2,
		name: "Desafio das Barreiras",
		par: 3,
		maxStrokes: 6,
		width: 800,
		height: 500,

		ball: { x: 80, y: 400, radius: 10 },
		hole: { x: 720, y: 100, radius: 15 },

		obstacles: [
			{ x: 200, y: 150, width: 30, height: 250 },
			{ x: 400, y: 100, width: 30, height: 250 },
			{ x: 600, y: 150, width: 30, height: 250 },
		],
	},

	// FASE 3
	{
		id: 3,
		name: "Caminho Alternado",
		par: 3,
		maxStrokes: 6,
		width: 800,
		height: 500,

		ball: { x: 80, y: 80, radius: 10 },
		hole: { x: 720, y: 420, radius: 15 },

		obstacles: [
			{ x: 200, y: 100, width: 30, height: 300 },
			{ x: 400, y: 0, width: 30, height: 280 },
			{ x: 600, y: 200, width: 30, height: 300 },
		],
	},

	// FASE 4
	{
		id: 4,
		name: "Corredores Cruzados",
		par: 3,
		maxStrokes: 6,
		width: 800,
		height: 500,

		ball: { x: 80, y: 250, radius: 10 },
		hole: { x: 720, y: 250, radius: 15 },

		obstacles: [
			{ x: 200, y: 100, width: 250, height: 30 },
			{ x: 350, y: 250, width: 250, height: 30 },
			{ x: 200, y: 400, width: 250, height: 30 },
		],
	},

	// FASE 5
	{
		id: 5,
		name: "Zigue-Zague",
		par: 4,
		maxStrokes: 7,
		width: 800,
		height: 500,

		ball: { x: 80, y: 400, radius: 10 },
		hole: { x: 720, y: 100, radius: 15 },

		obstacles: [
			{ x: 180, y: 80, width: 30, height: 300 },
			{ x: 360, y: 180, width: 30, height: 300 },
			{ x: 540, y: 80, width: 30, height: 300 },
		],
	},

	// FASE 6
	{
		id: 6,
		name: "Labirinto Central",
		par: 4,
		maxStrokes: 7,
		width: 800,
		height: 500,

		ball: { x: 80, y: 250, radius: 10 },
		hole: { x: 720, y: 250, radius: 15 },

		obstacles: [
			{ x: 180, y: 0, width: 30, height: 300 },
			{ x: 330, y: 200, width: 30, height: 300 },
			{ x: 480, y: 0, width: 30, height: 300 },
			{ x: 630, y: 200, width: 30, height: 300 },
		],
	},

	// FASE 7
	{
		id: 7,
		name: "Passagem Estreita",
		par: 4,
		maxStrokes: 8,
		width: 800,
		height: 500,

		ball: { x: 80, y: 420, radius: 10 },
		hole: { x: 720, y: 80, radius: 15 },

		obstacles: [
			{ x: 180, y: 0, width: 30, height: 350 },
			{ x: 330, y: 150, width: 30, height: 350 },
			{ x: 480, y: 0, width: 30, height: 350 },
			{ x: 630, y: 150, width: 30, height: 350 },
		],
	},

	// FASE 8
	{
		id: 8,
		name: "Barreiras Duplas",
		par: 4,
		maxStrokes: 8,
		width: 800,
		height: 500,

		ball: { x: 80, y: 100, radius: 10 },
		hole: { x: 720, y: 400, radius: 15 },

		obstacles: [
			{ x: 200, y: 0, width: 30, height: 180 },
			{ x: 200, y: 300, width: 30, height: 200 },
			{ x: 400, y: 100, width: 30, height: 300 },
			{ x: 600, y: 0, width: 30, height: 180 },
			{ x: 600, y: 300, width: 30, height: 200 },
		],
	},

	// FASE 9
	{
		id: 9,
		name: "Desafio das Curvas",
		par: 4,
		maxStrokes: 8,
		width: 800,
		height: 500,

		ball: { x: 80, y: 250, radius: 10 },
		hole: { x: 720, y: 250, radius: 15 },

		obstacles: [
			{ x: 180, y: 80, width: 250, height: 30 },
			{ x: 180, y: 230, width: 250, height: 30 },
			{ x: 370, y: 380, width: 250, height: 30 },
			{ x: 550, y: 80, width: 30, height: 180 },
		],
	},

	// FASE 10
	{
		id: 10,
		name: "O Grande Desafio",
		par: 5,
		maxStrokes: 9,
		width: 800,
		height: 500,

		ball: { x: 80, y: 420, radius: 10 },
		hole: { x: 720, y: 80, radius: 15 },

		obstacles: [
			{ x: 160, y: 0, width: 30, height: 300 },
			{ x: 280, y: 200, width: 30, height: 300 },
			{ x: 400, y: 0, width: 30, height: 300 },
			{ x: 520, y: 200, width: 30, height: 300 },
			{ x: 640, y: 0, width: 30, height: 300 },
		],
	},
];

// Busca uma fase pelo seu identificador
export function getLevelById(id) {
	return LEVELS.find((level) => level.id === id) || null;
}
