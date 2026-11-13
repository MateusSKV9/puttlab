# PuttLab ⛳

Jogo de **Mini Golf 2D** desenvolvido com **HTML5, CSS3, JavaScript e Canvas 2D**, como projeto acadêmico da disciplina de Computação Gráfica.

O objetivo é desenvolver uma experiência interativa de Mini Golf, com física de movimentação da bola, colisões, obstáculos e diferentes campos, utilizando recursos nativos do navegador e sem bibliotecas gráficas externas.

## Estrutura de Pastas

```text
puttlab/
│
├── app/
│   ├── index.html
│   ├── styles.css
│   │
│   ├── assets/
│   │   ├── favicon.png
│   │   └── images/
│   │
│   └── js/
│       ├── main.js                  # Ponto de entrada da aplicação
│       │
│       ├── core/
│       │   ├── game.js              # Gerenciamento e ciclo do jogo
│       │   └── input.js             # Controles e entradas do jogador
│       │
│       ├── entities/
│       │   ├── ball.js              # Classe e atributos da bola
│       │   ├── hole.js              # Representação do buraco
│       │   └── obstacle.js          # Representação dos obstáculos
│       │
│       ├── systems/
│       │   ├── physics.js           # Movimentação, velocidade e atrito
│       │   ├── collision.js         # Detecção e resolução de colisões
│       │   └── rules.js             # Regras e condições de vitória
│       │
│       ├── render/
│       │   ├── canvas.js            # Configuração do Canvas
│       │   ├── renderer.js          # Coordenação da renderização
│       │   ├── drawField.js         # Desenho dos campos
│       │   ├── drawEntities.js      # Desenho da bola e obstáculos
│       │   └── hud.js               # Pontuação e informações na tela
│       │
│       └── levels/
│           └── levels.js            # Configuração das fases
│
├── README.md
├── LICENSE
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
3. Execute o arquivo `app/index.html` utilizando a extensão **Live Server**.

## Organização do Código

O projeto utiliza módulos JavaScript nativos (`import` e `export`) para separar responsabilidades, facilitar a manutenção e permitir o desenvolvimento colaborativo.

A arquitetura está organizada em três áreas principais:

- **Lógica e Física:** responsável pelas entidades, movimentação, colisões, regras e interações do jogo.
- **Canvas e Renderização:** responsável pela configuração do Canvas e representação visual dos elementos.
- **Gerenciamento:** responsável pela inicialização, integração dos módulos e ciclo principal do jogo.

## Recursos do Canvas 2D

A aplicação utilizará recursos da API Canvas 2D, incluindo:

- Sistema de coordenadas e desenho de formas geométricas.
- Renderização de textos.
- Controle de estado com `save()` e `restore()`.
- Transformações com `translate()`, `rotate()` e `scale()`.
- Carregamento assíncrono de imagens com `Image.onload`.
- Animações e interatividade com o jogador.

## Observações

- Todo o código e os elementos gráficos serão desenvolvidos manualmente, sem bibliotecas ou frameworks gráficos externos.
- A estrutura de pastas poderá ser ajustada conforme a evolução do projeto.
- Os recursos do Canvas utilizados e suas respectivas localizações no código serão documentados ao final do desenvolvimento.
