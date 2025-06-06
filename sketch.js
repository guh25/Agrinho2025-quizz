let perguntas = [
  {
    pergunta: "Qual é uma característica comum da zona rural?",
    alternativas: [
      "Alta densidade populacional",
      "Tráfego intenso de veículos",
      "Atividades agrícolas",
      "Muitos arranha-céus"
    ],
    correta: 2
  },
  {
    pergunta: "Qual setor econômico predomina na cidade?",
    alternativas: [
      "Agrícola",
      "Industrial e de serviços",
      "Pecuária",
      "Extrativismo vegetal"
    ],
    correta: 1
  },
  {
    pergunta: "Qual local costuma ter mais áreas verdes e natureza?",
    alternativas: [
      "Área urbana",
      "Zona rural",
      "Centro industrial",
      "Área portuária"
    ],
    correta: 1
  },
  {
    pergunta: "O que é comum encontrar em grandes centros urbanos?",
    alternativas: [
      "Lavouras e plantações",
      "Hospitais, escolas e shoppings",
      "Pastagens e rebanhos",
      "Tratores no trânsito"
    ],
    correta: 1
  },
  {
    pergunta: "A vida no campo é geralmente associada a:",
    alternativas: [
      "Rotina agitada e vida noturna intensa",
      "Trabalho remoto e escritórios",
      "Contato com a natureza e tranquilidade",
      "Fábricas e poluição"
    ],
    correta: 2
  }
];

let perguntaAtual = 0;
let pontuacao = 0;
let selecionada = -1;
let estado = "quiz";
let fundoImg;

function preload() {
  fundoImg = loadImage("fundo.jpg"); // Use o nome da imagem que você subiu
}

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  textSize(24);
}

function draw() {
  if (fundoImg) {
    image(fundoImg, 0, 0, width, height);
  } else {
    background(200);
  }

  if (estado === "quiz") {
    mostrarPergunta();
  } else if (estado === "fim") {
    mostrarResultado();
  }
}

function mostrarPergunta() {
  // Área mais larga e desfocada (maior blur visual)
  fill(0, 180);
  rect(80, 40, width - 160, height - 80, 25);

  fill(255);
  textSize(26);
  text(perguntas[perguntaAtual].pergunta, width / 2, 90);

  for (let i = 0; i < perguntas[perguntaAtual].alternativas.length; i++) {
    if (i === selecionada) {
      fill(i === perguntas[perguntaAtual].correta ? "green" : "red");
    } else {
      fill(100, 150, 200);
    }

    rect(width / 2 - 250, 140 + i * 90, 500, 70, 12);
    fill(255);
    textSize(20);
    text(perguntas[perguntaAtual].alternativas[i], width / 2, 175 + i * 90);
  }

  // Posição da pontuação dentro do quadro, canto inferior direito
  fill(255);
  textSize(18);
  textAlign(RIGHT, BOTTOM);
  text("Pontuação: " + pontuacao, width - 100, height - 50);

  // Reset align
  textAlign(CENTER, CENTER);
}

function mostrarResultado() {
  fill(0, 180);
  rect(0, 0, width, height);
  fill(255);
  textSize(32);
  text("Fim do Quiz!", width / 2, height / 2 - 40);
  textSize(24);
  text("Você acertou " + pontuacao + " de " + perguntas.length + " perguntas.", width / 2, height / 2 + 20);
}

function mousePressed() {
  if (estado === "quiz") {
    for (let i = 0; i < perguntas[perguntaAtual].alternativas.length; i++) {
      let x = width / 2 - 250;
      let y = 140 + i * 90;
      let w = 500;
      let h = 70;

      if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
        selecionada = i;

        if (i === perguntas[perguntaAtual].correta) {
          pontuacao++;
        }

        setTimeout(() => {
          perguntaAtual++;
          selecionada = -1;

          if (perguntaAtual >= perguntas.length) {
            estado = "fim";
          }
        }, 700);
      }
    }
  }
}
