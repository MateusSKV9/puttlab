const canvas = document.querySelector("#gameCanvas");
const ctx = canvas.getContext("2d");

// Dimensões lógicas padrão do campo
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 500;

function initCanvas(width = CANVAS_WIDTH, height = CANVAS_HEIGHT) {
	canvas.width = width;
	canvas.height = height;
}

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Inicializa com o tamanho padrão assim que o módulo for carregado
initCanvas();

export { canvas, ctx, CANVAS_WIDTH, CANVAS_HEIGHT, initCanvas, clearCanvas };
