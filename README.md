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

| Recurso da API Canvas 2D                                 | Descrição do Uso                                                                                                                                                                                                                           | Arquivo e Linhas                                                                                                                                                                                |
| :------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`getContext("2d")`**                                   | Obtenção do contexto de renderização 2D do elemento `<canvas>`.                                                                                                                                                                            | `app/js/render/canvas.js` (linha 2)                                                                                                                                                             |
| **`canvas.width` / `canvas.height`**                     | Definição e leitura da resolução lógica da área de jogo (`800x500`).                                                                                                                                                                       | `app/js/render/canvas.js` (linhas 9–10)<br>`app/js/render/drawField.js` (linhas 2–3)<br>`app/js/render/hud.js` (linhas 41–42, 154–155, 197–198, 260–261)                                      |
| **`clearRect()`**                                        | Limpeza completa do quadro antes de redesenhar cada frame.                                                                                                                                                                                 | `app/js/render/canvas.js` (linha 14)                                                                                                                                                            |
| **`save()` e `restore()`**                               | Isolamento e recuperação da pilha de estados gráficos, matrizes de transformação, estilos e fontes por entidade e camada.                                                                                                                  | `app/js/render/drawField.js` (linhas 5, 23)<br>`app/js/render/drawEntities.js` (linhas 4, 30, 52, 54, 58, 65, 103, 106, 133, 168, 174, 190, 229, 237)<br>`app/js/render/hud.js` (linhas 5, 37, 44, 119, 157, 193, 200, 256, 263, 389) |
| **`translate()`**                                        | **Transformação Geométrica de Translação:** desloca a origem para o espaço do objeto (centro da bola, buraco, mastro, centro dos obstáculos, ponta da linha de mira e centro das estrelas do HUD).                                       | `app/js/render/drawEntities.js` (linhas 7, 32, 70, 136, 152, 177)<br>`app/js/render/hud.js` (linha 8)                                                                                         |
| **`rotate()`**                                           | **Transformação Geométrica de Rotação:** orienta a mira na direção da tacada, gira a textura e marcas da bola conforme o rolamento físico na grama, anima a bandeira ao vento e rotaciona estrelas comemorativas no HUD.                 | `app/js/render/drawEntities.js` (linhas 37, 139, 191)<br>`app/js/render/hud.js` (linha 11)                                                                                                     |
| **`scale()`**                                            | **Transformação Geométrica de Escala:** anima o afundamento da bola no buraco em perspectiva, simula compressão/elasticidade de impacto, redimensiona a seta de força da mira, ondula a bandeira e aplica pulsação em emblemas do HUD. | `app/js/render/drawEntities.js` (linhas 41, 155, 181)<br>`app/js/render/hud.js` (linha 14)                                                                                                     |
| **`fillRect()` e `strokeRect()`**                        | Desenho do gramado, faixas alternadas, bordas, obstáculos centrados no espaço local, barra do HUD e overlays de fundo.                                                                                                                   | `app/js/render/drawField.js` (linhas 9, 15, 21)<br>`app/js/render/drawEntities.js` (linhas 63, 77, 82)<br>`app/js/render/hud.js` (linhas 48, 161, 205, 267, 325)                             |
| **`roundRect()`**                                        | Desenho dos painéis com cantos arredondados das telas de regras, derrota, vitória e conclusão.                                                                                                                                             | `app/js/render/hud.js` (linhas 58, 171, 217, 334)                                                                                                                                               |
| **`beginPath()`, `moveTo()`, `lineTo()`, `closePath()`** | Traçado de linhas divisórias, haste/bandeira do buraco, vetor de mira e geometria vetorial das estrelas procedurais.                                                                                                                      | `app/js/render/drawEntities.js` (linhas 10, 22–24, 44–48, 96–100, 142–145, 158–164, 224–226)<br>`app/js/render/hud.js` (linhas 16, 20–28, 75–78, 272–275)                                   |
| **`arc()`**                                              | Renderização circular do buraco, aro metálico, rebites dos obstáculos, corpo e alvéolos da bola de golfe e brilho especular.                                                                                                               | `app/js/render/drawEntities.js` (linhas 11, 17, 98, 185, 196, 217, 233)                                                                                                                        |
| **`setLineDash()`**                                      | Criação do efeito tracejado dinâmico na linha de mira/força da tacada.                                                                                                                                                                     | `app/js/render/drawEntities.js` (linhas 143, 158)                                                                                                                                               |
| **`fillText()`, `font`, `textAlign`, `textBaseline`**    | Renderização de textos, placar de tacadas/Par e mensagens das telas modais.                                                                                                                                                                | `app/js/render/hud.js` (linhas 66–70, 83–117, 178–191, 224–254, 278–301, 307–319, 343–371)                                                                                                    |
| **`getBoundingClientRect()`**                            | Mapeamento das coordenadas de tela do mouse/toque para o espaço lógico do Canvas.                                                                                                                                                             | `app/js/core/input.js` (linha 33)                                                                                                                                                               |
| **`requestAnimationFrame()`**                            | Execução contínua do _Game Loop_ sincronizado com a taxa de atualização da tela.                                                                                                                                                             | `app/js/core/game.js` (linhas 161, 171)                                                                                                                                                         |

## Integrantes

- Mateus Santos
- William Souza
