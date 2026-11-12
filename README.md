# PuttLab ⛳

Jogo de Mini Golf 2D desenvolvido com **HTML, CSS, JavaScript e Canvas 2D**, como projeto acadêmico de Computação Gráfica.

## Estrutura de Pastas

```text
puttlab/
│
├── app/
│   ├── index.html
│   ├── styles.css
│   │
│   └── js/
│       ├── main.js                 # Inicialização da aplicação
│       │
│       ├── core/
│       │   ├── game.js             # Gerenciamento do jogo
│       │   ├── canvas.js           # Configuração do Canvas
│       │   └── input.js            # Controles do jogador
│       │
│       ├── entities/
│       │   ├── ball.js             # Bola e seus atributos
│       │   ├── obstacles.js        # Obstáculos do campo
│       │   └── hole.js             # Buraco
│       │
│       ├── systems/
│       │   ├── physics.js          # Movimentação e atrito
│       │   └── collision.js        # Detecção de colisões
│       │
│       ├── render/
│       │   ├── renderer.js         # Desenhos no Canvas
│       │   └── hud.js              # Pontuação e informações na tela
│       │
│       └── levels/
│           └── levels.js           # Configuração das fases
│
├── README.md
├── LICENSE
├── .gitignore
└── .gitattributes
```

## Tecnologias

- HTML5
- CSS3
- JavaScript (ES Modules)
- Canvas 2D API

## Execução

1. Clone o repositório.
2. Abra a pasta do projeto no VS Code.
3. Abra `app/index.html` utilizando o **Live Server**.

## Organização do Código

O projeto será dividido em módulos JavaScript, utilizando `import` e `export` para separar as responsabilidades e facilitar a manutenção e o desenvolvimento em equipe.

**Observação:** A estrutura poderá ser ajustada conforme novas funcionalidades forem implementadas.
