export const LEVELS = [
	{
		id: 1,
		name: "Primeiras Tacadas",

		// Dimensões do campo
		width: 800,
		height: 500,

		// Configuração inicial da bola
		ball: {
			x: 80,
			y: 250,
			radius: 10,
		},

		// Configuração do buraco
		hole: {
			x: 720,
			y: 250,
			radius: 15,
		},

		// Obstáculos presentes no campo
		obstacles: [
			{
				x: 300,
				y: 100,
				width: 30,
				height: 150,
			},
			{
				x: 500,
				y: 250,
				width: 30,
				height: 150,
			},
		],
	},

	{
		id: 2,
		name: "Desafio das Barreiras",

		width: 800,
		height: 500,

		ball: {
			x: 80,
			y: 400,
			radius: 10,
		},

		hole: {
			x: 720,
			y: 100,
			radius: 15,
		},

		obstacles: [
			{
				x: 200,
				y: 150,
				width: 30,
				height: 250,
			},
			{
				x: 400,
				y: 100,
				width: 30,
				height: 250,
			},
			{
				x: 600,
				y: 150,
				width: 30,
				height: 250,
			},
		],
	},
];

// Busca uma fase pelo seu identificador
export function getLevelById(id) {
	return LEVELS.find((level) => level.id === id) || null;
}
