<h1 align="center">⛳ PuttLab ⛳</h1>

<image src="./preview.png" alt="Preview do Jogo" />

<p align="center">
  <a href="https://mateusskv9.github.io/puttlab/app/">
    <strong>Jogar PuttLab</strong>
  </a>
</p>

## Descrição

Jogo de **Mini Golf 2D** desenvolvido como projeto acadêmico da disciplina de Computação Gráfica utilizando **HTML5, CSS3, JavaScript (ES Modules), Canvas 2D API e HTML5 Audio API**, sem bibliotecas gráficas externas. O jogo possui 10 fases progressivas, simulação física de atrito, detecção e resolução de colisões, sistema de pontuação baseado no Par do golfe, limite máximo de tacadas e efeitos sonoros.

## Instruções de Uso

1. Clone o repositório e abra a pasta no **VS Code**.
2. Execute o arquivo `app/index.html` utilizando a extensão **Live Server** (necessário para o carregamento dos ES Modules).
3. **Como jogar:**
   - Clique na tela ou pressione `Espaço` para fechar a tela inicial de regras.
   - Clique próximo à bola, arraste o cursor para trás (estilo estilingue) para definir direção e potência e solte para tacar.
   - Complete cada fase dentro do **Par** (tacadas ideais) sem ultrapassar o **limite máximo de tacadas**.
4. **Atalhos:**
   - `Espaço`: Inicia o jogo, avança para a próxima fase ao vencer ou reinicia ao perder.
   - `R`: Reinicia a fase atual (ou o circuito completo após concluir as 10 fases).

## Recursos do Canvas 2D Utilizados

| Recurso da API Canvas 2D                                 | Descrição do Uso                                                                                   | Arquivo e Linhas                                                                                                                                                                                |
| :------------------------------------------------------- | :------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`getContext("2d")`**                                   | Obtenção do contexto de renderização 2D do elemento `<canvas>`.                                    | `app/js/render/canvas.js` (linha 2)                                                                                                                                                             |
| **`canvas.width` / `canvas.height`**                     | Definição e leitura da resolução lógica da área de jogo (`800x500`).                               | `app/js/render/canvas.js` (linhas 9–10)<br>`app/js/render/drawField.js` (linhas 2–3)<br>`app/js/render/hud.js` (linhas 4–5, 118–119, 160–161, 211–212)                                          |
| **`clearRect()`**                                        | Limpeza completa do quadro antes de redesenhar cada frame.                                         | `app/js/render/canvas.js` (linha 14)                                                                                                                                                            |
| **`save()` e `restore()`**                               | Isolamento de estilos, fontes, traçados e estados gráficos por camada.                             | `app/js/render/drawField.js` (linhas 5, 25)<br>`app/js/render/drawEntities.js` (linhas 4, 37, 42, 61, 88, 108, 113, 141)<br>`app/js/render/hud.js` (linhas 7, 79, 121, 155, 163, 206, 214, 314) |
| **`fillRect()` e `strokeRect()`**                        | Desenho do gramado, faixas alternadas, bordas, obstáculos, barra do HUD e overlays de fundo.       | `app/js/render/drawField.js` (linhas 9, 15, 22)<br>`app/js/render/drawEntities.js` (linhas 47, 51, 56)<br>`app/js/render/hud.js` (linhas 11, 125, 167, 218, 256)                                |
| **`roundRect()`**                                        | Desenho dos painéis com cantos arredondados das telas de regras, derrota, vitória e conclusão.     | `app/js/render/hud.js` (linhas 19, 133, 177, 264)                                                                                                                                               |
| **`beginPath()`, `moveTo()`, `lineTo()`, `closePath()`** | Traçado de linhas divisórias, haste/bandeira do buraco e linha de mira.                            | `app/js/render/drawEntities.js` (linhas 20–22, 28–32, 90–93)<br>`app/js/render/hud.js` (linhas 37–39, 223–225)                                                                                  |
| **`arc()`**                                              | Renderização circular do buraco, aro metálico, bola de golfe, brilho especular e marcador de mira. | `app/js/render/drawEntities.js` (linhas 7, 14, 101, 116, 122, 135)                                                                                                                              |
| **`setLineDash()`**                                      | Criação do efeito tracejado dinâmico na linha de mira/força da tacada.                             | `app/js/render/drawEntities.js` (linhas 91, 99)                                                                                                                                                 |
| **`fillText()`, `font`, `textAlign`, `textBaseline`**    | Renderização de textos, placar de tacadas/Par e mensagens das telas modais.                        | `app/js/render/hud.js` (linhas 29–32, 43–76, 140–152, 184–203, 230–251, 272–297)                                                                                                                |
| **`getBoundingClientRect()`**                            | Mapeamento das coordenadas de tela do mouse/toque para o espaço lógico do Canvas.                  | `app/js/core/input.js` (linha 32)                                                                                                                                                               |
| **`requestAnimationFrame()`**                            | Execução contínua do _Game Loop_ sincronizado com a taxa de atualização da tela.                   | `app/js/core/game.js` (linhas 142, 153)                                                                                                                                                         |

## Integrantes

- Mateus Santos
- William Souza
